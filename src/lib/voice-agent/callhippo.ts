import { getVoiceAgentRuntimeConfig } from "./config";
import type { CallDispatchResult, ScheduledCall } from "./types";

type ProviderStep = {
  step: string;
  response: unknown;
};

const CALLHIPPO_FETCH_TIMEOUT_MS = 8_000;

function getProviderCallId(response: unknown) {
  if (!response || typeof response !== "object") {
    return undefined;
  }

  const data = response as Record<string, unknown>;
  const nestedData = typeof data.data === "object" && data.data ? (data.data as Record<string, unknown>) : {};
  const callId = data.callId ?? data.call_id ?? data.id ?? nestedData.callId ?? nestedData.call_id ?? nestedData.id;

  return typeof callId === "string" ? callId : undefined;
}

function parseProviderResponse(text: string) {
  if (!text) {
    return null;
  }

  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
}

function getErrorText(providerResponse: unknown, fallback: string) {
  if (typeof providerResponse === "string") {
    return providerResponse || fallback;
  }

  if (providerResponse && typeof providerResponse === "object") {
    return JSON.stringify(providerResponse);
  }

  return fallback;
}

async function callCallHippoApi(path: string, body?: unknown, method = "POST") {
  const config = getVoiceAgentRuntimeConfig();
  const response = await fetch(`${config.callhippoApiBaseUrl}${path}`, {
    method,
    signal: AbortSignal.timeout(CALLHIPPO_FETCH_TIMEOUT_MS),
    headers: {
      apiToken: config.callhippoApiKey ?? "",
      "Content-Type": "application/json",
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  const text = await response.text();
  const providerResponse = parseProviderResponse(text);

  if (!response.ok) {
    throw new Error(
      `CallHippo request failed with ${response.status}: ${getErrorText(providerResponse, response.statusText)}`,
    );
  }

  return providerResponse;
}

export async function placeCallWithCallHippo(call: ScheduledCall): Promise<CallDispatchResult> {
  const config = getVoiceAgentRuntimeConfig();

  if (!config.callhippoApiKey || !config.callhippoCampaignId) {
    return {
      mode: "mock",
      status: "mocked",
      externalCallId: `mock_${call.id}`,
      message:
        "Mock dispatch only. Add CALLHIPPO_API_KEY and CALLHIPPO_CAMPAIGN_ID to upload contacts to a real CallHippo campaign.",
    };
  }

  const steps: ProviderStep[] = [];
  const contactName = call.contactName || call.phoneNumber;
  const contactUpload = await callCallHippoApi(`/campaign/${config.callhippoCampaignId}/contact/bulk`, {
    contacts: [
      {
        name: contactName,
        phoneNumber: call.phoneNumber,
        leadId: call.id,
      },
    ],
  });

  steps.push({ step: "campaign_contact_bulk_upload", response: contactUpload });

  if (!config.callhippoAutoStartCampaign) {
    return {
      mode: "callhippo",
      status: "queued",
      externalCallId: config.callhippoCampaignId,
      message:
        "Contact uploaded to CallHippo campaign. Auto-start is off, so no real dialing campaign was started.",
      providerResponse: steps,
    };
  }

  if (config.callhippoAgentEmail) {
    const agentRequests: Promise<ProviderStep>[] = [];

    if (config.callhippoSetAgentAvailable) {
      agentRequests.push(
        callCallHippoApi(
          "/user/status",
          {
            email: config.callhippoAgentEmail,
            status: "Available",
          },
          "PATCH",
        ).then((response) => ({ step: "agent_status_available", response })),
      );
    }

    agentRequests.push(
      callCallHippoApi(
        "/user/callsession",
        {
          email: config.callhippoAgentEmail,
          action: "start",
        },
        "PATCH",
      ).then((response) => ({ step: "agent_campaign_session_start", response })),
    );

    steps.push(...(await Promise.all(agentRequests)));
  }

  const campaignStart = await callCallHippoApi(`/campaign/${config.callhippoCampaignId}/start`, undefined, "PATCH");
  steps.push({ step: "campaign_start", response: campaignStart });

  return {
    mode: "callhippo",
    status: "dialing",
    externalCallId: getProviderCallId(campaignStart) ?? config.callhippoCampaignId,
    message: "Contact uploaded and CallHippo campaign start requested.",
    providerResponse: steps,
  };
}

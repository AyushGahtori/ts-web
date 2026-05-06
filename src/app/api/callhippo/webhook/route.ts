import { getVoiceAgentRuntimeConfig } from "@/lib/voice-agent/config";
import { appendCallEvent, getCall, mapProviderStatus, updateCall } from "@/lib/voice-agent/store";

export const dynamic = "force-dynamic";

function getNestedString(source: unknown, path: string[]) {
  let current = source;

  for (const key of path) {
    if (!current || typeof current !== "object") {
      return undefined;
    }

    current = (current as Record<string, unknown>)[key];
  }

  return typeof current === "string" ? current : undefined;
}

export async function GET() {
  return Response.json({ ok: true, service: "callhippo-webhook" });
}

export async function POST(request: Request) {
  const config = getVoiceAgentRuntimeConfig();

  if (config.callhippoWebhookSecret) {
    const providedSecret =
      request.headers.get("x-webhook-secret") ?? request.headers.get("x-callhippo-secret");

    if (providedSecret !== config.callhippoWebhookSecret) {
      return Response.json({ error: "Invalid webhook secret." }, { status: 401 });
    }
  }

  const payload = (await request.json()) as Record<string, unknown>;
  const localCallId =
    getNestedString(payload, ["metadata", "voiceAgentCallId"]) ??
    getNestedString(payload, ["data", "metadata", "voiceAgentCallId"]) ??
    getNestedString(payload, ["voiceAgentCallId"]);

  if (!localCallId || !getCall(localCallId)) {
    return Response.json({ ok: true, accepted: false, reason: "No matching local call." }, { status: 202 });
  }

  const providerStatus =
    getNestedString(payload, ["status"]) ??
    getNestedString(payload, ["event"]) ??
    getNestedString(payload, ["type"]) ??
    getNestedString(payload, ["data", "status"]);
  const mappedStatus = providerStatus ? mapProviderStatus(providerStatus) : undefined;

  if (mappedStatus) {
    updateCall(localCallId, { status: mappedStatus });
  }

  appendCallEvent(localCallId, providerStatus || "callhippo_webhook", payload);

  return Response.json({ ok: true, accepted: true });
}

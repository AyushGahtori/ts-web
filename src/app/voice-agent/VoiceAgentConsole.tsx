"use client";

import { type FormEvent, useCallback, useEffect, useMemo, useRef, useState } from "react";
import styles from "./voice-agent.module.css";
import type { CallStatus, ScheduledCall } from "@/lib/voice-agent/types";

type StatusResponse = {
  status: {
    callhippo: {
      ready: boolean;
      method: string;
      endpointType: string;
      campaignIdSet: boolean;
      agentEmailSet: boolean;
      autoStartCampaign: boolean;
      needsCallSessionPayload: boolean;
      missing: string[];
      fromNumberSet: boolean;
      webhookSecretSet: boolean;
    };
    deepgram: {
      ready: boolean;
      missing: string[];
      agentEndpoint: string;
      voiceModel: string;
    };
  };
};

type CallListItem = Pick<ScheduledCall, "id" | "phoneNumber" | "contactName" | "objective" | "scheduledAt" | "status">;

function isStringArray(value: unknown): value is string[] {
  return Array.isArray(value) && value.every((item) => typeof item === "string");
}

function isCallStatus(value: unknown): value is CallStatus {
  return (
    value === "scheduled" ||
    value === "queued" ||
    value === "dialing" ||
    value === "mocked" ||
    value === "connected" ||
    value === "completed" ||
    value === "failed" ||
    value === "canceled"
  );
}

function isCallListItem(value: unknown): value is CallListItem {
  if (!value || typeof value !== "object") {
    return false;
  }

  const call = value as CallListItem;
  return (
    typeof call.id === "string" &&
    typeof call.phoneNumber === "string" &&
    (typeof call.contactName === "string" || call.contactName === undefined) &&
    typeof call.scheduledAt === "string" &&
    typeof call.objective === "string" &&
    isCallStatus(call.status)
  );
}

function isCallsResponse(value: unknown): value is { calls: CallListItem[] } {
  if (!value || typeof value !== "object") {
    return false;
  }

  const response = value as { calls?: unknown };
  return Array.isArray(response.calls) && response.calls.every(isCallListItem);
}

function isCallhippoStatus(value: unknown): value is StatusResponse["status"]["callhippo"] {
  if (!value || typeof value !== "object") {
    return false;
  }

  const status = value as StatusResponse["status"]["callhippo"];
  return (
    typeof status.ready === "boolean" &&
    typeof status.method === "string" &&
    typeof status.endpointType === "string" &&
    typeof status.campaignIdSet === "boolean" &&
    typeof status.agentEmailSet === "boolean" &&
    typeof status.autoStartCampaign === "boolean" &&
    typeof status.needsCallSessionPayload === "boolean" &&
    typeof status.fromNumberSet === "boolean" &&
    typeof status.webhookSecretSet === "boolean" &&
    isStringArray(status.missing)
  );
}

function isDeepgramStatus(value: unknown): value is StatusResponse["status"]["deepgram"] {
  if (!value || typeof value !== "object") {
    return false;
  }

  const status = value as StatusResponse["status"]["deepgram"];
  return (
    typeof status.ready === "boolean" &&
    typeof status.agentEndpoint === "string" &&
    typeof status.voiceModel === "string" &&
    isStringArray(status.missing)
  );
}

function isStatusResponse(value: unknown): value is StatusResponse {
  if (!value || typeof value !== "object") {
    return false;
  }

  const response = value as { status?: { callhippo?: unknown; deepgram?: unknown } };
  return isCallhippoStatus(response.status?.callhippo) && isDeepgramStatus(response.status?.deepgram);
}

const defaultInstruction =
  "You are a concise, helpful voice calling agent. Speak naturally, confirm important details, and end with a clear next step.";

const defaultKnowledgeBase =
  "Company: TechSnitch\nPurpose: Qualify the lead, understand their need, and schedule a follow-up with the team.\nEscalation: If the person asks for pricing, custom contracts, or sensitive data, collect context and say a human specialist will follow up.";

const CALLS_POLL_MS = 5_000;
const STATUS_POLL_MS = 120_000;
const callDateFormatter = new Intl.DateTimeFormat(undefined, {
  dateStyle: "medium",
  timeStyle: "short",
});

function toDatetimeLocal(date: Date) {
  const offsetDate = new Date(date.getTime() - date.getTimezoneOffset() * 60_000);
  return offsetDate.toISOString().slice(0, 16);
}

function formatDate(value: string) {
  return callDateFormatter.format(new Date(value));
}

function stringArraysEqual(first: string[], second: string[]) {
  return first.length === second.length && first.every((item, index) => item === second[index]);
}

function callsEqual(first: CallListItem[], second: CallListItem[]) {
  return (
    first.length === second.length &&
    first.every((call, index) => {
      const next = second[index];

      return (
        call.id === next.id &&
        call.phoneNumber === next.phoneNumber &&
        call.contactName === next.contactName &&
        call.objective === next.objective &&
        call.scheduledAt === next.scheduledAt &&
        call.status === next.status
      );
    })
  );
}

function statusEqual(first: StatusResponse["status"] | null, second: StatusResponse["status"]) {
  if (!first) {
    return false;
  }

  return (
    first.callhippo.ready === second.callhippo.ready &&
    first.callhippo.method === second.callhippo.method &&
    first.callhippo.endpointType === second.callhippo.endpointType &&
    first.callhippo.campaignIdSet === second.callhippo.campaignIdSet &&
    first.callhippo.agentEmailSet === second.callhippo.agentEmailSet &&
    first.callhippo.autoStartCampaign === second.callhippo.autoStartCampaign &&
    first.callhippo.needsCallSessionPayload === second.callhippo.needsCallSessionPayload &&
    first.callhippo.fromNumberSet === second.callhippo.fromNumberSet &&
    first.callhippo.webhookSecretSet === second.callhippo.webhookSecretSet &&
    stringArraysEqual(first.callhippo.missing, second.callhippo.missing) &&
    first.deepgram.ready === second.deepgram.ready &&
    first.deepgram.agentEndpoint === second.deepgram.agentEndpoint &&
    first.deepgram.voiceModel === second.deepgram.voiceModel &&
    stringArraysEqual(first.deepgram.missing, second.deepgram.missing)
  );
}

export function VoiceAgentConsole() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [contactName, setContactName] = useState("");
  const [objective, setObjective] = useState("Qualify the lead and collect the best callback time.");
  const [scheduledAt, setScheduledAt] = useState(() => toDatetimeLocal(new Date()));
  const [systemInstruction, setSystemInstruction] = useState(defaultInstruction);
  const [knowledgeBase, setKnowledgeBase] = useState(defaultKnowledgeBase);
  const [calls, setCalls] = useState<CallListItem[]>([]);
  const [status, setStatus] = useState<StatusResponse["status"] | null>(null);
  const [notice, setNotice] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const callsControllerRef = useRef<AbortController | null>(null);
  const statusControllerRef = useRef<AbortController | null>(null);

  const integrationMode = useMemo(() => {
    if (status?.callhippo.ready && status.deepgram.ready) {
      return status.callhippo.autoStartCampaign ? "Ready for campaign dialing" : "Ready to upload contacts";
    }

    return "Local mock mode";
  }, [status]);

  const refreshCalls = useCallback(async () => {
    callsControllerRef.current?.abort();

    const controller = new AbortController();
    callsControllerRef.current = controller;

    try {
      const callsResponse = await fetch("/api/voice-agent/calls?view=summary", {
        signal: controller.signal,
      });

      if (!callsResponse.ok) {
        throw new Error(`Unable to refresh calls: ${callsResponse.status}`);
      }

      const callsPayload: unknown = await callsResponse.json();

      if (!isCallsResponse(callsPayload)) {
        throw new Error("Unable to refresh calls: unexpected response shape");
      }

      setCalls((current) => (callsEqual(current, callsPayload.calls) ? current : callsPayload.calls));
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") {
        return;
      }

      console.error(error);
    } finally {
      if (callsControllerRef.current === controller) {
        callsControllerRef.current = null;
      }
    }
  }, []);

  const refreshStatus = useCallback(async () => {
    statusControllerRef.current?.abort();

    const controller = new AbortController();
    statusControllerRef.current = controller;

    try {
      const statusResponse = await fetch("/api/voice-agent/status", {
        signal: controller.signal,
      });

      if (!statusResponse.ok) {
        throw new Error(`Unable to refresh status: ${statusResponse.status}`);
      }

      const statusPayload: unknown = await statusResponse.json();

      if (
        !statusPayload ||
        typeof statusPayload !== "object" ||
        !isStatusResponse(statusPayload)
      ) {
        throw new Error("Unable to refresh status: unexpected response shape");
      }

      setStatus((current) => (statusEqual(current, statusPayload.status) ? current : statusPayload.status));
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") {
        return;
      }

      console.error(error);
    } finally {
      if (statusControllerRef.current === controller) {
        statusControllerRef.current = null;
      }
    }
  }, []);

  const refresh = useCallback(async () => {
    await Promise.all([refreshCalls(), refreshStatus()]);
  }, [refreshCalls, refreshStatus]);

  useEffect(() => {
    let disposed = false;
    let callsTimer = 0;
    let statusTimer = 0;
    const isVisible = () => document.visibilityState === "visible";

    const refreshWhenVisible = () => {
      if (isVisible()) {
        void refresh();
      }
    };
    const scheduleCallsRefresh = () => {
      if (disposed) {
        return;
      }

      callsTimer = window.setTimeout(() => {
        if (disposed) {
          return;
        }

        if (isVisible()) {
          void refreshCalls().finally(scheduleCallsRefresh);
        } else {
          scheduleCallsRefresh();
        }
      }, CALLS_POLL_MS);
    };
    const scheduleStatusRefresh = () => {
      if (disposed) {
        return;
      }

      statusTimer = window.setTimeout(() => {
        if (disposed) {
          return;
        }

        if (isVisible()) {
          void refreshStatus().finally(scheduleStatusRefresh);
        } else {
          scheduleStatusRefresh();
        }
      }, STATUS_POLL_MS);
    };

    refreshWhenVisible();
    scheduleCallsRefresh();
    scheduleStatusRefresh();

    document.addEventListener("visibilitychange", refreshWhenVisible);

    return () => {
      disposed = true;
      document.removeEventListener("visibilitychange", refreshWhenVisible);
      window.clearTimeout(callsTimer);
      window.clearTimeout(statusTimer);
      callsControllerRef.current?.abort();
      statusControllerRef.current?.abort();
    };
  }, [refresh, refreshCalls, refreshStatus]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setNotice("");

    try {
      const response = await fetch("/api/voice-agent/calls", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          phoneNumber,
          contactName,
          objective,
          scheduledAt: new Date(scheduledAt).toISOString(),
          systemInstruction,
          knowledgeBase,
        }),
      });
      const payload = await response.json();

      if (!response.ok) {
        throw new Error(payload.error || "Unable to schedule call.");
      }

      setNotice("Call added to the local schedule.");
      setPhoneNumber("");
      setContactName("");
      await refresh();
    } catch (error) {
      setNotice(error instanceof Error ? error.message : "Unable to schedule call.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className={styles.page}>
      <section className={styles.header}>
        <div>
          <p className={styles.eyebrow}>CallHippo + Deepgram</p>
          <h1>Voice Agent Console</h1>
          <p className={styles.subhead}>
            Schedule outbound calls, attach instructions, and keep the agent knowledge base with each call.
          </p>
        </div>
        <div className={styles.statusCard}>
          <span className={styles.statusDot} data-ready={status?.callhippo.ready && status?.deepgram.ready} />
          <div>
            <strong>{integrationMode}</strong>
            <span>
              {status?.callhippo.ready ? "CallHippo campaign ready" : "CallHippo campaign pending"} ·{" "}
              {status?.deepgram.ready ? "Deepgram configured" : "Deepgram key pending"}
            </span>
          </div>
        </div>
      </section>

      <section className={styles.grid}>
        <form className={styles.panel} onSubmit={handleSubmit}>
          <div className={styles.panelHeader}>
            <h2>Schedule Call</h2>
            <p>Use an E.164 number format when possible, for example +14155552671.</p>
          </div>

          <label className={styles.field}>
            <span>Phone number</span>
            <input value={phoneNumber} onChange={(event) => setPhoneNumber(event.target.value)} required />
          </label>

          <label className={styles.field}>
            <span>Contact name</span>
            <input value={contactName} onChange={(event) => setContactName(event.target.value)} />
          </label>

          <label className={styles.field}>
            <span>Schedule time</span>
            <input
              type="datetime-local"
              value={scheduledAt}
              onChange={(event) => setScheduledAt(event.target.value)}
              required
            />
          </label>

          <label className={styles.field}>
            <span>Call objective</span>
            <input value={objective} onChange={(event) => setObjective(event.target.value)} required />
          </label>

          <label className={styles.field}>
            <span>System instruction</span>
            <textarea
              value={systemInstruction}
              onChange={(event) => setSystemInstruction(event.target.value)}
              rows={6}
              required
            />
          </label>

          <label className={styles.field}>
            <span>Knowledge base</span>
            <textarea value={knowledgeBase} onChange={(event) => setKnowledgeBase(event.target.value)} rows={8} required />
          </label>

          <button className={styles.primaryButton} disabled={isSubmitting} type="submit">
            {isSubmitting ? "Scheduling..." : "Schedule call"}
          </button>

          {notice ? <p className={styles.notice}>{notice}</p> : null}
        </form>

        <aside className={styles.side}>
          <div className={styles.panel}>
            <div className={styles.panelHeader}>
              <h2>Setup Needed</h2>
              <p>These values stay server-only in the local `.env.local` file.</p>
            </div>
            <ul className={styles.checklist}>
              <li data-ready={status?.callhippo.ready}>CallHippo campaign id</li>
              <li data-ready={status?.callhippo.agentEmailSet}>CallHippo agent email</li>
              <li data-ready={status?.callhippo.autoStartCampaign}>Auto-start campaign</li>
              <li data-ready={status?.callhippo.fromNumberSet}>CallHippo from number</li>
              <li data-ready={status?.deepgram.ready}>Deepgram API key</li>
              <li data-ready={status?.callhippo.webhookSecretSet}>Webhook secret</li>
            </ul>
          </div>

          <div className={styles.panel}>
            <div className={styles.panelHeader}>
              <h2>Recent Calls</h2>
              <p>Local memory only for this prototype.</p>
            </div>
            <div className={styles.callList}>
              {calls.length ? (
                calls.map((call) => (
                  <article className={styles.callItem} key={call.id}>
                    <div>
                      <strong>{call.contactName || call.phoneNumber}</strong>
                      <span>{call.contactName ? call.phoneNumber : call.objective}</span>
                    </div>
                    <div className={styles.callMeta}>
                      <span className={styles.statusBadge}>{call.status}</span>
                      <span>{formatDate(call.scheduledAt)}</span>
                    </div>
                  </article>
                ))
              ) : (
                <p className={styles.empty}>No calls scheduled yet.</p>
              )}
            </div>
          </div>
        </aside>
      </section>
    </main>
  );
}

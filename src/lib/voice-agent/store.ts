import type { CallEvent, CallStatus, CreateCallInput, ScheduledCall } from "./types";

type VoiceAgentStore = {
  calls: Map<string, ScheduledCall>;
  timers: Map<string, ReturnType<typeof setTimeout>>;
};

const MAX_EVENTS_PER_CALL = 50;
const MAX_LISTED_CALLS = 100;
const CALL_RETENTION_MS = 24 * 60 * 60 * 1000;
const terminalStatuses = new Set<CallStatus>(["completed", "failed", "canceled"]);

declare global {
  // Keeps local prototype state stable across route handler reloads in next dev.
  var __voiceAgentStore: VoiceAgentStore | undefined;
}

function getStore(): VoiceAgentStore {
  if (!globalThis.__voiceAgentStore) {
    globalThis.__voiceAgentStore = {
      calls: new Map<string, ScheduledCall>(),
      timers: new Map<string, ReturnType<typeof setTimeout>>(),
    };
  }

  return globalThis.__voiceAgentStore;
}

function nowIso() {
  return new Date().toISOString();
}

function createEvent(type: string, payload?: unknown): CallEvent {
  return {
    id: crypto.randomUUID(),
    timestamp: nowIso(),
    type,
    payload,
  };
}

function trimEvents(events: CallEvent[]) {
  return events.slice(-MAX_EVENTS_PER_CALL);
}

function pruneStore(store = getStore()) {
  const cutoff = Date.now() - CALL_RETENTION_MS;

  for (const [id, call] of store.calls) {
    const updatedAt = new Date(call.updatedAt).getTime();

    if (terminalStatuses.has(call.status) && updatedAt < cutoff) {
      const timer = store.timers.get(id);

      if (timer) {
        clearTimeout(timer);
      }

      store.timers.delete(id);
      store.calls.delete(id);
    }
  }
}

export function addCall(input: CreateCallInput): ScheduledCall {
  const timestamp = nowIso();
  const scheduledAt = input.scheduledAt || timestamp;
  const call: ScheduledCall = {
    id: crypto.randomUUID(),
    phoneNumber: input.phoneNumber.trim(),
    contactName: input.contactName?.trim() || undefined,
    objective: input.objective.trim(),
    systemInstruction: input.systemInstruction.trim(),
    knowledgeBase: input.knowledgeBase.trim(),
    scheduledAt,
    status: new Date(scheduledAt).getTime() > Date.now() ? "scheduled" : "queued",
    dispatchMode: "mock",
    createdAt: timestamp,
    updatedAt: timestamp,
    events: [createEvent("created", { scheduledAt })],
  };

  const store = getStore();
  pruneStore(store);
  store.calls.set(call.id, call);
  return call;
}

export function listCalls(): ScheduledCall[] {
  const store = getStore();
  pruneStore(store);

  return Array.from(store.calls.values())
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, MAX_LISTED_CALLS);
}

export function getCall(id: string): ScheduledCall | undefined {
  return getStore().calls.get(id);
}

export function updateCall(
  id: string,
  patch: Partial<Omit<ScheduledCall, "id" | "createdAt" | "events">>,
): ScheduledCall | undefined {
  const store = getStore();
  const call = store.calls.get(id);

  if (!call) {
    return undefined;
  }

  const nextCall: ScheduledCall = {
    ...call,
    ...patch,
    updatedAt: nowIso(),
    events: trimEvents(call.events),
  };

  store.calls.set(id, nextCall);
  return nextCall;
}

export function appendCallEvent(id: string, type: string, payload?: unknown): ScheduledCall | undefined {
  const store = getStore();
  const call = store.calls.get(id);

  if (!call) {
    return undefined;
  }

  const nextCall: ScheduledCall = {
    ...call,
    events: trimEvents([...call.events, createEvent(type, payload)]),
    updatedAt: nowIso(),
  };

  store.calls.set(id, nextCall);
  return nextCall;
}

export function setCallTimer(id: string, timer: ReturnType<typeof setTimeout>) {
  const store = getStore();
  const currentTimer = store.timers.get(id);

  if (currentTimer) {
    clearTimeout(currentTimer);
  }

  store.timers.set(id, timer);
}

export function clearCallTimer(id: string) {
  const store = getStore();
  const timer = store.timers.get(id);

  if (timer) {
    clearTimeout(timer);
  }

  store.timers.delete(id);
}

export function mapProviderStatus(status: string): CallStatus | undefined {
  const normalized = status.toLowerCase();

  if (["answered", "connected", "in-progress", "in_progress"].includes(normalized)) {
    return "connected";
  }

  if (["completed", "ended", "finished"].includes(normalized)) {
    return "completed";
  }

  if (["failed", "busy", "no-answer", "no_answer", "canceled", "cancelled"].includes(normalized)) {
    return normalized === "canceled" || normalized === "cancelled" ? "canceled" : "failed";
  }

  if (["dialing", "ringing", "queued"].includes(normalized)) {
    return normalized === "queued" ? "queued" : "dialing";
  }

  return undefined;
}

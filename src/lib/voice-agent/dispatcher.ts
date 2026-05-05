import { placeCallWithCallHippo } from "./callhippo";
import { appendCallEvent, clearCallTimer, getCall, setCallTimer, updateCall } from "./store";
import type { ScheduledCall } from "./types";

const MAX_TIMER_DELAY = 2_147_483_647;

export async function dispatchCall(callId: string) {
  const call = getCall(callId);

  if (!call || !["scheduled", "queued"].includes(call.status)) {
    return call;
  }

  clearCallTimer(call.id);
  updateCall(call.id, { status: "dialing", lastError: undefined });
  appendCallEvent(call.id, "dispatch_started");

  try {
    const result = await placeCallWithCallHippo(call);
    const status = result.status ?? (result.mode === "mock" ? "mocked" : "dialing");

    updateCall(call.id, {
      status,
      dispatchMode: result.mode,
      callhippoCallId: result.externalCallId,
    });
    appendCallEvent(call.id, "dispatch_finished", result);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown dispatch error";

    updateCall(call.id, { status: "failed", lastError: message });
    appendCallEvent(call.id, "dispatch_failed", { message });
  }

  return getCall(call.id);
}

export async function scheduleOrDispatchCall(call: ScheduledCall) {
  const delay = new Date(call.scheduledAt).getTime() - Date.now();

  if (delay <= 0) {
    return dispatchCall(call.id);
  }

  if (delay > MAX_TIMER_DELAY) {
    updateCall(call.id, {
      status: "failed",
      lastError: "Schedule is too far in the future for the local prototype timer.",
    });
    appendCallEvent(call.id, "schedule_failed", { delay });
    return getCall(call.id);
  }

  const timer = setTimeout(() => {
    void dispatchCall(call.id);
  }, delay);

  setCallTimer(call.id, timer);
  appendCallEvent(call.id, "scheduled", { delayMs: delay });

  return getCall(call.id);
}

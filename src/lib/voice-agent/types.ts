export type CallStatus =
  | "scheduled"
  | "queued"
  | "dialing"
  | "mocked"
  | "connected"
  | "completed"
  | "failed"
  | "canceled";

export type DispatchMode = "mock" | "callhippo";

export type CallEvent = {
  id: string;
  timestamp: string;
  type: string;
  payload?: unknown;
};

export type ScheduledCall = {
  id: string;
  phoneNumber: string;
  contactName?: string;
  objective: string;
  systemInstruction: string;
  knowledgeBase: string;
  scheduledAt: string;
  status: CallStatus;
  dispatchMode: DispatchMode;
  createdAt: string;
  updatedAt: string;
  callhippoCallId?: string;
  lastError?: string;
  events: CallEvent[];
};

export type CreateCallInput = {
  phoneNumber: string;
  contactName?: string;
  objective: string;
  systemInstruction: string;
  knowledgeBase: string;
  scheduledAt?: string;
};

export type CallDispatchResult = {
  mode: DispatchMode;
  status?: CallStatus;
  externalCallId?: string;
  message: string;
  providerResponse?: unknown;
};

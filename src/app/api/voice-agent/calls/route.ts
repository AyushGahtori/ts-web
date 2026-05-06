import { scheduleOrDispatchCall } from "@/lib/voice-agent/dispatcher";
import { addCall, listCalls } from "@/lib/voice-agent/store";
import type { CreateCallInput } from "@/lib/voice-agent/types";

export const dynamic = "force-dynamic";

function cleanText(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function validateInput(body: Record<string, unknown>): CreateCallInput {
  const phoneNumber = cleanText(body.phoneNumber);
  const objective = cleanText(body.objective);
  const systemInstruction = cleanText(body.systemInstruction);
  const knowledgeBase = cleanText(body.knowledgeBase);
  const scheduledAt = cleanText(body.scheduledAt);

  if (!phoneNumber) {
    throw new Error("Phone number is required.");
  }

  if (!objective) {
    throw new Error("Call objective is required.");
  }

  if (!systemInstruction) {
    throw new Error("System instruction is required.");
  }

  if (!knowledgeBase) {
    throw new Error("Knowledge base is required.");
  }

  if (scheduledAt && Number.isNaN(new Date(scheduledAt).getTime())) {
    throw new Error("Scheduled time is invalid.");
  }

  return {
    phoneNumber,
    contactName: cleanText(body.contactName) || undefined,
    objective,
    systemInstruction,
    knowledgeBase,
    scheduledAt: scheduledAt || undefined,
  };
}

export async function GET() {
  return Response.json({ calls: listCalls() });
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Record<string, unknown>;
    const input = validateInput(body);
    const call = addCall(input);
    const scheduledCall = await scheduleOrDispatchCall(call);

    return Response.json({ call: scheduledCall }, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to schedule call.";

    return Response.json({ error: message }, { status: 400 });
  }
}

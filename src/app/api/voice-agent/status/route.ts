import { getVoiceAgentIntegrationStatus } from "@/lib/voice-agent/config";

export const dynamic = "force-dynamic";

export async function GET() {
  return Response.json({
    status: getVoiceAgentIntegrationStatus(),
  });
}

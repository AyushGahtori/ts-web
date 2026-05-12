import { getVoiceAgentIntegrationStatus } from "@/lib/voice-agent/config";

export const dynamic = "force-dynamic";

const noStoreHeaders = {
  "Cache-Control": "no-store, max-age=0",
};

export async function GET() {
  return Response.json(
    {
      status: getVoiceAgentIntegrationStatus(),
    },
    { headers: noStoreHeaders },
  );
}

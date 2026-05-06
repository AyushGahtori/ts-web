export type VoiceAgentRuntimeConfig = {
  callhippoApiKey?: string;
  callhippoApiBaseUrl: string;
  callhippoOutboundCallUrl?: string;
  callhippoOutboundCallMethod: string;
  callhippoOutboundCallType: string;
  callhippoCampaignId?: string;
  callhippoAgentEmail?: string;
  callhippoAutoStartCampaign: boolean;
  callhippoSetAgentAvailable: boolean;
  callhippoFromNumber?: string;
  callhippoWebhookSecret?: string;
  callhippoWebhookUrl?: string;
  deepgramApiKey?: string;
  deepgramAgentEndpoint: string;
  deepgramVoiceModel: string;
};

export function getVoiceAgentRuntimeConfig(): VoiceAgentRuntimeConfig {
  return {
    callhippoApiKey: process.env.CALLHIPPO_API_KEY,
    callhippoApiBaseUrl: process.env.CALLHIPPO_API_BASE_URL ?? "https://web.callhippo.com/v1",
    callhippoOutboundCallUrl: process.env.CALLHIPPO_OUTBOUND_CALL_URL,
    callhippoOutboundCallMethod: process.env.CALLHIPPO_OUTBOUND_CALL_METHOD ?? "PATCH",
    callhippoOutboundCallType: process.env.CALLHIPPO_OUTBOUND_CALL_TYPE ?? "unknown",
    callhippoCampaignId: process.env.CALLHIPPO_CAMPAIGN_ID,
    callhippoAgentEmail: process.env.CALLHIPPO_AGENT_EMAIL,
    callhippoAutoStartCampaign: process.env.CALLHIPPO_AUTO_START_CAMPAIGN === "true",
    callhippoSetAgentAvailable: process.env.CALLHIPPO_SET_AGENT_AVAILABLE === "true",
    callhippoFromNumber: process.env.CALLHIPPO_FROM_NUMBER,
    callhippoWebhookSecret: process.env.CALLHIPPO_WEBHOOK_SECRET,
    callhippoWebhookUrl: process.env.CALLHIPPO_WEBHOOK_URL,
    deepgramApiKey: process.env.DEEPGRAM_API_KEY,
    deepgramAgentEndpoint:
      process.env.DEEPGRAM_AGENT_ENDPOINT ?? "wss://api.deepgram.com/v1/agent/converse",
    deepgramVoiceModel: process.env.DEEPGRAM_VOICE_MODEL ?? "aura-2-thalia-en",
  };
}

export function getVoiceAgentIntegrationStatus() {
  const config = getVoiceAgentRuntimeConfig();

  return {
    callhippo: {
      ready: Boolean(config.callhippoApiKey && config.callhippoCampaignId),
      method: config.callhippoOutboundCallMethod,
      endpointType: config.callhippoOutboundCallType,
      campaignIdSet: Boolean(config.callhippoCampaignId),
      agentEmailSet: Boolean(config.callhippoAgentEmail),
      autoStartCampaign: config.callhippoAutoStartCampaign,
      needsCallSessionPayload: false,
      missing: [
        !config.callhippoApiKey && "CALLHIPPO_API_KEY",
        !config.callhippoCampaignId && "CALLHIPPO_CAMPAIGN_ID",
      ].filter(Boolean),
      fromNumberSet: Boolean(config.callhippoFromNumber),
      webhookSecretSet: Boolean(config.callhippoWebhookSecret),
    },
    deepgram: {
      ready: Boolean(config.deepgramApiKey),
      missing: [!config.deepgramApiKey && "DEEPGRAM_API_KEY"].filter(Boolean),
      agentEndpoint: config.deepgramAgentEndpoint,
      voiceModel: config.deepgramVoiceModel,
    },
  };
}

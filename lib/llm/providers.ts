import Anthropic from "@anthropic-ai/sdk";
import OpenAI from "openai";

export const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY ?? "missing",
});

export const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY ?? "missing",
});

export type LLMProvider = "anthropic" | "openai";

export interface LLMMessage {
  role: "user" | "assistant";
  content: string;
}

export async function callLLM(
  messages: LLMMessage[],
  options: {
    model?: string;
    maxTokens?: number;
    provider?: LLMProvider;
    systemPrompt?: string;
  } = {}
): Promise<{ text: string; inputTokens: number; outputTokens: number }> {
  const {
    model,
    maxTokens = 2048,
    provider = "anthropic",
    systemPrompt,
  } = options;

  if (provider === "anthropic") {
    const usedModel = model ?? "claude-haiku-4-5-20251001";
    const response = await anthropic.messages.create({
      model: usedModel,
      max_tokens: maxTokens,
      system: systemPrompt,
      messages: messages.map((m) => ({ role: m.role, content: m.content })),
    });

    const text =
      response.content[0].type === "text" ? response.content[0].text : "";
    return {
      text,
      inputTokens: response.usage.input_tokens,
      outputTokens: response.usage.output_tokens,
    };
  }

  // OpenAI fallback
  const usedModel = model ?? "gpt-4o-mini";
  const msgList: OpenAI.Chat.ChatCompletionMessageParam[] = [];
  if (systemPrompt) msgList.push({ role: "system", content: systemPrompt });
  messages.forEach((m) => msgList.push({ role: m.role, content: m.content }));

  const response = await openai.chat.completions.create({
    model: usedModel,
    max_tokens: maxTokens,
    messages: msgList,
  });

  return {
    text: response.choices[0].message.content ?? "",
    inputTokens: response.usage?.prompt_tokens ?? 0,
    outputTokens: response.usage?.completion_tokens ?? 0,
  };
}

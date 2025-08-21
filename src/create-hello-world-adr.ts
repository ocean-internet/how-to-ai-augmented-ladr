import "dotenv/config";
import ollama from "ollama";
import Handlebars from "handlebars";
import { getPrompt, getTemplate } from "./shared";

const MODEL = process.env.OLLAMA_MODEL || "";
const TEMPERATURE = 0.7;
const ADR_TEMPLATE = "adr-template-minimal";

export async function createMicroAdr(title: string): Promise<string> {
  const [systemPrompt, adrPrompt, adrTemplate] = await Promise.all([
    getPrompt("system"),
    getPrompt("hello-world-adr"),
    getTemplate(ADR_TEMPLATE),
  ]);

  const data = { title, template: adrTemplate };

  const template = Handlebars.compile(adrPrompt);
  const prompt = `
${systemPrompt}

${template(data)}
`;

  const { response } = await ollama.generate({
    model: MODEL,
    options: {
      temperature: TEMPERATURE,
    },
    prompt,
  });

  return response;
}

import { ChatOpenAI } from "@langchain/openai";
import { Injectable, Logger } from "@nestjs/common";

@Injectable()
export class LlmService {
    private model: ChatOpenAI;
    private logger: Logger = new Logger(LlmService.name);
    constructor() {
        if (!process.env.OPENAI_API_KEY) {
            throw new Error("OPENAI_API_KEY not set");
        }
        if (!process.env.OPENAI_LLM_MODEL) {
            throw new Error("OPENAI_LLM_MODEL not set");
        }
        this.model = new ChatOpenAI({
            model: process.env.OPENAI_LLM_MODEL,
            apiKey: process.env.OPENAI_API_KEY,
            temperature: 0,
        });
    }

    async ask(prompt: string): Promise<string> {
        this.logger.log(`Sending prompt to LLM: ${prompt}`);
        const response = await this.model.invoke(prompt);
        return response.content as string;
    }
}
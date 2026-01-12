import { Injectable } from "@nestjs/common";
import { VectorStoreService } from "src/documents/vectorstore.service";
import { LlmService } from "src/shared/llm.service";

@Injectable()
export class ChatbotService {
    constructor(
        private readonly vectorStore: VectorStoreService,
        private readonly llm: LlmService,
    ) { }

    async ask(question: string) {
        const docs = await this.vectorStore.similaritySearch(question);

        const context = docs
            .map(
                d => `[Source: ${d.metadata.source}]\n${d.pageContent}`,
            )
            .join("\n\n");

        const answer = await this.llm.ask(`
You are a compliance assistant.
Answer ONLY using the context below and do not cite the source in the answer.
If the answer is not found, say "Not found in provided documents."

Context:
${context}

Question:
${question}
    `);

        return {
            answer,
            sources: [...new Set(docs.map(d => d.metadata.source))],
        };
    }
}
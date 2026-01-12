import { Injectable, Logger } from "@nestjs/common";
import { OpenAIEmbeddings } from "@langchain/openai";
import { FaissStore } from "@langchain/community/vectorstores/faiss";
import { Document } from "langchain";

@Injectable()
export class VectorStoreService {
    private logger: Logger = new Logger(VectorStoreService.name);
    private store: FaissStore;

    async init() {
        if(!process.env.OPENAI_API_KEY) {
            throw new Error("OPENAI_API_KEY not set");
        }
        if(!process.env.OPENAI_EMBEDDING_MODEL) {
            throw new Error("OPENAI_EMBEDDING_MODEL not set");
        }   
        const embeddings = new OpenAIEmbeddings({
            model: process.env.OPENAI_EMBEDDING_MODEL,
            apiKey: process.env.OPENAI_API_KEY,
        });

        this.store = await FaissStore.load(
            "vectorstore",
            embeddings,
        ).catch(async () => {
            return await FaissStore.fromDocuments([], embeddings);
        });
    }

    async addDocuments(docs: Document[]) {
        await this.store.addDocuments(docs);
        await this.store.save("vectorstore");
    }

    async similaritySearch(query: string, k = 4) {
        this.logger.log(`Performing similarity search for query: ${query}`);
        return this.store.similaritySearch(query, k);
    }
}

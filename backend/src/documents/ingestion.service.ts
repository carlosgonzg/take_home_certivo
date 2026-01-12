import { Injectable, Logger } from "@nestjs/common";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { VectorStoreService } from "./vectorstore.service";
import { loadHTML } from "./loaders/html.loader";
import { loadPDF } from "./loaders/pdf.loader";

@Injectable()
export class IngestionService {
    private readonly logger = new Logger(IngestionService.name);
    constructor(private readonly vectorStore: VectorStoreService) { }

    async ingestDocuments() {
        const splitter = new RecursiveCharacterTextSplitter({
            chunkSize: 500,
            chunkOverlap: 100,
        });

        const documents = [
            {
                text: loadHTML("data/part_measurements_test_corporation.html"),
                source: "Part Measurements Test Corporation",
            },
            {
                text: await loadPDF("data/FMD_Test_Corporation.pdf"),
                source: "FMD Test Corporation",
            },
            {
                text: await loadPDF("data/REACH_Certificate_of_Compliance_Test_Corporation.pdf"),
                source: "REACH Certificate of Compliance Test Corporation",
            },
        ];

        for (const doc of documents) {
            this.logger.log(`Ingesting document from source: ${doc.source}`);
            const chunks = await splitter.createDocuments(
                [doc.text],
                [{ source: doc.source }],
            );

            await this.vectorStore.addDocuments(chunks);
            this.logger.log(`Ingested ${chunks.length} chunks from source: ${doc.source}`);
        }
    }
}

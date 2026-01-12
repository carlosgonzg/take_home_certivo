import { Module } from "@nestjs/common";
import { IngestionService } from "./ingestion.service";
import { VectorStoreService } from "./vectorstore.service";

@Module({
    providers: [
        IngestionService,
        VectorStoreService,
    ],
    exports: [
        VectorStoreService,
    ],
})
export class DocumentsModule { }
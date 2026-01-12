import { Module } from "@nestjs/common";
import { DocumentsModule } from "src/documents/documents.module";
import { ChatbotController } from "./chatbot.controller";
import { ChatbotService } from "./chatbot.service";
import { SharedModule } from "src/shared/shared.module";

@Module({
    imports: [
        DocumentsModule,
        SharedModule
    ],
    controllers: [ChatbotController],
    providers: [ChatbotService],
})
export class ChatbotModule { }
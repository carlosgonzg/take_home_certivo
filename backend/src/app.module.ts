import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DocumentsModule } from './documents/documents.module';
import { ChatbotModule } from './chatbot/chatbot.module';
import { SharedModule } from './shared/shared.module';

@Module({
    imports: [
        ConfigModule.forRoot(),
        DocumentsModule,
        ChatbotModule,
        SharedModule,
    ],
})
export class AppModule { }

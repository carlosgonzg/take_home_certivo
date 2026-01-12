import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import {
    FastifyAdapter,
    NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { ConsoleLogger, Logger, ValidationPipe } from '@nestjs/common';
import { VectorStoreService } from './documents/vectorstore.service';
import { IngestionService } from './documents/ingestion.service';

async function bootstrap() {
    const app = await NestFactory.create<NestFastifyApplication>(
        AppModule,
        new FastifyAdapter({
            logger: true,
        }), {
        logger: new ConsoleLogger({
            json: true,
            colors: process.env.NODE_ENV === 'development'
        })
    });

    app.useGlobalPipes(new ValidationPipe());

    app.enableCors()

    const logger = new Logger('Bootstrap');

    logger.log("Initializing vector store...");
    const vectorStore = app.get(VectorStoreService);
    await vectorStore.init();
    logger.log("Vector store initialized.");

    logger.log("Ingesting documents...");
    const ingestion = app.get(IngestionService);
    await ingestion.ingestDocuments();
    logger.log("Document ingestion complete.");

    await app.listen(process.env.PORT ?? 3000, '0.0.0.0', () => {
        logger.log("Server running on http://localhost:3000");
    });
}

bootstrap();

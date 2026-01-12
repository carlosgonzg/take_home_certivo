import { Body, Controller, Post } from "@nestjs/common";
import { ChatbotService } from "./chatbot.service";
import { AskDto } from "./interfaces/chatbot.dto";

@Controller("chatbot")
export class ChatbotController {
    constructor(private readonly chatbot: ChatbotService) { }

    @Post("ask")
    ask(@Body() data: AskDto) {
        return this.chatbot.ask(data.question);
    }
}
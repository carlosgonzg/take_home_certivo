import { IsNotEmpty } from 'class-validator';

export class AskDto {
  @IsNotEmpty()
  question: string;
}
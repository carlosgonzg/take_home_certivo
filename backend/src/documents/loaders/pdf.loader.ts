import fs from "fs";
import * as PdfParse from 'pdf-parse-new';

const parser = new PdfParse.SmartPDFParser({
  oversaturationFactor: 2.0,
  enableFastPath: true
});

export const loadPDF = async (path: string): Promise<string> => {
    const buffer = fs.readFileSync(path);
    const result = await parser.parse(buffer);
    console.log(`Loaded PDF from ${path}, number of pages: ${result.text}`);
    return result.text;
}

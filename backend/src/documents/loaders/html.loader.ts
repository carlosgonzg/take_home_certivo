import fs from "fs";
import * as cheerio from "cheerio";

export const loadHTML = (path: string): string => {
    const html = fs.readFileSync(path, "utf-8");
    const $ = cheerio.load(html);
    return $("body").text();
}
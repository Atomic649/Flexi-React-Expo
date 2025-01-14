import { Request, Response } from "express";
import fs from "fs";
import pdfParse from "pdf-parse";

// post url from device to backend
// hardcoded url for now
export const extractPdf = async (req: Request, res: Response): Promise<void> => {
    // hardcoded file path
    const filePath = "/Volumes/LACIES/Flexi-React-Expo/backend/uploads/images/pdf/AcctSt2.pdf";

    // read file
    const buffer = fs.readFileSync(filePath);
    const data = await pdfParse(buffer);
    let text = data.text;

    console.log("🔥text", text);

    // extract specific patterns
    // pattern to match: X1/ENET and X2/ENET  both credit and debit
    // const pattern = /\bX[12]\/ENET\d{1,3}(?:,\d{3})*\.\d{2}\d{1,3}(?:,\d{3})*\.\d{2}\b/g;

    // pattern to match: X2/ENET only credit
    const pattern = /\bX[2]\/ENET\d{1,3}(?:,\d{3})*\.\d{2}\d{1,3}(?:,\d{3})*\.\d{2}\b/g;
    const matches = text.match(pattern);

    // process matches to desired format
    const formattedMatches = matches?.map(match => {
        return match.replace(/(\d{1,3}(?:,\d{3})*\.\d{2})\d{1,3}(?:,\d{3})*\.\d{2}/, '$1');
    });

    res.json({ matches: formattedMatches });
};


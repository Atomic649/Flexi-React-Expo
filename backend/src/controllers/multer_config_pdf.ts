import { Request } from "express";
import multer, { FileFilterCallback } from "multer";
import fs from "fs";

const storage = multer.diskStorage({
  destination: (
    req: Request,
    file: Express.Multer.File,
    callback: (error: Error | null, destination: string) => void
  ) => {
    const folder = "./uploads/pdfs/";
    if (!fs.existsSync(folder)) {
      fs.mkdirSync(folder);
    }
    callback(null, folder);
  },
  filename: (
    req: Request,
    file: Express.Multer.File,
    callback: (error: Error | null, filename: string) => void
  ) => {
    const ext = file.mimetype.split("/")[1];
    callback(null, `${file.fieldname}-${Date.now()}.${ext}`);
  },
});

const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  callback: FileFilterCallback
) => {
  if (file.mimetype === "application/pdf") {
    callback(null, true);
  } else {
    callback(new Error("Not a PDF! Please upload a PDF."));
  }
};

const multerConfigPDF = {
  config: {
    storage,
    limits: { fileSize: 1024 * 1024 * 10 }, // 10 MB limit
    fileFilter,
  },
  keyUpload: "pdfFile",
};

export default multerConfigPDF;

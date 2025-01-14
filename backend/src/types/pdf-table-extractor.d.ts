declare module "pdf-table-extractor" {
    interface PdfTableExtractorResult {
        pageTables: Array<{
            page: number;
            tables: string[][];
        }>;
    }

    function pdfTableExtractor(
        buffer: Buffer,
        successCallback: (result: PdfTableExtractorResult) => void,
        errorCallback: (error: Error) => void
    ): void;

    export = pdfTableExtractor;
}

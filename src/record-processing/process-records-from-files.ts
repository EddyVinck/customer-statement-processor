import { parseCsv } from "./csv";
import { ParsedStatementRecord } from "./types";
import { validateRecords } from "./validate-records";
import { parseXml } from "./xml";

const textDecoder = new TextDecoder();

export async function processRecordsFromFiles(files: Blob[]) {
  let parsedRecords: ParsedStatementRecord[] = [];

  for (let i = 0; i < files.length; i++) {
    const fileWithRecords = files[i];
    if (!fileWithRecords) continue;

    const fileContents = await fileWithRecords.arrayBuffer();
    const fileText = textDecoder.decode(fileContents);

    switch (fileWithRecords.type) {
      case "text/csv":
        const parsedCsv = await parseCsv(fileText);
        parsedRecords = parsedRecords.concat(parsedCsv);
        break;
      case "text/xml":
        const parsedXml = await parseXml(fileText);
        parsedRecords = parsedRecords.concat(parsedXml);
        break;
      default:
        console.log(`Unhandled file type "${fileWithRecords.type}"`);
        break;
    }
  }

  const validationErrors = validateRecords(parsedRecords);

  return {
    validationErrors,
    parsedRecords,
  };
}

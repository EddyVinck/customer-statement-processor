import csv from "csv-parser";
import {
  type ParsedStatementRecord,
  unparsedCsvStatementRecord,
} from "./types";

export const parseCsv = async (
  data: string
): Promise<ParsedStatementRecord[]> => {
  return new Promise((resolve, reject) => {
    const records: ParsedStatementRecord[] = [];

    const stream = csv({ separator: "," })
      .on("data", (row) => {
        const validatedData = unparsedCsvStatementRecord.safeParse(row);

        if (!validatedData.success) {
          console.log(validatedData.error);
          throw new Error(
            "CSV data did not match unparsedStatementRecordsFromXml schema"
          );
        }
        const record = validatedData.data;
        records.push({
          reference: record.Reference,
          accountNumber: record["Account Number"],
          description: record.Description,
          startBalance: parseFloat(record["Start Balance"]),
          mutation: record.Mutation,
          endBalance: parseFloat(record["End Balance"]),
        });
      })
      .on("end", () => {
        resolve(records);
      })
      .on("error", reject);

    stream.write(data);
    stream.end();
  });
};

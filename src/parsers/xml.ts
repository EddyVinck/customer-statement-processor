import { parseString } from "xml2js";
import {
  unparsedXmlStatementRecord,
  type ParsedStatementRecord,
} from "../types";
import { z } from "zod";

const unparsedStatementRecordsFromXml = z.object({
  records: z.object({
    record: z.array(unparsedXmlStatementRecord),
  }),
});

export const parseXml = async (
  data: string
): Promise<ParsedStatementRecord[]> => {
  return await new Promise((resolve, reject) => {
    parseString(data, (err, result) => {
      if (err instanceof Error) {
        reject(err);
      }
      const validatedData = unparsedStatementRecordsFromXml.safeParse(result);

      if (!validatedData.success) {
        console.log(validatedData.error);
        throw new Error(
          "XML data did not match unparsedStatementRecordsFromXml schema"
        );
      }

      const records: ParsedStatementRecord[] =
        validatedData.data.records.record.map((record) => ({
          reference: record.$.reference,
          // casting is fine here, we already validated the length with Zod above
          accountNumber: record.accountNumber[0] as string,
          description: record.description[0] as string,
          mutation: record.mutation[0] as string,
          startBalance: parseFloat(record.startBalance[0] as string),
          endBalance: parseFloat(record.endBalance[0] as string),
        }));
      resolve(records);
    });
  });
};

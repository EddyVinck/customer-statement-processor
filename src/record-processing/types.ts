import { z } from "zod";

// This is to validate the data xml2js returns
export const unparsedXmlStatementRecord = z.object({
  $: z.object({
    reference: z.string().min(1),
  }),
  accountNumber: z.array(z.string().min(18)).length(1),
  description: z.array(z.string().min(1)).length(1),
  startBalance: z.array(z.string().min(1)).length(1),
  mutation: z.array(z.string().min(1)).length(1),
  endBalance: z.array(z.string().min(1)).length(1),
});

// This is to validate the data csv-parser returns
export const unparsedCsvStatementRecord = z.object({
  Reference: z.string().min(1),
  "Account Number": z.string().min(18),
  Description: z.string().min(1),
  "Start Balance": z.string().min(1),
  Mutation: z.string().min(1),
  "End Balance": z.string().min(1),
});

// The normalized structure of a parsed statement record used in the application
export const parsedStatementRecord = z.object({
  reference: z.string().min(1),
  accountNumber: z.string().min(18),
  description: z.string().min(1),
  startBalance: z.number(),
  mutation: z.string().min(1),
  endBalance: z.number(),
});

export type ParsedStatementRecord = z.infer<typeof parsedStatementRecord>;

export type RecordReference = Pick<
  ParsedStatementRecord,
  "reference" | "description"
>;

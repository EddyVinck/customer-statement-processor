import { describe, expect, test } from "vitest";
import { parseCsv } from "../../parsers/csv";
import fs from "node:fs";
import path from "node:path";
import { type ParsedStatementRecord } from "../../types";

describe("CSV processing", () => {
  test("The data is parsed as expected", async () => {
    const testXml = fs.readFileSync(
      path.join(__dirname, "../fixtures/records.csv"),
      "utf8"
    );
    const recordsFromCsv = await parseCsv(testXml);
    expect(recordsFromCsv.length).toBe(10);

    expect(recordsFromCsv[0]).toMatchObject({
      reference: "183398",
      accountNumber: "NL56RABO0149876948",
      description: "Clothes from Richard de Vries",
      startBalance: 33.34,
      mutation: "+5.55",
      endBalance: 38.89,
    } satisfies ParsedStatementRecord);
  });
});

import { describe, expect, test } from "vitest";
import { parseXml } from "../../record-processing/xml";
import fs from "node:fs";
import path from "node:path";
import { type ParsedStatementRecord } from "../../record-processing/types";

describe("XML processing", () => {
  test("The data is parsed as expected", async () => {
    const testXml = fs.readFileSync(
      path.join(__dirname, "../fixtures/records.xml"),
      "utf8"
    );
    const recordsFromXml = await parseXml(testXml);
    expect(recordsFromXml.length).toBe(10);

    expect(recordsFromXml[0]).toMatchObject({
      reference: "138932",
      accountNumber: "NL90ABNA0585647886",
      description: "Flowers for Richard Bakker",
      startBalance: 94.9,
      mutation: "+14.63",
      endBalance: 109.53,
    } satisfies ParsedStatementRecord);
  });
});

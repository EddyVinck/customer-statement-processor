import { describe, expect, test } from "vitest";
import { type ParsedStatementRecord } from "../../record-processing/types";
import { validateRecords } from "../../record-processing/validate-records";

describe("Record validation", () => {
  test("Catches duplicate reference ID errors", () => {
    const records: ParsedStatementRecord[] = [
      {
        reference: "A",
        accountNumber: "1",
        description: "Good morning",
        startBalance: 10,
        mutation: "+5",
        endBalance: 15,
      },
      {
        reference: "A",
        accountNumber: "2",
        description: "Good afternoon",
        startBalance: 10,
        mutation: "-5",
        endBalance: 5,
      },
      {
        reference: "C",
        accountNumber: "3",
        description: "Good night",
        startBalance: 10,
        mutation: "-10",
        endBalance: 0,
      },
    ];

    const recordsWithErrors = validateRecords(records);
    expect(recordsWithErrors).toHaveLength(1);
  });

  test("Catches incorrect mutation errors", () => {
    const records: ParsedStatementRecord[] = [
      {
        reference: "A",
        accountNumber: "1",
        description: "Good morning",
        startBalance: 10,
        mutation: "+5",
        endBalance: 16,
      },
      {
        reference: "B",
        accountNumber: "2",
        description: "Good afternoon",
        startBalance: 10,
        mutation: "-5",
        endBalance: 4,
      },
      {
        reference: "C",
        accountNumber: "3",
        description: "Good night",
        startBalance: 10,
        mutation: "-10",
        endBalance: 1,
      },
    ];

    const recordsWithErrors = validateRecords(records);
    expect(recordsWithErrors).toHaveLength(3);
  });

  test("Returns an empty array when there are no errors", () => {
    const records: ParsedStatementRecord[] = [
      {
        reference: "A",
        accountNumber: "1",
        description: "Good morning",
        startBalance: 10,
        mutation: "+5",
        endBalance: 15,
      },
      {
        reference: "B",
        accountNumber: "2",
        description: "Good afternoon",
        startBalance: 10,
        mutation: "-5",
        endBalance: 5,
      },
      {
        reference: "C",
        accountNumber: "3",
        description: "Good night",
        startBalance: 10,
        mutation: "-10",
        endBalance: 0,
      },
    ];
    const recordsWithErrors = validateRecords(records);
    expect(recordsWithErrors).toHaveLength(0);
  });

  test("Records with multiple detected errors result in multiple returned errors", () => {
    const records: ParsedStatementRecord[] = [
      {
        reference: "A",
        accountNumber: "1",
        description: "Good morning",
        startBalance: 10,
        mutation: "+5",
        endBalance: 15,
      },
      {
        reference: "A",
        accountNumber: "2",
        description: "Good afternoon",
        startBalance: 10,
        mutation: "-5",
        endBalance: 1000,
      },
      {
        reference: "C",
        accountNumber: "3",
        description: "Good night",
        startBalance: 10,
        mutation: "-10",
        endBalance: 0,
      },
    ];
    const recordsWithErrors = validateRecords(records);
    expect(recordsWithErrors).toHaveLength(2);
  });
});

import Big from "big.js";
import { ParsedStatementRecord, RecordReference } from "./types";

export const validateRecords = (
  records: ParsedStatementRecord[]
): RecordReference[] => {
  const errors: RecordReference[] = [];
  const checkedReferences = new Set<string>();

  for (let i = 0; i < records.length; i++) {
    const record = records[i];
    if (!record) continue;

    // Check for duplicate references
    if (checkedReferences.has(record.reference)) {
      errors.push({
        reference: record.reference,
        description: record.description,
      });
    }
    checkedReferences.add(record.reference);

    // Check end balance
    let balance = new Big(record.startBalance);
    const endBalanceFromRecord = new Big(record.endBalance);
    // Slice off the + or - on the mutation amount
    const mutationAmount = new Big(record.mutation.slice(1));

    if (record.mutation.startsWith("+")) {
      balance = balance.plus(mutationAmount);
    } else if (record.mutation.startsWith("-")) {
      balance = balance.minus(mutationAmount);
    } else {
      throw new Error(
        `Invalid mutation "${record.mutation}" for record "${record.reference}"`
      );
    }

    if (balance.eq(endBalanceFromRecord) === false) {
      errors.push({
        reference: record.reference,
        description: record.description,
      });
    }
  }

  return errors;
};

"use server";

import { z } from "zod";
import { processRecordsFromFiles } from "../../record-processing/process-records-from-files";

// `File` is not supported in Node so `Blob` is used
const allowedFileTypes = ["text/csv", "text/xml", "application/xml"];
const fileSchema = z.custom<Blob>((maybeFile) => {
  return maybeFile instanceof Blob && allowedFileTypes.includes(maybeFile.type);
}, "Incorrect file type");

const uploadedFilesSchema = z.object({
  records: z.array(fileSchema),
});

export async function validateUploadedFiles(data: FormData) {
  try {
    const uploadedFiles = uploadedFilesSchema.parse({
      records: data.getAll("records"),
    });

    const { parsedRecords, validationErrors } = await processRecordsFromFiles(
      uploadedFiles.records
    );

    return {
      message: `Parsed ${parsedRecords.length} records and found ${validationErrors.length} errors!`,
      validationErrors,
    };
  } catch (error) {
    const err = (error as Error).message;
    return {
      error: err,
      message: "The files you uploaded are not allowed",
    };
  }
}

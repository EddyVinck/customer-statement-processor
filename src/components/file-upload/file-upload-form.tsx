"use client";

import { useState } from "react";
import { validateUploadedFiles } from "./upload-action";
import { SubmitButton } from "./upload-button";
import { RecordReference } from "../../record-processing/types";
import { RecordReport } from "../record-error-report/record-error-report";

export const FileUploadForm = () => {
  const [message, setMessage] = useState("");
  const [recordsWithErrors, setRecordsWithErrors] = useState<RecordReference[]>(
    []
  );

  async function handleUpload(formData: FormData) {
    setMessage("");
    setRecordsWithErrors([]);

    const res = await validateUploadedFiles(formData);

    setMessage(res.message);
    if (res.validationErrors) {
      setRecordsWithErrors(res.validationErrors);
    }
  }

  return (
    <div className="bg-gray-900 p-4 border-white rounded-md border">
      <form action={handleUpload} className="flex flex-col items-start gap-4">
        <div className="flex flex-col gap-2">
          <label htmlFor="records">Upload your records to be checked</label>
          <input type="file" name="records" id="records" multiple required />
          <p className="italic text-sm">
            Note: only <code>.csv</code> and <code>.xml</code> files are
            supported.
          </p>
        </div>
        <SubmitButton />
        {!!message && <h2 className="font-medium text-lg">{message}</h2>}
        {recordsWithErrors.length > 1 && (
          <RecordReport records={recordsWithErrors} />
        )}
      </form>
    </div>
  );
};

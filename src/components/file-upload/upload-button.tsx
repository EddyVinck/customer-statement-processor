"use client";

import { experimental_useFormStatus as useFormStatus } from "react-dom";

export function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button className="bg-slate-600 p-2 px-6 rounded-md" disabled={pending}>
      {pending ? "Submitting..." : "Submit"}
    </button>
  );
}

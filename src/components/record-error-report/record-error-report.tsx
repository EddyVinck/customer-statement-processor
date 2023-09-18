import { RecordReference } from "../../record-processing/types";

type RecordReportProps = {
  records: RecordReference[];
};

export const RecordReport = ({ records }: RecordReportProps) => {
  if (!records.length) {
    return null;
  }

  return (
    <div className="flex flex-col w-full">
      <div className="overflow-x-auto sm:mx-0.5 lg:mx-0.5">
        <div className="py-2 inline-block min-w-full">
          <div className="overflow-hidden">
            <table className="w-full">
              <thead className="bg-slate-900 border-b">
                <tr>
                  <th
                    scope="col"
                    className="text-sm font-medium text-gray-100 px-6 py-4 text-left"
                  >
                    Reference
                  </th>
                  <th
                    scope="col"
                    className="text-sm font-medium text-gray-100 px-6 py-4 text-left"
                  >
                    Description
                  </th>
                </tr>
              </thead>
              <tbody>
                {records.map((record, i) => (
                  // add index to key because records can be erroneous when their references are duplicate
                  <tr
                    key={`${record.reference}-${i}`}
                    className="bg-slate-800 odd:bg-slate-900 border-b"
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-100">
                      {record.reference}
                    </td>
                    <td className="text-sm text-gray-100 font-light px-6 py-4 whitespace-nowrap truncate max-w-xs">
                      {record.description}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

import { t } from "i18next";
import { IoDocumentTextOutline } from "react-icons/io5";

const ViewHomeworkTable = ({ data }) => {
  return (
    <div className="bg-white border border-gray-800 rounded-xl">
      <ul>
        <li className="grid items-center grid-cols-4 border-b border-gray-800">
          <span className="col-span-1 px-6 text-xl font-bold text-center text-mainColor">
            {t(`student name`)}
          </span>
          <span className="col-span-3 px-6 py-8 text-lg border-gray-800 border-s">
            {t(`${data.studentName}`)}
          </span>
        </li>

        <li className="grid items-center grid-cols-4 border-b border-gray-800">
          <span className="col-span-1 px-6 text-xl font-bold text-center text-mainColor">
            {t(`student code`)}
          </span>
          <span className="col-span-3 px-6 py-8 text-lg border-gray-800 border-s">
            {t(`${data.studentCode}`)}
          </span>
        </li>

        <li className="grid items-center grid-cols-4 border-b border-gray-800">
          <span className="col-span-1 px-6 text-xl font-bold text-center text-mainColor">
            {t(`assignment title`)}
          </span>
          <span className="col-span-3 px-6 py-8 text-lg border-gray-800 border-s">
            {t(`${data.assignmentTitle}`)}
          </span>
        </li>

        <li className="grid items-center grid-cols-4 border-b border-gray-800">
          <span className="col-span-1 px-6 text-xl font-bold text-center text-mainColor ">
            {t(`instructions`)}
          </span>
          <span className="col-span-3 px-6 py-8 text-lg border-gray-800 border-s">
            {t(`${data.instructions}`)}
          </span>
        </li>

        <li className="grid items-center grid-cols-4 border-b border-gray-800">
          <span className="col-span-1 px-6 text-xl font-bold text-center text-mainColor">
            {t(`student answer`)}
          </span>
          <span className="col-span-3 px-6 py-8 text-lg border-gray-800 border-s">
            {t(`${data.studentAnswer}`)}
          </span>
        </li>

        <li className="grid items-center grid-cols-4">
          <span className="col-span-1 px-6 text-xl font-bold text-center text-mainColor">
            {t(`attached file`)}
          </span>
          <span className="col-span-3 px-6 py-8 text-lg border-gray-800 border-s">
            {data.attachedFile ? (
              <a
                href={data.attachedFile}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 px-4 py-2 bg-white border w-max"
              >
                <span>
                  <IoDocumentTextOutline className="text-2xl text-green-600" />
                </span>
                <span>{data.attachedFileName}</span>
              </a>
            ) : (
              t(`${"noFileAttached"}`)
            )}
          </span>
        </li>
      </ul>
    </div>
  );
};

export default ViewHomeworkTable;

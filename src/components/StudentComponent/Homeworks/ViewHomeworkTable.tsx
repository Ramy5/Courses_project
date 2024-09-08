import { t } from "i18next";
import { IoDocumentTextOutline } from "react-icons/io5";
import BaseInput from "../../UI/BaseInput";

const ViewHomeworkTable = ({ data, isInstructor, setEvaluateHomeworkFile }) => {
  return (
    <div className="bg-white border border-gray-800 rounded-xl">
      <ul>
        <li className="grid items-center grid-cols-4 border-b border-gray-800">
          <span className="col-span-1 px-2 text-sm font-bold text-center lg:px-6 lg:text-xl text-mainColor">
            {t(`student name`)}
          </span>
          <span className="col-span-3 px-6 py-8 text-lg border-gray-800 border-s">
            {t(`${data.studentName}`)}
          </span>
        </li>

        <li className="grid items-center grid-cols-4 border-b border-gray-800">
          <span className="col-span-1 text-sm font-bold text-center lg:px-6 lg:text-xl text-mainColor">
            {t(`student code`)}
          </span>
          <span className="col-span-3 px-6 py-8 text-lg border-gray-800 border-s">
            {t(`${data.studentCode}`)}
          </span>
        </li>

        <li className="grid items-center grid-cols-4 border-b border-gray-800">
          <span className="col-span-1 text-sm font-bold text-center lg:px-6 lg:text-xl text-mainColor">
            {data?.isProject ? t("project title") : t(`assignment title`)}
          </span>
          <span className="col-span-3 px-6 py-8 text-lg border-gray-800 border-s">
            {t(`${data.assignmentTitle}`)}
          </span>
        </li>

        <li className="grid items-center grid-cols-4 border-b border-gray-800">
          <span className="col-span-1 text-sm font-bold text-center lg:px-6 lg:text-xl text-mainColor ">
            {t(`instructions`)}
          </span>
          <span className="col-span-3 px-6 py-8 text-lg border-gray-800 border-s">
            {t(`${data.instructions}`)}
          </span>
        </li>

        <li className="grid items-center grid-cols-4 border-b border-gray-800">
          <span className="col-span-1 text-sm font-bold text-center lg:px-6 lg:text-xl text-mainColor ">
            {t(`student answer`)}
          </span>
          <span className="col-span-3 px-6 py-8 text-lg border-gray-800 border-s">
            {t(`${data.studentAnswer}`)}
          </span>
        </li>

        {isInstructor ? (
          <li className="grid items-center grid-cols-4">
            <span className="col-span-1 text-sm font-bold text-center lg:px-6 lg:text-xl text-mainColor">
              {t(`attached file`)}
            </span>
            <span className="col-span-3 px-6 py-8 text-lg border-gray-800 border-s">
              {data.attachedFile ? (
                <input
                  type="file"
                  onChange={(e) => {
                    setEvaluateHomeworkFile(e.target.files[0]);
                  }}
                />
              ) : (
                t(`${"noFileAttached"}`)
              )}
            </span>
          </li>
        ) : (
          <li className="grid items-center grid-cols-4">
            <span className="col-span-1 text-sm font-bold text-center lg:px-6 lg:text-xl text-mainColor">
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
        )}

        {isInstructor && (
          <li className="grid items-center grid-cols-4 border-b border-gray-800">
            <span className="col-span-1 text-sm font-bold text-center lg:px-6 lg:text-xl text-mainColor">
              {t(`evaluate`)}
            </span>
            <span className="col-span-3 px-6 py-8 text-lg border-gray-800 border-s">
              <BaseInput
                type="number"
                className="w-44 text-lg py-2 bg-lightGray main_shadow rounded-lg text-slate-800 focus-within:outline-none"
                name="evaluate"
                id="evaluate"
              />
            </span>
          </li>
        )}
      </ul>
    </div>
  );
};

export default ViewHomeworkTable;

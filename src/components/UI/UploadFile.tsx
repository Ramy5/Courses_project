import { t } from "i18next";
import { Button } from "..";
import uploadImg from "../../assets/Sittengs/Group 24.svg";
import { IoDocumentTextOutline } from "react-icons/io5";

interface uploadFile_TP {
  files: [];
  setFiles: (files: File[]) => void;
  id: string;
}

const UploadFile = ({ files, setFiles, id }: uploadFile_TP) => {
  console.log(
    "🚀 ~ UploadFile ~ files:",
    files?.type.startsWith("application")
  );
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setFiles(file);
  };

  const handleButtonClick = () => {
    document.getElementById(id).click();
  };

  return (
    <div className="flex flex-col items-center p-4">
      <input
        type="file"
        id={id}
        accept="*"
        className="hidden"
        onChange={handleFileChange}
      />
      <img src={uploadImg} alt="upload" onClick={handleButtonClick} />
      {files && (
        <div className="mt-4 text-center">
          {files?.type.startsWith("application") ? (
            <p className="flex items-center gap-1 px-4 py-2 bg-white border w-max">
              <span>
                <IoDocumentTextOutline className="text-2xl text-green-600" />
              </span>
              <span>{files.name}</span>
            </p>
          ) : (
            <img
              src={URL?.createObjectURL(files)}
              alt="Preview"
              className="w-20 h-20 mt-2 rounded-md shadow-md"
            />
          )}
        </div>
      )}

      <Button className="mt-5 bg-mainRed" action={() => setFiles(null)}>
        {t("delete")}
      </Button>
    </div>
  );
};

export default UploadFile;

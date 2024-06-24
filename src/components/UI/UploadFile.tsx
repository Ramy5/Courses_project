import { t } from "i18next";
import { Button } from "..";
import uploadImg from "../../assets/Sittengs/Group 24.svg";

interface uploadFile_TP {
  files: [];
  setFiles: (files: File[]) => void;
}

const UploadFile = ({ files, setFiles }: uploadFile_TP) => {
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setFiles(file);
  };

  const handleButtonClick = () => {
    document.getElementById("file-input").click();
  };

  return (
    <div className="flex flex-col items-center p-4">
      <input
        type="file"
        id="file-input"
        className="hidden"
        onChange={handleFileChange}
      />
      <img src={uploadImg} alt="upload" onClick={handleButtonClick} />
      {files && (
        <div className="mt-4 text-center">
          <img
            src={URL?.createObjectURL(files)}
            alt="Preview"
            className="w-20 h-20 mt-2 rounded-md shadow-md"
          />
        </div>
      )}

      <Button className="mt-5 bg-mainRed" action={() => setFiles(null)}>
        {t("delete")}
      </Button>
    </div>
  );
};

export default UploadFile;

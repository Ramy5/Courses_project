import { useNavigate } from "react-router-dom";
import { Button } from "..";
import { t } from "i18next";

interface Back_TP {
  path?: string;
}

const Back = ({ path }: Back_TP) => {
  const navigate = useNavigate();

  return (
    <Button action={() => (path ? navigate(path) : navigate(-1))}>
      {t("back")}
    </Button>
  );
};

export default Back;

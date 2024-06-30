import { useState } from "react";
import { Button } from "../..";
import { t } from "i18next";
import HomeworksRequired from "./HomeworksRequired";
import HomeworkDone from "./HomeworkDone";

const HomeworksTabs = () => {
  const [activeTab, setActiveTab] = useState(1);

  return (
    <div>
      <div className={`flex items-center gap-4 p-6 bg-white rounded-2xl`}>
        <Button
          className={`${
            activeTab === 1 ? "" : " bg-transparent text-mainColor"
          }`}
          action={() => setActiveTab(1)}
        >
          {t("required duties")}
        </Button>
        <Button
          action={() => setActiveTab(2)}
          className={`${
            activeTab === 2 ? "" : "bg-transparent text-mainColor"
          } `}
        >
          {t("duties carried out")}
        </Button>
      </div>

      <div>
        {activeTab === 1 && <HomeworksRequired />}
        {activeTab === 2 && <HomeworkDone />}
      </div>
    </div>
  );
};

export default HomeworksTabs;

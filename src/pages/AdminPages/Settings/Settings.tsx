import { Form, Formik } from "formik";
import { t } from "i18next";
import { useState } from "react";
import {
  OrganizationLogo,
  OrganizationSettingData,
  SideBarMenuColor,
} from "../../../components";
import customFetch from "../../../utils/axios";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import Loading from "../../../components/UI/Loading";
import axios from "axios";
import Cookies from "js-cookie";
import { BASE_URL } from "../../../utils/constants";

interface organizationData_TP {
  organization_name: string;
  organization_email: string;
  organization_vision: string;
  organization_mission: string;
  organization_logo: object;
  organization_cover: object;
  color: string;
}

const postOrganizationSetting = async (
  organizationData: organizationData_TP
) => {
  const token = Cookies.get("token");
  const response = await axios.post(`${BASE_URL}setting/1`, organizationData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });
  return response;
};

const getOrganizationSetting = async () => {
  const { data } = await customFetch.get("setting/1");
  return data.data.setting;
};

const Settings = () => {
  const [activeTab, setActiveTab] = useState<string>("organization data");
  const [organizationFile, setOrganizationFile] = useState(null);
  const [organizationCoverFile, setOrganizationCoverFile] = useState(null);

  const { data, isLoading, isRefetching, isFetching } = useQuery({
    queryKey: ["get-setting-data"],
    queryFn: getOrganizationSetting,
  });

  const initialValues = {
    organization_name: data?.organization_name || "",
    organization_email: data?.organization_email || "",
    organization_vision: data?.organization_vision || "",
    organization_mission: data?.organization_mission || "",
    color: data?.color || "#393D94",
  };

  const tabs = [
    { id: 0, title: "organization data" },
    { id: 1, title: "organization logo" },
    { id: 2, title: "side menu color" },
  ];

  const { mutate, isPending } = useMutation({
    mutationKey: ["add-organization-data"],
    mutationFn: postOrganizationSetting,
    onSuccess: () => {
      toast.success(t("organization data has successfully added"));
    },
    onError: (error: any) => {
      const errorMessage = error.message;
      toast.error(errorMessage);
    },
  });

  const handleSubmitSettingData = (values) => {
    const organizationData: organizationData_TP = {
      organization_name: values?.organization_name,
      organization_email: values?.organization_email,
      organization_vision: values?.organization_vision,
      organization_mission: values?.organization_mission,
      organization_logo: organizationFile,
      organization_cover: organizationCoverFile,
      color: values?.color,
    };

    mutate(organizationData);
  };

  if (isFetching || isRefetching || isLoading) return <Loading />;

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values) => handleSubmitSettingData(values)}
    >
      <Form>
        <h2 className="mb-8 text-3xl font-bold text-gray-600">
          {t("settings")}
        </h2>
        <div className="px-2 py-3 md:px-3 xl:px-16 bg-mainColor rounded-tr-2xl rounded-tl-2xl">
          <ul className="flex items-center justify-between">
            {tabs.map((tab) => (
              <li
                key={tab.id}
                className={`cursor-pointer p-1 lg:p-2 text-white font-medium text-sm lg:text-lg ${
                  activeTab === tab.title && "border-b-4 border-b-[#369252]"
                }`}
                onClick={() => setActiveTab(tab.title)}
              >
                {t(`${tab.title}`)}
              </li>
            ))}
          </ul>
        </div>
        <div className="py-8 bg-white rounded-br-2xl rounded-bl-2xl">
          {activeTab === "organization data" && (
            <OrganizationSettingData setActiveTab={setActiveTab} />
          )}
          {activeTab === "organization logo" && (
            <OrganizationLogo
              setOrganizationCoverFile={setOrganizationCoverFile}
              setOrganizationFile={setOrganizationFile}
              organizationCoverFile={organizationCoverFile}
              organizationFile={organizationFile}
              setActiveTab={setActiveTab}
            />
          )}
          {activeTab === "side menu color" && (
            <SideBarMenuColor isPending={isPending} />
          )}
        </div>
      </Form>
    </Formik>
  );
};

export default Settings;

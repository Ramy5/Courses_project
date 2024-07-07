import { Button, InstructorProjectBox } from "../../../components";
import { t } from "i18next";
import { IoMdAdd } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const InstructorProjects = () => {
  const navigate = useNavigate();

  const instructorHomeworkData = [
    {
      projectMaterial: "الفيزياء",
      projectStartShow: "25/5/2024",
      projectEndShow: "30/5/2024",
      projectId: 1,
      color: "#ff0",
    },
    {
      projectMaterial: "الفيزياء",
      projectStartShow: "25/5/2024",
      projectEndShow: "30/5/2024",
      projectId: 2,
      color: "#ff0",
    },
    {
      projectMaterial: "الفيزياء",
      projectStartShow: "25/5/2024",
      projectEndShow: "30/5/2024",
      projectId: 3,
      color: "#f00",
    },
    {
      projectMaterial: "الفيزياء",
      projectStartShow: "25/5/2024",
      projectEndShow: "30/5/2024",
      projectId: 4,
      color: "#f00",
    },
    {
      projectMaterial: "الفيزياء",
      projectStartShow: "25/5/2024",
      projectEndShow: "30/5/2024",
      projectId: 5,
      color: "#f00",
    },
    {
      projectMaterial: "الفيزياء",
      projectStartShow: "25/5/2024",
      projectEndShow: "30/5/2024",
      projectId: 6,
      color: "#00f",
    },
    {
      projectMaterial: "الفيزياء",
      projectStartShow: "25/5/2024",
      projectEndShow: "30/5/2024",
      projectId: 7,
      color: "#00f",
    },
  ];

  return (
    <div>
      <div className="flex justify-end">
        <Button
          className="flex items-center gap-1"
          action={() => navigate("/instructors/addProject")}
        >
          <IoMdAdd className="text-xl" />
          <span className="pb-1 border-b-2 border-mainColor">
            {t("add project")}
          </span>
        </Button>
      </div>

      <div className="grid gap-12 mt-20 lg:grid-cols-2 xl:grid-cols-3">
        {instructorHomeworkData.map((project) => (
          <InstructorProjectBox key={project.projectId} {...project} />
        ))}
      </div>
    </div>
  );
};

export default InstructorProjects;

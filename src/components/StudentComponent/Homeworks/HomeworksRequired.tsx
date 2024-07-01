import HomeworkRequiredBox from "./HomeworkRequiredBox";

const HomeworksRequired = () => {
  const data = [
    {
      id: 1,
      subject: "Physics",
      professor: "Abdullah Fares",
      taskName: "Homework",
      startDate: "23/3/2024",
      endDate: "30/3/2024",
      color: "#f00",
    },
    {
      id: 2,
      subject: "Mathematics",
      professor: "Ali Ahmed",
      taskName: "Homework",
      startDate: "1/4/2024",
      endDate: "8/4/2024",
      color: "#f0f",
    },
    {
      id: 3,
      subject: "Mathematics",
      professor: "Ali Ahmed",
      taskName: "Homework",
      startDate: "1/4/2024",
      endDate: "8/4/2024",
      color: "#f0f",
    },
    {
      id: 4,
      subject: "Mathematics",
      professor: "Ali Ahmed",
      taskName: "Homework",
      startDate: "1/4/2024",
      endDate: "8/4/2024",
      color: "#ff0",
    },
  ];

  return (
    <div className="grid items-center my-10 lg:grid-cols-2 xl:grid-cols-3 gap-x-14 gap-y-8">
      {data.map((el, index) => {
        return <HomeworkRequiredBox key={index} {...el} />;
      })}
    </div>
  );
};

export default HomeworksRequired;

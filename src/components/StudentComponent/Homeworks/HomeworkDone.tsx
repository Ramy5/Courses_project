import Table from "../../UI/Table";

const HomeworkDone = ({ data, column }) => {
  return (
    <div className="p-6 mt-6 bg-white rounded-2xl">
      <Table data={data} columns={column} />
    </div>
  );
};

export default HomeworkDone;

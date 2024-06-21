import React, { ReactNode } from "react";

interface StudentPersonalContact_TP {
  icon: ReactNode;
  contactTitle: string;
  contactValue: string;
}

const StudentPersonalContact = (props: StudentPersonalContact_TP) => {
  const { icon, contactTitle, contactValue } = props;

  return (
    <div className="flex items-center gap-1">
      <p className="flex items-center justify-center p-2 text-white rounded-full shadow-xl lg:p-3 w-max bg-mainColor">
        {icon}
      </p>
      <div>
        <p className="text-lg font-bold text-gray-600">{contactTitle}</p>
        <p>{contactValue}</p>
      </div>
    </div>
  );
};

export default StudentPersonalContact;

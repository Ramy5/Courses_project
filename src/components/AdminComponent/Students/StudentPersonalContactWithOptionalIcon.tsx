import { ReactNode } from "react";

interface StudentPersonalContactWithOptionalIcon_TP {
  icon?: ReactNode;
  contactTitle: string;
  contactValue: string;
}

const StudentPersonalContactWithOptionalIcon = (
  props: StudentPersonalContactWithOptionalIcon_TP
) => {
  const { icon, contactTitle, contactValue } = props;

  return (
    <div className="flex items-start gap-1">
      {icon && <p>{icon}</p>}
      <div>
        <p className="text-lg font-bold text-mainColor">{contactTitle}</p>
        <p className="text-center">{contactValue}</p>
      </div>
    </div>
  );
};

export default StudentPersonalContactWithOptionalIcon;

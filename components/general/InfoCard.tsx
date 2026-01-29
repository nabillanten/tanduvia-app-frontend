import {LucideProps} from "lucide-react";
import React from "react";

interface InfoCardProps {
  label: string;
  value: string | number;
  unit?: string;
  icon: React.ReactNode;
  colorClass: string;
}

const InfoCard: React.FC<InfoCardProps> = ({
  label,
  value,
  unit,
  icon,
  colorClass,
}) => {
  return (
    <div className="bg-white p-3 md:p-4 rounded-xl shadow-sm border border-slate-200 flex items-center space-x-3 md:space-x-4">
      <div className={`p-2 md:p-3 rounded-lg shrink-0 ${colorClass}`}>
        {React.isValidElement(icon)
          ? React.cloneElement(icon as React.ReactElement<LucideProps>, {
              size: 20,
            })
          : icon}
      </div>
      <div className="min-w-0">
        <p className="text-[10px] md:text-xs font-medium text-slate-500 uppercase tracking-wider truncate">
          {label}
        </p>
        <p className="md:text-xl font-bold text-slate-900 truncate">
          {value}{" "}
          <span className="text-xs md:text-sm font-normal text-slate-500">
            {unit}
          </span>
        </p>
      </div>
    </div>
  );
};

export default InfoCard;

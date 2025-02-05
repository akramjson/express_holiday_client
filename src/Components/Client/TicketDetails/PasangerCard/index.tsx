import { useState } from "react";
import { IoPerson } from "react-icons/io5";

type PasangerCardProps = {
  group: any;
  groupIndex: any;
};

const PasangerCard = ({ group, groupIndex }: PasangerCardProps) => {
  const [hoveredId, setHoveredId] = useState(null);

  return (
    <div className="relative p-2 bg-primary rounded-lg shadow-md">
      <IoPerson
        className="text-3xl cursor-pointer text-white"
        onMouseEnter={() => setHoveredId(groupIndex)}
        onMouseLeave={() => setHoveredId(null)}
      />
      {hoveredId === groupIndex && (
        <div className="absolute -top-32 left-0 bg-primary min-w-[200px] min-h-[90px] z-30 p-2 shadow-lg rounded-md text-sm">
          {group.map((item, index) => (
            <div key={index} className="mb-1">
              <h4 className="font-medium capitalize text-gray-300">
                {item.input.label}:
              </h4>
              <p className="text-white font-semibold capitalize">
                {item.response}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PasangerCard;

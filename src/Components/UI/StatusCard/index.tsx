import { IconType } from "react-icons";

export type CardStatus = {
  title: string;
  description?: string;
  icon: IconType;
  number?: number;
  color: string;
  bg: string;
};

type StatusCardProps = {
  card: CardStatus;
};

const StatusCard = ({ card }: StatusCardProps) => {
  return (
    <div className="relative min-h-[140px] p-5 w-[35%] bg-white shadow-md overflow-hidden rounded-2xl flex flex-col gap-5">
      <h2 className="text-[#BFBFBD]">{card.title}</h2>
      <h2 className="text-3xl font-bold capitalize">
        {card.description ? card.description : `${card.number} tickets`}
      </h2>
      <div
        className={`absolute -right-4 flex items-center justify-center -top-5 size-28 rounded-s-full rotate-[330deg]`}
        style={{ backgroundColor: card.bg }}
      >
        <card.icon className="text-4xl" style={{ color: card.color }} />
      </div>
    </div>
  );
};

export default StatusCard;

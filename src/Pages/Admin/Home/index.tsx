import { assets } from "../../../assets";
import { Tickets } from "../../../Components/Admin/Home";
import StatusCard, { CardStatus } from "../../../Components/UI/StatusCard";
import useTickets from "../../../hooks/Tickets/View/useTickets";

const AdminHome = () => {
  const cards: CardStatus[] = [
    {
      title: "open tickets",
      number: 45,
      icon: assets.openStatusIcon,
      color: "#15822C",
      bg: "#15822C1F",
    },
    {
      title: "pending tickets",
      number: 5,
      icon: assets.pendingStatusIcon,
      color: "#7F5E0C",
      bg: "#ECE8DE",
    },
    {
      title: "closed tickets",
      number: 5,
      icon: assets.closedStatusIcon,
      color: "#002379",
      bg: "#1640D61F",
    },
  ];
  const { data: tickets, isPending } = useTickets();

  return (
    <div className="w-[85%] mx-auto flex flex-col gap-4">
      <h1 className="text-2xl font-semibold">
        Welcome Jhon you have {tickets?.data?.length} Tickets
      </h1>
      <div className="flex items-center gap-4">
        {cards.map((card) => (
          <StatusCard card={card} key={card.title} />
        ))}
      </div>
      <Tickets />
    </div>
  );
};

export default AdminHome;

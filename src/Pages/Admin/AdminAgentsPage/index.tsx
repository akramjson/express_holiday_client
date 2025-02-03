import { assets } from "../../../assets";
import Agents from "../../../Components/Admin/Agents";
import StatusCard, { CardStatus } from "../../../Components/UI/StatusCard";
import useUsers from "../../../hooks/Users/View/useUsers";
import { useAuthStore } from "../../../Store/Auth/authStore";

const AdminAgentsPage = () => {
  const { user } = useAuthStore();
  const { data: agents, isPending } = useUsers({
    role: "agent",
    offset: 1,
    limit: 100,
  });
  console.log(agents, "users");

  const cards: CardStatus[] = [
    {
      title: "total agent number",
      description: "45 Agent",
      icon: assets.openStatusIcon,
      color: "#15822C",
      bg: "#A718EF1F",
    },
    {
      title: "amount per ticket ",
      description: "200 DZD",
      icon: assets.pendingStatusIcon,
      color: "#7F5E0C",
      bg: "#1640D6",
    },
    {
      title: "Total amount",
      description: "200000 DZD",
      icon: assets.closedStatusIcon,
      color: "#002379",
      bg: "#1640D61F",
    },
  ];

  return (
    <div className="w-[95%] mx-auto flex flex-col gap-4">
      <h1 className="text-2xl font-semibold">
        Welcome {`${user.first_name} ${user.last_name}`} you have{" "}
        {agents?.data?.length === 0
          ? "no tickets"
          : `${
              agents?.data?.length === 1
                ? `${agents?.data?.length} ticket`
                : `${agents?.data?.length} tickets`
            }`}
      </h1>
      <div className="flex items-center gap-4">
        {cards.map((card) => (
          <StatusCard card={card} key={card.title} />
        ))}
      </div>
      <Agents agents={agents?.data} isPending={isPending} />
    </div>
  );
};

export default AdminAgentsPage;

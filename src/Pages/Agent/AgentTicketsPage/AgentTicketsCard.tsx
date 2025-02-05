import { useNavigate } from "react-router-dom";
import { TabType } from ".";
import { ticketSchematype } from "../../../types/Tickets/schema";

type TicketCardProps = {
  ticket: ticketSchematype;
};

const AgentTicketsCard = ({ ticket }: TicketCardProps) => {
  const getStatusColor = (status: TabType) => {
    switch (status?.toLowerCase()) {
      case "open":
        return "bg-[#15822C]";
      case "closed":
        return "bg-[#002379]";
      case "inprogress":
        return "bg-[#7F5E0C]";
      default:
        return "bg-gray-500";
    }
  };

  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(`/agent/tickets/${ticket?.ticket_id}`)}
      key={ticket?.ticket_id}
      // onClick={() => ticket?.id && navigate(`${ticket.id}`)}
      className="p-3 border-b-2 min-h-[140px] hover:shadow-md duration-300 ease-in cursor-pointer"
    >
      <div className="flex items-center justify-between mb-3 ">
        <div className="flex items-center gap-3">
          <span
            className={`min-w-[50px] text-center px-4 capitalize text-lg font-medium text-white rounded-full ${getStatusColor(
              ticket?.status
            )}`}
          >
            {ticket?.status || "Unknown"}
          </span>
        </div>
        <div className="text-sm text-gray-500">
          Created at:{" "}
          {ticket?.created_at
            ? new Date(ticket.created_at).toLocaleDateString()
            : "No date"}
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <h2 className="text-2xl font-bold capitalize">
          #ticket n{ticket.ticket_id}
        </h2>
        <div className="flex items-center gap-2">
          <span className="text-lg capitalize text-gray-500">
            category:{" "}
            <span className="text-xl font-medium text-black">
              {ticket.category}
            </span>
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500">Last update:</span>
          <span className="text-sm text-gray-900">
            {ticket?.updated_at || "No reply yet"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default AgentTicketsCard;

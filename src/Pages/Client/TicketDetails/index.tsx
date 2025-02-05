import { useParams } from "react-router-dom";
import TicketDetailFiles from "../../../Components/Client/TicketDetails/TicketDetailFiles";
import TicketResponseCard from "../../../Components/Client/TicketDetails/TicketResponseCard";
import useTicket from "../../../hooks/Tickets/View/useTicket";

const TicketDetails = () => {
  const { ticketId } = useParams();
  const { data: ticket } = useTicket(parseInt(ticketId || "0", 10));

  return (
    <div className="w-full flex items-center gap-10">
      <TicketResponseCard ticket={ticket} />
      <TicketDetailFiles ticket={ticket} />
    </div>
  );
};

export default TicketDetails;

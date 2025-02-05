import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import { Button } from "../../../Components/UI";
import useEditTicket from "../../../hooks/Tickets/Edit/useEditTicket";
import useTicket from "../../../hooks/Tickets/View/useTicket";

const AgentTicketPage = () => {
  const { ticketId } = useParams();
  const links = [
    {
      name: "home",
      link: "/agent",
    },
    {
      name: "tickets",
      link: "/agent/tickets",
    },
    {
      name: "ticket details",
      link: `/agent/tickets/${ticketId}`,
    },
  ];
  const Ticketlinks = [
    {
      name: "details",
      link: `/agent/tickets/${ticketId}`,
    },
    {
      name: "Conversation",
      link: `/agent/tickets/${ticketId}/comments`,
    },
  ];

  const location = useLocation();
  const { data: ticket } = useTicket(parseInt(ticketId || ""));
  const editTicketMutation = useEditTicket(ticket?.ticket_id || "");

  const resolveTicket = () => {
    // Toggle between "Open", "In Progress", and "Closed"
    let newStatus = "Open"; // Default to "Open"
    if (ticket?.status === "Open" || ticket?.status === "In Progress") {
      newStatus = "Closed"; // If it's open or in progress, mark as "Closed"
    } else if (ticket?.status === "Closed") {
      newStatus = "Open"; // If it's closed, mark as "Open"
    }

    // Mutate with the new status
    editTicketMutation.mutate({ status: newStatus });
  };

  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex w-screen gap-10 p-10">
      <div className="flex flex-col min-w-[75%] mx-auto gap-4">
        <div className="flex items-center w-[33%] bg-white p-2 rounded-md justify-between">
          {links.map((link) => (
            <button
              key={link.link}
              className={`${
                link.link === location.pathname
                  ? "text-black font-medium"
                  : "text-gray-300 hover:text-black hover:font-medium"
              } duration-300 ease-linear capitalize text-lg`}
              onClick={() => navigate(link.link)}
            >
              {link.name}
            </button>
          ))}
        </div>
        <div className="flex flex-col gap-10 px-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-10">
              {Ticketlinks.map((link) => (
                <button
                  key={link.link}
                  className={`${
                    link.link === location.pathname
                      ? "text-[#1640D6] border-b-2 border-[#1640D6] "
                      : "text-gray-300 hover:border-[#1640D6]  hover:text-[#1640D6]"
                  } duration-300 ease-linear capitalize text-lg pb-2 border-b-2`}
                  onClick={() => navigate(link.link)}
                >
                  {link.name}
                </button>
              ))}
            </div>
            <Button
              onClick={resolveTicket}
              isLoading={editTicketMutation.isPending}
              disabled={editTicketMutation.isPending}
              variant={"outline"}
            >
              {ticket?.status === "Open" || ticket?.status === "In Progress" ? (
                <span>Mark as resolved</span>
              ) : (
                <span>the ticket is closed (reopen)</span>
              )}
            </Button>
          </div>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AgentTicketPage;

import { useState } from "react";
import { useParams } from "react-router-dom";
import { assets } from "../../../assets";
import useCreateComment from "../../../hooks/Commnets/Create/useCreateComment";
import useComments from "../../../hooks/Commnets/View/useComments";
import useTicket from "../../../hooks/Tickets/View/useTicket";

const Tabs = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: "details", label: "Details" },
    { id: "conversation", label: "Conversation" },
  ];

  return (
    <div className="border-b mb-6">
      <div className="flex gap-8">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`pb-2 px-2 ${
              activeTab === tab.id
                ? "border-b-2 border-blue-500 text-blue-500"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab(tab.id)}
            aria-current={activeTab === tab.id}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
};

const TicketDetails = ({ ticket }) => (
  <div>
    <h1 className="text-2xl font-semibold mb-6">{ticket.subject}</h1>
    <div className="space-y-4">
      <div>
        <h2 className="text-gray-500 mb-1">Category</h2>
        <p>{ticket.category || "N/A"}</p>
      </div>
      <div>
        <h2 className="text-gray-500 mb-1">Description</h2>
        <p>{ticket.description || "No description provided."}</p>
      </div>
    </div>
  </div>
);

const Conversation = ({
  commentsData,
  commentsLoading,
  commentsError,
  newMessage,
  setNewMessage,
  handleSendMessage,
}) => (
  <div className="space-y-6">
    {commentsLoading ? (
      <p>Loading comments...</p>
    ) : commentsError ? (
      <p className="text-red-500">Error loading comments.</p>
    ) : commentsData?.length > 0 ? (
      commentsData.map((comment) => (
        <div
          key={comment.id}
          className="border-b py-2 flex justify-between items-center"
        >
          <p>{comment.comment}</p>
          <span className="text-gray-400 text-sm">
            Ticket ID: {comment.ticketId}
          </span>
        </div>
      ))
    ) : (
      <p>No comments available.</p>
    )}

    {/* Message Input */}
    <form onSubmit={handleSendMessage} className="mt-6">
      <div className="border rounded-lg p-2 flex gap-2">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Tell us more about your ticket"
          className="flex-1 px-2 outline-none"
        />
        <button
          type="button"
          className="p-2 text-gray-400 hover:text-gray-600"
          onClick={() => setNewMessage("")}
        >
          <assets.closeeyeIcon />
        </button>
        <button
          type="submit"
          className="px-4 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Send
        </button>
      </div>
    </form>
  </div>
);

const ClientTicketPage = () => {
  const { ticketId } = useParams();
  const {
    data: ticket,
    isLoading,
    isError,
  } = useTicket(parseInt(ticketId || ""));
  const {
    data: commentsData,
    isLoading: commentsLoading,
    isError: commentsError,
  } = useComments(ticket?.id); // Fetch comments
  const [activeTab, setActiveTab] = useState("details");
  const [newMessage, setNewMessage] = useState("");

  const createComment = useCreateComment(parseInt(ticketId || "")); // Initialize the mutation

  if (isLoading) {
    return <div className="text-center">Loading...</div>;
  }

  if (isError || !ticket) {
    return (
      <div className="text-center text-red-500">
        Error loading ticket details.
      </div>
    );
  }

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    // Call the mutation
    createComment.mutate(
      {
        ticketId, // Add the ticket ID to associate the comment
        comment: newMessage,
      },
      {
        onSuccess: () => {
          setNewMessage(""); // Clear the input field after success
        },
        onError: (error) => {
          console.error("Error adding comment:", error);
        },
      }
    );
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Tabs */}
      <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />

      <div className="flex gap-6">
        {/* Main Content */}
        <div className="flex-1">
          {activeTab === "details" ? (
            <TicketDetails ticket={ticket} />
          ) : (
            <Conversation
              commentsData={commentsData}
              commentsLoading={commentsLoading}
              commentsError={commentsError}
              newMessage={newMessage}
              setNewMessage={setNewMessage}
              handleSendMessage={handleSendMessage}
            />
          )}
        </div>

        {/* Sidebar */}
        <div className="w-80">
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Ticket Details</h2>
              <span className="px-3 py-1 bg-green-600 text-white rounded-full text-sm">
                {ticket.status}
              </span>
            </div>
            <div className="space-y-4">
              <div>
                <h3 className="text-gray-500 text-sm">Ticket Number</h3>
                <p>#{ticket.id}</p>
              </div>
              <div>
                <h3 className="text-gray-500 text-sm">Category</h3>
                <p>{ticket.category}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientTicketPage;

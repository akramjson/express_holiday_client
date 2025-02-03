import { useNavigate } from "react-router-dom";
import { assets } from "../../../../assets";
import { Button } from "../../../UI";

const ClientHomeHeader = () => {
  const navigate = useNavigate();
  return (
    <div className="w-[85%] mx-auto h-[150px] py-2 px-2 bg-white shadow-md rounded-3xl flex gap-3">
      <div className="h-full w-[170px] rounded-md">
        <img
          src={assets.manageTicket}
          alt="tickets"
          className="max-w-full max-h-full"
        />
      </div>
      <div className="w-full h-full flex flex-col justify-between">
        <h1 className="text-2xl font-semibold">Manage Your Support Tickets</h1>
        <p className="text-sm text-gray-500 w-[50%]">
          View all your support requests in one place. Stay updated on progress
          and easily navigate to the tickets page for detailed insights.
        </p>
        <Button
          onClick={() => navigate("tickets")}
          variant={"solid"}
          className="h-[40px]"
        >
          Go to Tickets
        </Button>
      </div>
    </div>
  );
};

export default ClientHomeHeader;

import {
  ClientHomeHeader,
  CreateTicket,
} from "../../../Components/Client/Home";

const ClientHomePage = () => {
  return (
    <div className="flex flex-col gap-5">
      <ClientHomeHeader />
      <CreateTicket />
    </div>
  );
};

export default ClientHomePage;

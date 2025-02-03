import { BrowserRouter, Route, Routes } from "react-router-dom";
import AdminSharedLayout from "./Components/Admin/Shared/AdminSharedLayout";
import AgentSharedLayout from "./Components/Agent/Shared/AgentSharedLayout";
import SharedLayout from "./Components/Auth/Shared";
import ClientSharedLayout from "./Components/Client/Shared/ClientSharedLayout";
import { AdminAgentsPage } from "./Pages/Admin";
import AdminTicketsPage from "./Pages/Admin/AdminTickets";
import AdminHome from "./Pages/Admin/Home";
import { AgentHomePage, AgentTicketsPage } from "./Pages/Agent";
import {
  ForgetPasswordPage,
  LoginPage,
  RegisterPage,
  ResetPasswordPage,
  SetupPage,
} from "./Pages/Auth";
import {
  ClientHomePage,
  ClientTicketPage,
  ClientTicketsPage,
  ConfirmEmailPage,
} from "./Pages/Client";
import { NotFoundPage } from "./Pages/Others";
import ProtectedRoute from "./utils/ProtectedRoute";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SharedLayout />}>
          <Route index element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="confirm-email" element={<ConfirmEmailPage />} />
          <Route path="forget_password" element={<ForgetPasswordPage />} />
          <Route path="reset-password" element={<ResetPasswordPage />} />
        </Route>
        <Route element={<ProtectedRoute allowedRoles={["", ""]} />}>
          <Route path="setup" element={<SetupPage />} />
        </Route>
        <Route element={<ProtectedRoute allowedRoles={["client"]} />}>
          <Route path="/client" element={<ClientSharedLayout />}>
            <Route index element={<ClientHomePage />} />
            <Route path="tickets" element={<ClientTicketsPage />} />
            <Route path="tickets/:ticketId" element={<ClientTicketPage />} />
          </Route>
        </Route>

        <Route element={<ProtectedRoute allowedRoles={["Admin"]} />}>
          <Route path="/dashboard" element={<AdminSharedLayout />}>
            <Route index element={<AdminHome />} />
            <Route path="tickets" element={<AdminTicketsPage />} />
            <Route path="agents" element={<AdminAgentsPage />} />
          </Route>
        </Route>

        <Route element={<ProtectedRoute allowedRoles={["agent"]} />}>
          <Route path="/agent" element={<AgentSharedLayout />}>
            <Route index element={<AgentHomePage />} />
            <Route path="tickets" element={<AgentTicketsPage />} />
          </Route>
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;

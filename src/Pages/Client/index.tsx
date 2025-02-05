import { lazy } from "react";

export const ClientTicketsPage = lazy(() => import("./ClientTickets"));
export const ClientHomePage = lazy(() => import("./Home"));
export const ConfirmEmailPage = lazy(() => import("./ConfirmEmailPage"));
export const ClientTicketPage = lazy(() => import("./ClientTicketPage"));
export const TicketDetails = lazy(() => import("./TicketDetails"));
export const TicketComments = lazy(() => import("./TicketComments"));

type ClientEndpointsTypes = {
  CATEGORIES_PATH: string;
  SUB_CATEGORIES_PATH: string;
  INPUTS_PATH: string;
  CREATE_TICKET_PATH: string;
  GET_TICKETS_PATH: string;
  GET_USER_DETAILS_PATH: string;
  GET_USERS_PATH: string;
  REMOVE_USER_PATH: string;
  EDIT_USER_PATH: string;
  CONFIRM_EMAIL_PATH: string;
  GET_TICKET_PATH: string;
  GET_TICKET_COMMENTS: string;
};

export const clientEndpoints: ClientEndpointsTypes = {
  // Register end points
  CATEGORIES_PATH: "categories/",
  SUB_CATEGORIES_PATH: "categories/",
  INPUTS_PATH: "inputs?sub_category=",
  CREATE_TICKET_PATH: "ticket/create",
  GET_TICKETS_PATH: "/tickets/",
  GET_USER_DETAILS_PATH: "users",
  GET_USERS_PATH: "users",
  REMOVE_USER_PATH: "users/",
  EDIT_USER_PATH: "users/",
  CONFIRM_EMAIL_PATH: "/users/confirm-email/",
  GET_TICKET_PATH: "/tickets/",
  GET_TICKET_COMMENTS: "/tickets/",
};

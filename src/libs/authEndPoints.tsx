type AuthEndpointsTypes = {
  CREATE_ACCOUNT_PATH: string;
  LOGIN_PATH: string;
  REFRESH_TOKEN_PATH: string;
  CREATE_TICKET_PATH: string;
  CREATE_COMMENT_PATH: string;
  CREATE_FILE_TICKET_PATH: string;
  RESET_PWD_PATH: string;
  FORGET_PWD_PATH: string;
};

export const authEndpoints: AuthEndpointsTypes = {
  // Register end points
  CREATE_ACCOUNT_PATH: "users",
  LOGIN_PATH: "token/",
  REFRESH_TOKEN_PATH: "user/verify",
  CREATE_TICKET_PATH: "tickets/",
  CREATE_COMMENT_PATH: "tickets",
  CREATE_FILE_TICKET_PATH: "tickets/",
  RESET_PWD_PATH: "users/reset-password/",
  FORGET_PWD_PATH: "users/request-password-reset/",
};

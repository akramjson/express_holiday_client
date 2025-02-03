import { jwtDecode } from "jwt-decode";
import { decodedTokenSchemaType } from "../../types/Decoded";

export const decodedToken = (token: string): decodedTokenSchemaType => {
  return jwtDecode<decodedTokenSchemaType>(token);
};

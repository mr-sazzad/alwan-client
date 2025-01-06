import { JwtPayload, jwtDecode } from "jwt-decode";
import { KEY } from "../types";
import { getFromLocalStorage } from "./local-storage";

export const getUserFromLocalStorage = (): JwtPayload | undefined => {
  const token = getFromLocalStorage(KEY) as string;

  if (!token) {
    return undefined;
  }

  try {
    const decodedUser = jwtDecode(token);
    return decodedUser;
  } catch (error) {
    console.error("Error decoding token:", error);
    return undefined;
  }
};

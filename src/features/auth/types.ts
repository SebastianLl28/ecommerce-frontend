import type { Response } from "@/types/apiTypes";
import type { FormSchemaType } from "./schema";

interface UserResponse {
  id: number;
  email: string;
  fullName: string;
  role: string;
}

type LoginResponse = Response<UserResponse>;

type LoginRequest = FormSchemaType;

export type { LoginResponse, UserResponse, LoginRequest };

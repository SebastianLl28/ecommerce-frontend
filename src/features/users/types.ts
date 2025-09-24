export type UserRole = "ADMIN" | "CUSTOMER";

export interface UserDTO {
  id: number;
  firstName: string;
  lastName: string;
  fullName?: string;
  email: string;
  phone?: string | null;
  address?: string | null;
  role: UserRole;
  active: boolean;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export type CreateUserPayload = Omit<UserDTO, "id" | "fullName"> & {
  password: string;
};

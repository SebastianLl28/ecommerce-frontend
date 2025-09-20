interface TestUser {
  id: number;
  role: "Admin" | "Cliente";
  email: string;
  password: string;
}

export const testUsers: TestUser[] = [
  { id: 1, role: "Admin", email: "admin@ecommerce.com", password: "password123" },
  { id: 2, role: "Cliente", email: "juan@email.com", password: "password123" },
  { id: 3, role: "Cliente", email: "maria@email.com", password: "password123" },
];


export const categories = [
  { id:1, name:"Computadoras" }, { id:2, name:"Periféricos" },
  { id:3, name:"Audio" }, { id:4, name:"Video" },
];
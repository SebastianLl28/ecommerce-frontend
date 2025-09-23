interface TestUser {
  id: number;
  role: "Admin" | "Cliente";
  email: string;
  password: string;
}

export const testUsers: TestUser[] = [
  {
    id: 1,
    role: "Admin",
    email: "admin@ecommerce.com",
    password: "password123",
  },
  { id: 2, role: "Cliente", email: "juan@email.com", password: "password123" },
  { id: 3, role: "Cliente", email: "maria@email.com", password: "password123" },
];

export const categories = [
  { id: 1, name: "Computadoras" },
  { id: 2, name: "Periféricos" },
  { id: 3, name: "Audio" },
  { id: 4, name: "Video" },
];

// Mocks para que todo se vea sin props/lógica
export const mockItems = [
  { id: 1, name: "Trek Marlin 7", qty: 2, unitPrice: 2800 },
  { id: 2, name: "Scott Aspect 950", qty: 1, unitPrice: 3500 },
];

export const mockAddress = {
  fullName: "Sebastián Alvarez",
  phone: "+51 987 654 321",
  street: "Av. Javier Prado 1234",
  district: "San Isidro",
  city: "Lima",
  reference: "Edificio gris, dpto 801",
};

export const mockContact = {
  email: "sebastian@example.com",
  phone: "+51 987 654 321",
};

export const mockTotals = {
  items: 3,
  subTotal: 2800 * 2 + 3500,
  shipping: 25,
  discount: 0,
  taxes: 0, // si no manejas IGV en esta vista, mantenlo 0
};

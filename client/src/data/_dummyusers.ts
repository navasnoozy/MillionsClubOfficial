export type Role = "customer" | "admin" | "moderator";
export type Status = "active" | "inactive" | "blocked";

export interface User {
  _id: string;
  name: string;
  email: string;
  role: Role;
  image: string;
  status: Status;
  emailVerified: boolean;

  orders: number;
  totalSpend: number;

  createdAt: Date;
  updatedAt: Date;
  lastLogin?: Date;
}

// Helper function to generate random dates
const randomDate = (start: Date, end: Date): Date => {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
};

// Helper to generate dates ensuring lastLogin <= updatedAt <= createdAt
const generateRelatedDates = () => {
  const now = new Date();
  const twoYearsAgo = new Date(now.getFullYear() - 2, now.getMonth(), now.getDate());

  const createdAt = randomDate(twoYearsAgo, now);
  const updatedAt = randomDate(createdAt, now);
  const lastLogin = Math.random() > 0.2 ? randomDate(createdAt, updatedAt) : undefined;

  return { createdAt, updatedAt, lastLogin };
};

// Helper to generate random orders and spending
const generateOrderData = () => {
  const orders = Math.floor(Math.random() * 50); // 0-49 orders
  const totalSpend = orders > 0 ? parseFloat((Math.random() * 5000 + 50).toFixed(2)) : 0;
  return { orders, totalSpend };
};

// Helper to generate Mongo-like ObjectId
const objectId = () =>
  Math.random().toString(16).substring(2, 10) +
  Math.random().toString(16).substring(2, 10);

export const dummyUsers: User[] = [
  {
    _id: objectId(),
    name: "John Anderson",
    email: "john.anderson@example.com",
    role: "admin",
    image: "https://img.icons8.com/color/48/user-male-circle--v1.png",
    status: "active",
    emailVerified: true,
    ...generateOrderData(),
    ...generateRelatedDates(),
  },
  {
    _id: objectId(),
    name: "Sarah Mitchell",
    email: "sarah.mitchell@gmail.com",
    role: "customer",
    image: "https://img.icons8.com/color/48/user-male-circle--v1.png",
    status: "active",
    emailVerified: true,
    ...generateOrderData(),
    ...generateRelatedDates(),
  },
  {
    _id: objectId(),
    name: "Michael Chen",
    email: "michael.chen@outlook.com",
    role: "moderator",
    image: "https://img.icons8.com/color/48/user-male-circle--v1.png",
    status: "active",
    emailVerified: true,
    ...generateOrderData(),
    ...generateRelatedDates(),
  },
  {
    _id: objectId(),
    name: "Emily Rodriguez",
    email: "emily.rodriguez@example.com",
    role: "customer",
    image: "https://img.icons8.com/color/48/user-male-circle--v1.png",
    status: "active",
    emailVerified: true,
    ...generateOrderData(),
    ...generateRelatedDates(),
  },
  {
    _id: objectId(),
    name: "David Thompson",
    email: "david.thompson@yahoo.com",
    role: "customer",
    image: "https://img.icons8.com/color/48/user-male-circle--v1.png",
    status: "active",
    emailVerified: true,
    ...generateOrderData(),
    ...generateRelatedDates(),
  },
  {
    _id: objectId(),
    name: "Lisa Wang",
    email: "lisa.wang@example.com",
    role: "customer",
    image: "https://img.icons8.com/color/48/user-male-circle--v1.png",
    status: "inactive",
    emailVerified: true,
    ...generateOrderData(),
    ...generateRelatedDates(),
  },
  {
    _id: objectId(),
    name: "James Wilson",
    email: "james.wilson@gmail.com",
    role: "customer",
    image: "https://img.icons8.com/color/48/user-male-circle--v1.png",
    status: "active",
    emailVerified: false,
    ...generateOrderData(),
    ...generateRelatedDates(),
  },
  {
    _id: objectId(),
    name: "Maria Garcia",
    email: "maria.garcia@example.com",
    role: "moderator",
    image: "https://img.icons8.com/color/48/user-male-circle--v1.png",
    status: "blocked",
    emailVerified: true,
    ...generateOrderData(),
    ...generateRelatedDates(),
  },
  {
    _id: objectId(),
    name: "Robert Brown",
    email: "robert.brown@hotmail.com",
    role: "customer",
    image: "https://img.icons8.com/color/48/user-male-circle--v1.png",
    status: "active",
    emailVerified: true,
    ...generateOrderData(),
    ...generateRelatedDates(),
  },
  {
    _id: objectId(),
    name: "Jennifer Lee",
    email: "jennifer.lee@example.com",
    role: "customer",
    image: "https://img.icons8.com/color/48/user-male-circle--v1.png",
    status: "inactive",
    emailVerified: true,
    ...generateOrderData(),
    ...generateRelatedDates(),
  },
  // Continue adding remaining users in same pattern...
];
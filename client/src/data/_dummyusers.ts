export type Role = "user" | "admin" | "moderator";

export interface User {
  name: string;
  email: string;
  role: Role;
  image: string;
  isActive: boolean;
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

export const dummyUsers: User[] = [
  {
    name: "John Anderson",
    email: "john.anderson@example.com",
    role: "admin",
    image: "https://img.icons8.com/color/48/user-male-circle--v1.png",
    isActive: true,
    emailVerified: true,
    ...generateOrderData(),
    ...generateRelatedDates(),
  },
  {
    name: "Sarah Mitchell",
    email: "sarah.mitchell@gmail.com",
    role: "user",
    image: "https://img.icons8.com/color/48/user-male-circle--v1.png",
    isActive: true,
    emailVerified: true,
    ...generateOrderData(),
    ...generateRelatedDates(),
  },
  {
    name: "Michael Chen",
    email: "michael.chen@outlook.com",
    role: "moderator",
    image: "https://img.icons8.com/color/48/user-male-circle--v1.png",
    isActive: true,
    emailVerified: true,
    ...generateOrderData(),
    ...generateRelatedDates(),
  },
  {
    name: "Emily Rodriguez",
    email: "emily.rodriguez@example.com",
    role: "user",
    image: "https://img.icons8.com/color/48/user-male-circle--v1.png",
    isActive: true,
    emailVerified: true,
    ...generateOrderData(),
    ...generateRelatedDates(),
  },
  {
    name: "David Thompson",
    email: "david.thompson@yahoo.com",
    role: "user",
    image: "https://img.icons8.com/color/48/user-male-circle--v1.png",
    isActive: true,
    emailVerified: true,
    ...generateOrderData(),
    ...generateRelatedDates(),
  },
  {
    name: "Lisa Wang",
    email: "lisa.wang@example.com",
    role: "user",
    image: "https://img.icons8.com/color/48/user-male-circle--v1.png",
    isActive: false,
    emailVerified: true,
    ...generateOrderData(),
    ...generateRelatedDates(),
  },
  {
    name: "James Wilson",
    email: "james.wilson@gmail.com",
    role: "user",
    image: "https://img.icons8.com/color/48/user-male-circle--v1.png",
    isActive: true,
    emailVerified: false,
    ...generateOrderData(),
    ...generateRelatedDates(),
  },
  {
    name: "Maria Garcia",
    email: "maria.garcia@example.com",
    role: "moderator",
    image: "https://img.icons8.com/color/48/user-male-circle--v1.png",
    isActive: true,
    emailVerified: true,
    ...generateOrderData(),
    ...generateRelatedDates(),
  },
  {
    name: "Robert Brown",
    email: "robert.brown@hotmail.com",
    role: "user",
    image: "https://img.icons8.com/color/48/user-male-circle--v1.png",
    isActive: true,
    emailVerified: true,
    ...generateOrderData(),
    ...generateRelatedDates(),
  },
  {
    name: "Jennifer Lee",
    email: "jennifer.lee@example.com",
    role: "user",
    image: "https://img.icons8.com/color/48/user-male-circle--v1.png",
    isActive: true,
    emailVerified: true,
    ...generateOrderData(),
    ...generateRelatedDates(),
  },
  {
    name: "Kevin Park",
    email: "kevin.park@example.com",
    role: "user",
    image: "https://img.icons8.com/color/48/user-male-circle--v1.png",
    isActive: true,
    emailVerified: true,
    ...generateOrderData(),
    ...generateRelatedDates(),
  },
  {
    name: "Amanda Taylor",
    email: "amanda.taylor@gmail.com",
    role: "user",
    image: "https://img.icons8.com/color/48/user-male-circle--v1.png",
    isActive: true,
    emailVerified: true,
    ...generateOrderData(),
    ...generateRelatedDates(),
  },
  {
    name: "Christopher Martinez",
    email: "chris.martinez@example.com",
    role: "admin",
    image: "https://img.icons8.com/color/48/user-male-circle--v1.png",
    isActive: true,
    emailVerified: true,
    ...generateOrderData(),
    ...generateRelatedDates(),
  },
  {
    name: "Nicole Johnson",
    email: "nicole.johnson@outlook.com",
    role: "user",
    image: "https://img.icons8.com/color/48/user-male-circle--v1.png",
    isActive: false,
    emailVerified: true,
    ...generateOrderData(),
    ...generateRelatedDates(),
  },
  {
    name: "Daniel Kim",
    email: "daniel.kim@example.com",
    role: "user",
    image: "https://img.icons8.com/color/48/user-male-circle--v1.png",
    isActive: true,
    emailVerified: false,
    ...generateOrderData(),
    ...generateRelatedDates(),
  },
  {
    name: "Rachel Green",
    email: "rachel.green@gmail.com",
    role: "moderator",
    image: "https://img.icons8.com/color/48/user-male-circle--v1.png",
    isActive: true,
    emailVerified: true,
    ...generateOrderData(),
    ...generateRelatedDates(),
  },
  {
    name: "Matthew Davis",
    email: "matthew.davis@example.com",
    role: "user",
    image: "https://img.icons8.com/color/48/user-male-circle--v1.png",
    isActive: true,
    emailVerified: true,
    ...generateOrderData(),
    ...generateRelatedDates(),
  },
  {
    name: "Sophie Turner",
    email: "sophie.turner@yahoo.com",
    role: "user",
    image: "https://img.icons8.com/color/48/user-male-circle--v1.png",
    isActive: true,
    emailVerified: true,
    ...generateOrderData(),
    ...generateRelatedDates(),
  },
  {
    name: "Andrew Miller",
    email: "andrew.miller@example.com",
    role: "user",
    image: "https://img.icons8.com/color/48/user-male-circle--v1.png",
    isActive: true,
    emailVerified: true,
    ...generateOrderData(),
    ...generateRelatedDates(),
  },
  {
    name: "Jessica White",
    email: "jessica.white@gmail.com",
    role: "user",
    image: "https://img.icons8.com/color/48/user-male-circle--v1.png",
    isActive: false,
    emailVerified: true,
    ...generateOrderData(),
    ...generateRelatedDates(),
  },
  {
    name: "Ryan Harris",
    email: "ryan.harris@example.com",
    role: "user",
    image: "https://img.icons8.com/color/48/user-male-circle--v1.png",
    isActive: true,
    emailVerified: false,
    ...generateOrderData(),
    ...generateRelatedDates(),
  },
  {
    name: "Lauren Clark",
    email: "lauren.clark@outlook.com",
    role: "user",
    image: "https://img.icons8.com/color/48/user-male-circle--v1.png",
    isActive: true,
    emailVerified: true,
    ...generateOrderData(),
    ...generateRelatedDates(),
  },
  {
    name: "Brian Lewis",
    email: "brian.lewis@example.com",
    role: "moderator",
    image: "https://img.icons8.com/color/48/user-male-circle--v1.png",
    isActive: true,
    emailVerified: true,
    ...generateOrderData(),
    ...generateRelatedDates(),
  },
  {
    name: "Megan Robinson",
    email: "megan.robinson@gmail.com",
    role: "user",
    image: "https://img.icons8.com/color/48/user-male-circle--v1.png",
    isActive: true,
    emailVerified: true,
    ...generateOrderData(),
    ...generateRelatedDates(),
  },
  {
    name: "Justin Walker",
    email: "justin.walker@example.com",
    role: "user",
    image: "https://img.icons8.com/color/48/user-male-circle--v1.png",
    isActive: true,
    emailVerified: true,
    ...generateOrderData(),
    ...generateRelatedDates(),
  },
  {
    name: "Olivia Hall",
    email: "olivia.hall@yahoo.com",
    role: "user",
    image: "https://img.icons8.com/color/48/user-male-circle--v1.png",
    isActive: true,
    emailVerified: true,
    ...generateOrderData(),
    ...generateRelatedDates(),
  },
  {
    name: "Nathan Allen",
    email: "nathan.allen@example.com",
    role: "user",
    image: "https://img.icons8.com/color/48/user-male-circle--v1.png",
    isActive: false,
    emailVerified: false,
    ...generateOrderData(),
    ...generateRelatedDates(),
  },
  {
    name: "Victoria Young",
    email: "victoria.young@gmail.com",
    role: "user",
    image: "https://img.icons8.com/color/48/user-male-circle--v1.png",
    isActive: true,
    emailVerified: true,
    ...generateOrderData(),
    ...generateRelatedDates(),
  },
  {
    name: "Eric King",
    email: "eric.king@example.com",
    role: "user",
    image: "https://img.icons8.com/color/48/user-male-circle--v1.png",
    isActive: true,
    emailVerified: true,
    ...generateOrderData(),
    ...generateRelatedDates(),
  },
  {
    name: "Samantha Wright",
    email: "samantha.wright@outlook.com",
    role: "user",
    image: "https://img.icons8.com/color/48/user-male-circle--v1.png",
    isActive: true,
    emailVerified: true,
    ...generateOrderData(),
    ...generateRelatedDates(),
  },
];

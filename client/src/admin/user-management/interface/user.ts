//src/interface/user.ts
export interface User {
  name: string;
  email: string;
  providers: string[];
  role: "customer" | 'admin' | 'moderator'
  status: 'active'| 'inactive' | 'blocked' 
  emailVerified: boolean;
  isDeleted: boolean
  lastLogin: string; // or Date if you convert it
  createdAt: string; // same note
  updatedAt: string;
  id: string;
}


export interface User {
  name: string;
  email: string;
  providers: string[];
  role: "customer" | 'admin' | 'moderator'
  isActive: boolean 
  emailVerified: boolean;
  lastLogin: string; // or Date if you convert it
  createdAt: string; // same note
  updatedAt: string;
  id: string;
}

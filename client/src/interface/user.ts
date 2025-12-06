
export interface User {
  name: string;
  email: string;
  providers: string[];
  role: "user" | 'admin' | 'moderator'
  isActive: boolean | 'true' | 'false'
  emailVerified: boolean;
  lastLogin: string; // or Date if you convert it
  createdAt: string; // same note
  updatedAt: string;
  id: string;
}

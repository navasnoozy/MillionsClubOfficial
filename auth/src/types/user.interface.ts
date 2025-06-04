export interface UserType extends Document {
  name: string;
  email: string;
  password: string;
  role: "user" | "admin" | "moderator";
  isActive: boolean;
  isEmailVerified: boolean;
  lastLogin?: Date;
}

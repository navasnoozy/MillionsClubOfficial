import { Schema, model, Document, Types } from "mongoose";
import { Role } from "../models/userModel";

export interface jwt_payload {
  id: string;
  email?: string;
  role?: Role;
}

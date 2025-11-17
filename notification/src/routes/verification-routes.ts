import { Router } from "express";
import { emailVerification } from "../controllers/verify-email";


const verificationRouter = Router ();

verificationRouter.post('/api/notification/verify-email', emailVerification)


export default verificationRouter
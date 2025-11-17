import { Router } from "express";
import { emailVerification } from "../controllers/verify-email";


const verificationRouter = Router ();

verificationRouter.post ('/verifyemail', emailVerification)


export default verificationRouter
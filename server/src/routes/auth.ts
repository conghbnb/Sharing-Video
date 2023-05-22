import { Router } from 'express';
import { signinOrSignup } from '../controllers/auth';

const authRouter = Router();

authRouter.post('/signinOrSignup', signinOrSignup);

export default authRouter;

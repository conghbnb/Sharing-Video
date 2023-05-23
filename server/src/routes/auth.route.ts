import { Router } from 'express';
import { signinOrSignup } from '../controllers/auth.controller';

const authRouter = Router();

authRouter.post('/signinOrSignup', signinOrSignup);

export default authRouter;

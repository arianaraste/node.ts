import { Router } from "express";
import Decorator_Router from "../decorators/router.decorators";
const router : Router = Router();
router.use(Decorator_Router)
export default router;


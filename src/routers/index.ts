import { Router } from 'express';

import { UserController } from '../database/controllers/UserController';
import { SurveyController } from '../database/controllers/SurveyController';
import { SendMailController } from '../database/controllers/SendMailController';
const router = Router();

const userController = new UserController();
const surveyController = new SurveyController();
const sendMailController = new SendMailController();

router.post('/users', userController.create);
router.post('/surveys', surveyController.create);
router.get('/surveys', surveyController.show);

router.post('/sendMail', sendMailController.execute);

export default router;
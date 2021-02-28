import { Router } from 'express';

import { UserController } from '../database/controllers/UserController';
import { SurveyController } from '../database/controllers/SurveyController';
import { SendMailController } from '../database/controllers/SendMailController';
import { AnswerController } from '../database/controllers/AnswerController';

const router = Router();

const userController = new UserController();
const surveyController = new SurveyController();
const sendMailController = new SendMailController();
const answersController = new AnswerController();

router.post('/users', userController.create);
router.post('/surveys', surveyController.create);
router.get('/surveys/show', surveyController.show);

router.post('/sendMail', sendMailController.execute);
router.get('/answers', answersController.execute);

export default router;
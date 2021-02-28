import { Router } from 'express';

import { UserController } from '../database/controllers/UserController';
import { SurveyController } from '../database/controllers/SurveyController';
import { SendMailController } from '../database/controllers/SendMailController';
import { AnswerController } from '../database/controllers/AnswerController';
import { NpsController } from '../database/controllers/NpsController';

const router = Router();

const userController = new UserController();
const surveyController = new SurveyController();
const sendMailController = new SendMailController();
const answersController = new AnswerController();
const npsController = new NpsController();

router.post('/users', userController.create);
router.post('/surveys', surveyController.create);
router.get('/surveys/show', surveyController.show);

router.post('/sendMail', sendMailController.execute);
router.get('/answers/:value', answersController.execute);

router.get('/nps/:survey_id', npsController.execute)

export default router;
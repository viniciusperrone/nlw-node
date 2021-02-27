import { Request, Response } from 'express'; 
import { getCustomRepository } from 'typeorm';
import { SurveyRepository } from '../repositories/SurveyRepository';
import { SurveysUsersRepository } from '../repositories/SurveysUsersRepository';
import { UsersRepository } from '../repositories/UsersRepository';

class SendMailController {
  async execute(request: Request, response: Response ){
    const { 
      email, 
      survey_id
    } = request.body;

    const userRepository = getCustomRepository(UsersRepository);
    const surveyRepository = getCustomRepository(SurveyRepository);
    const surveyUserRepository = getCustomRepository(SurveysUsersRepository);

    const userAlreadyExist = await userRepository.findOne({ email });

    if (!userAlreadyExist){
      return response.status(400).json({
        error: "User does not exist"
      });
    }

    const surveyAlreadyExist = await surveyRepository.findOne({ id: survey_id })

    if (!surveyAlreadyExist) {
      return response.status(400).json({
        error: "Survey does not exists!"
      });
    }

    const surveyUser = surveyUserRepository.create({
      user_id: userAlreadyExist.id,
      survey_id
    });

    await surveyUserRepository.save(surveyUser)

    return response.json(surveyUser);
  }


}

export { SendMailController }
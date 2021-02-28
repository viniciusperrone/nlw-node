import { Request, Response } from 'express'; 
import { getCustomRepository } from 'typeorm';
import { SurveyRepository } from '../repositories/SurveyRepository';
import { SurveysUsersRepository } from '../repositories/SurveysUsersRepository';
import { UsersRepository } from '../repositories/UsersRepository';
import SendMailService from '../../services/SendMailService';
import { resolve } from 'path';

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

    const npsPath = resolve(__dirname, "..", "..","views", "emails", "npsMail.hbs");

    const variables = {
      name: userAlreadyExist.name,
      title: surveyAlreadyExist.title,
      description: surveyAlreadyExist.description,
      user_id: userAlreadyExist.id,
      link: process.env.URL_MAIL
    }

    const surveySearch = await surveyUserRepository.findOne({
      where: [ { user_id: userAlreadyExist.id }, { value: null }],
      relations: ["user", "survey"]
    });

    if(surveySearch){
      await SendMailService.execute(email, surveyAlreadyExist.title, variables, npsPath);
      return response.json(surveySearch)
    }

    const surveyUser = surveyUserRepository.create({
      user_id: userAlreadyExist.id,
      survey_id
    });

    await surveyUserRepository.save(surveyUser);

    
    await SendMailService.execute(email, surveyAlreadyExist.title, variables, npsPath);

    return response.json(surveyUser);
  }


}

export { SendMailController }
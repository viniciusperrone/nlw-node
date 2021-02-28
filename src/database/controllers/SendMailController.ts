import { Request, Response } from 'express'; 
import { getCustomRepository } from 'typeorm';
import { SurveyRepository } from '../repositories/SurveyRepository';
import { SurveysUsersRepository } from '../repositories/SurveysUsersRepository';
import { UsersRepository } from '../repositories/UsersRepository';
import SendMailService from '../../services/SendMailService';
import AppError from '../../errors/AppError';
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
      throw new AppError("User does not exist")
      
    }

    const surveyAlreadyExist = await surveyRepository.findOne({ id: survey_id })

    if (!surveyAlreadyExist) {
      throw new AppError("Survey does not exists!");
    }

    const npsPath = resolve(__dirname, "..", "..","views", "emails", "npsMail.hbs");

    const surveySearch = await surveyUserRepository.findOne({
      where: { user_id: userAlreadyExist.id, value: null },
      relations: ["user", "survey"]
    });

    const variables = {
      name: userAlreadyExist.name,
      title: surveyAlreadyExist.title,
      description: surveyAlreadyExist.description,
      id: "",
      link: process.env.URL_MAIL
    }


    if(surveySearch){
      variables.id = surveySearch.id,
      await SendMailService.execute(email, surveyAlreadyExist.title, variables, npsPath);
      return response.json(surveySearch)
    }

    const surveyUser = surveyUserRepository.create({
      user_id: userAlreadyExist.id,
      survey_id
    });

    await surveyUserRepository.save(surveyUser);

    variables.id = surveyUser.id;

    
    await SendMailService.execute(email, surveyAlreadyExist.title, variables, npsPath);

    return response.json(surveyUser);
  }


}

export { SendMailController }
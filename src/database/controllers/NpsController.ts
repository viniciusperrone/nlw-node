import { Request, Response } from 'express';
import { getCustomRepository, Not, IsNull } from 'typeorm';

import { SurveysUsersRepository } from '../repositories/SurveysUsersRepository'

class NpsController {
  async execute(request: Request, response: Response){
    const { survey_id } = request.params;

    const surveysAnswers = getCustomRepository(SurveysUsersRepository);

    const surveyUsers = await surveysAnswers.find({
      survey_id,
      value: Not(IsNull()),
    });

    const detractor = surveyUsers.filter(survey => 
      (survey.value >= 0 && survey.value <= 6)
    ).length;

    const promotors = surveyUsers.filter(survey =>
      (survey.value >= 9 && survey.value <= 10)
    ).length;

    const passive = surveyUsers.filter(survey =>
      (survey.value >= 7 && survey.value <= 8)
    ).length;

    const totalAnswers = surveyUsers.length;

    const calculator = Number((((promotors - detractor) / totalAnswers) * 100).toFixed(2));

    return response.json({
      detractor,
      promotors,
      passive,
      totalAnswers,
      nps: calculator
    })


  }
}

export { NpsController }
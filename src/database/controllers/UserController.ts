import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { UsersRepository } from '../repositories/UsersRepository';
import AppError from '../../errors/AppError';
import * as yup from 'yup';


class UserController {
  async create(request: Request, response: Response){
    const {
      name,
      email
    } = request.body;

    const schema = yup.object().shape({
      name: yup.string().required("Name is required!"),
      email: yup.string().email().required("Incorrect email")
    });


    try{
      await schema.validate(request.body, { abortEarly: false });
    } catch(err){
      return response.status(400).json({
        error: err
      })
    }
    
    const usersRepository = getCustomRepository(UsersRepository);

    const userAlrealdyExist = await usersRepository.findOne({
      email
    });

    if(userAlrealdyExist){
      throw new AppError("User already exist!");
    }

    const user = usersRepository.create({
      name, email
    });

    await usersRepository.save(user);
    
    return response.status(201).json(user);
  }
  
}

export { UserController };

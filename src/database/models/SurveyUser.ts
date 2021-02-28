import { 
  Entity, 
  PrimaryColumn, 
  Column, 
  CreateDateColumn, 
  ManyToOne, 
  JoinColumn 
} from 'typeorm';

import { User } from './User'; 
import { Survey } from './Survey';

import { v4 as uuid} from 'uuid';

@Entity("surveys_id")

class SurveyUser{
  @PrimaryColumn()
  readonly id: string;

  @Column()
  user_id: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: "user_id" })
  user: string;

  @Column()
  survey_id: string;

  @ManyToOne(() => Survey)
  @JoinColumn({ name: "survey_id" })
  survey: string;

  @Column()
  value: number;
  
  @CreateDateColumn()
  created_at: Date;

  constructor(){
    if(!this.id){
      this.id = uuid();
    }
  }
}

export { SurveyUser };
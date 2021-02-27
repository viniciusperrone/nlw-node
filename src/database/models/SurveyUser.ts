import { Entity, PrimaryColumn, Column, CreateDateColumn } from 'typeorm';

import { v4 as uuid} from 'uuid';

@Entity("users")

class SurveyUser{
  @PrimaryColumn()
  readonly id: string;

  @Column()
  user_id: string;

  @Column()
  survey_id: string;

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
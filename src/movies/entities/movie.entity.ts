import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
//set columns to nullable to because the data will be tested with others inputs
export class Movie {
  @Column({ nullable: true })
  year: number;
  @PrimaryColumn() //set this because don't have an Id
  title: string;
  @Column({ nullable: true })
  studios: string;
  @Column({ nullable: true })
  producers: string;
  @Column({ nullable: true })
  winner: 'yes' | null;
}

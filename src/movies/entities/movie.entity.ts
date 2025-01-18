import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Movie {
  @Column()
  year: number;
  @PrimaryColumn() //set this because don't have an Id
  title: string;
  @Column()
  studios: string;
  @Column()
  producers: string;
  @Column({ nullable: true })
  winner: 'yes' | null;
}

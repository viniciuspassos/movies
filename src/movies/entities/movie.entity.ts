import { Column, Entity } from 'typeorm';

@Entity()
export class Movie {
  @Column()
  year: number;
  @Column()
  title: string;
  @Column()
  studios: string;
  @Column()
  producers: string;
  @Column()
  winner: 'yes' | null;
}

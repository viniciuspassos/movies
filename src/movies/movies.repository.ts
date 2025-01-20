import { Repository } from 'typeorm';
import { Movie } from './entities/movie.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MovieRepository extends Repository<Movie> {
  async getMoviesOutliers() {}
}

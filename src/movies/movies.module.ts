import { Module, OnModuleInit } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { MoviesController } from './movies.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Movie } from './entities/movie.entity';
import * as path from 'path';

@Module({
  imports: [TypeOrmModule.forFeature([Movie])],
  controllers: [MoviesController],
  providers: [MoviesService],
})
export class MoviesModule implements OnModuleInit {
  constructor(private readonly moviesService: MoviesService) {}
  async onModuleInit() {
    const dataPath = path.join(__dirname, '..', '..', 'data/movielist.csv');
    await this.moviesService.loadDataFromFile(dataPath);
  }
}

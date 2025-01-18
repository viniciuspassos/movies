import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Movie } from './entities/movie.entity';
import { Repository } from 'typeorm';
import * as fs from 'fs';
import * as csvParser from 'csv-parser';

@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(Movie)
    private readonly movieRepository: Repository<Movie>,
  ) {}

  async findAll() {
    return this.movieRepository.find();
  }

  async loadDataFromFile(filePath: string): Promise<void> {
    const movies: Movie[] = [];
    return new Promise((resolve, reject) => {
      fs.createReadStream(filePath)
        .pipe(csvParser({ separator: ';' }))
        .on('data', (row: Movie) => {
          if (!!row.title) {
            movies.push({
              year: row.year,
              producers: row.producers,
              studios: row.studios,
              title: row.title,
              winner: row.winner,
            });
          }
        })
        .on('end', async () => {
          await this.movieRepository.save(movies);
          console.log('movies added');
          resolve();
        })
        .on('error', (error) => {
          console.error('Error on iput csv data', error);
          reject(error);
        });
    });
  }
}

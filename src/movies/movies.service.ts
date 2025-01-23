import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Movie } from './entities/movie.entity';
import * as fs from 'fs';
import * as csvParser from 'csv-parser';
import { MovieRepository } from './movies.repository';
import { MovieOutlier, OutliersResponse } from './types/movieOutlier';

@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(Movie)
    private readonly movieRepository: MovieRepository,
  ) {}

  async findAll() {
    return this.movieRepository.find();
  }

  async getOutliers() {
    return this.getProducerAwardsGap();
  }
  parseOutliers(data: MovieOutlier[]): OutliersResponse {
    const response: OutliersResponse = { min: [], max: [] };

    data.forEach((item) => {
      const parsedItem = {
        producer: item.producers,
        interval: item.interval,
        previousWin: item.previousWin,
        followingWin: item.followingWin,
      };

      if (item.category === 'min') {
        response.min.push(parsedItem);
      } else if (item.category === 'max') {
        response.max.push(parsedItem);
      }
    });

    return response;
  }

  async getProducerAwardsGap() {
    const query = `WITH RankedWinners AS (
    SELECT 
        producers,
        year AS winYear,
        ROW_NUMBER() OVER (PARTITION BY producers ORDER BY year) AS rank
    FROM Movie
    WHERE winner = 'yes'
),
Intervals AS (
    SELECT 
        a.producers,
        a.winYear AS previousWin,
        b.winYear AS followingWin,
        b.winYear - a.winYear AS interval
    FROM RankedWinners a
    JOIN RankedWinners b
        ON a.producers = b.producers AND a.rank = b.rank - 1
),
MaxInterval AS (
    SELECT 
        i.producers,
        i.interval,
        i.previousWin,
        i.followingWin
    FROM Intervals i
    WHERE i.interval = (SELECT MAX(interval) FROM Intervals)
    LIMIT 1
),
MinInterval AS (
    SELECT 
        i.producers,
        i.interval,
        i.previousWin,
        i.followingWin
    FROM Intervals i
    WHERE i.interval = (SELECT MIN(interval) FROM Intervals)
    LIMIT 1
)
SELECT 
    'max' AS category,
    producers,
    interval,
    previousWin,
    followingWin
FROM MaxInterval
UNION ALL
SELECT 
    'min' AS category,
    producers,
    interval,
    previousWin,
    followingWin
FROM MinInterval;
  `;
    const outliers = await this.movieRepository.query(query);
    const parsedResponse = this.parseOutliers(outliers);
    return parsedResponse;
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

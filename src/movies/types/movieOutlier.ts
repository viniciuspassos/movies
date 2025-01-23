interface MovieOutlier {
  category: 'max' | 'min';
  producers: string;
  interval: number;
  previousWin: number;
  followingWin: number;
}

interface OutliersResponse {
  min: {
    producer: string;
    interval: number;
    previousWin: number;
    followingWin: number;
  }[];
  max: {
    producer: string;
    interval: number;
    previousWin: number;
    followingWin: number;
  }[];
}
export { MovieOutlier, OutliersResponse };

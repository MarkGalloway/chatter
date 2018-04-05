export const PORT: number = process.env.PORT
  ? parseInt(process.env.PORT, 10)
  : 3000;

export const HOST: string = process.env.HOST || 'localhost';

export const DATABASE_URL: string = process.env.DATABASE_URL!;

export const TEST_DATABASE_URL: string = process.env.TEST_DATABASE_URL!;

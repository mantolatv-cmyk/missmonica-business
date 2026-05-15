import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const submitSimulation = async (req: Request, res: Response) => {
  res.status(200).json({ message: 'Not implemented' });
};

export const reviewSimulation = async (req: Request, res: Response) => {
  res.status(200).json({ message: 'Not implemented' });
};

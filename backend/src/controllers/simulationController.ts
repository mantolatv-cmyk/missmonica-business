import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const submitSimulation = async (req: Request, res: Response) => {
  try {
    const studentId = (req as any).user?.id || 'mock-student-id';
    const { scenarioId, inputType, contentUrl } = req.body;

    const submission = await prisma.simulationSubmission.create({
      data: {
        scenarioId,
        studentId,
        inputType,
        contentUrl,
        status: 'PENDING'
      }
    });

    res.status(201).json({ message: 'Simulation submitted successfully', submission });
  } catch (error) {
    res.status(500).json({ error: 'Failed to submit simulation' });
  }
};

export const reviewSimulation = async (req: Request, res: Response) => {
  try {
    const teacherId = (req as any).user?.id || 'mock-teacher-id';
    const { submissionId } = req.params;
    const { feedback, score } = req.body;

    const submission = await prisma.simulationSubmission.update({
      where: { id: submissionId as string },
      data: {
        teacherId,
        feedback,
        score,
        status: 'REVIEWED'
      }
    });

    res.status(200).json({ message: 'Review saved', submission });
  } catch (error) {
    res.status(500).json({ error: 'Failed to review simulation' });
  }
};

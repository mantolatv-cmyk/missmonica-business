"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reviewSimulation = exports.submitSimulation = void 0;
const express_1 = require("express");
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const submitSimulation = async (req, res) => {
    try {
        const studentId = req.user?.id || 'mock-student-id';
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
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to submit simulation' });
    }
};
exports.submitSimulation = submitSimulation;
const reviewSimulation = async (req, res) => {
    try {
        const teacherId = req.user?.id || 'mock-teacher-id';
        const { submissionId } = req.params;
        const { feedback, score } = req.body;
        const submission = await prisma.simulationSubmission.update({
            where: { id: submissionId },
            data: {
                teacherId,
                feedback,
                score,
                status: 'REVIEWED'
            }
        });
        res.status(200).json({ message: 'Review saved', submission });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to review simulation' });
    }
};
exports.reviewSimulation = reviewSimulation;
//# sourceMappingURL=simulationController.js.map
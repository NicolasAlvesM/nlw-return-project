import express from 'express';
import { NodemailerMailAdapter } from './adapters/nodemailer/nodemailer-mail-adapter';
import { PrismaFeedbackRepository } from './repositories/prisma/prismaFeedbackRepository';
import { SubmitFeedbackService } from './services/submitFeedbackService';

export const routes = express.Router()

routes.post('/feedbacks', async (req, res) => {
  const {type,comment,screenshot} = req.body;

  try{
  const prismaFeedbackRepository = new PrismaFeedbackRepository();
  const nodemailerMailAdapter= new NodemailerMailAdapter()

  const submitFeedbackService = new SubmitFeedbackService(prismaFeedbackRepository,nodemailerMailAdapter)

  await submitFeedbackService.execute({
    type,
    comment,
    screenshot
  })

  return res.status(201).send();
  } catch(err){
    console.log(err);

    return res.status(500).send();
  }
})
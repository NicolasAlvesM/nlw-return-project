import { SubmitFeedbackService } from "./submitFeedbackService"

const createFeedbackSpy= jest.fn();
const sendMailSpy = jest.fn();

const submitFeedback = new SubmitFeedbackService(
  {create: createFeedbackSpy},
  {sendMail: sendMailSpy} 
)

describe('Submit feedback', () => {
  it('should be able to submit feedback', async () => {
  await expect(submitFeedback.execute({
    type: 'bug',
    comment:'exemple',
    screenshot:'data:image/png;base64'
  })).resolves.not.toThrow();

  expect(createFeedbackSpy).toHaveBeenCalled()
  expect(sendMailSpy).toHaveBeenCalled()
  })

  it('should not be able to submit feedback without a type', async () => {
  await expect(submitFeedback.execute({
    type: '',
    comment:'exemple',
    screenshot:'data:image/png;base64'
  })).rejects.toThrow();
  })

  it('should not be able to submit feedback without a comment', async () => {
    await expect(submitFeedback.execute({
      type: 'bug',
      comment:'',
      screenshot:'data:image/png;base64 afasdfsda '
    })).rejects.toThrow();
  })

  it('should not be able to submit feedback wit an invalid screenshot', async () => {
    await expect(submitFeedback.execute({
      type: 'bug',
      comment:'comentário aqui',
      screenshot:'image.png'
    })).rejects.toThrow();
    })
})
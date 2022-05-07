import { ArrowLeft } from "phosphor-react";
import { FormEvent, useState } from "react";
import { FeedbackType, feedbackTypes } from "..";
import { api } from "../../../libs/api";
import { CloseButton } from "../../CloseButton";
import { Loading } from "../../Loadind";
import { ScreenshotButton } from "../ScreenshotButton";

interface FeedbackContentStepProps{
  feedbackType: FeedbackType;
  onFeedbackTypeRestartRequested: () => void;
  onFeedbackSent: () => void;
}

export function FeedbackContentStep({feedbackType, onFeedbackTypeRestartRequested,onFeedbackSent}:FeedbackContentStepProps){
  const [comment,setComment] = useState('')
  const [screenshot, setScreenshot] = useState<string | null>(null);
  const [isSendingFeedback, setIsSendingFeedback] = useState(false);

  const feedbackTypeInfo = feedbackTypes[feedbackType];

  async function handleSubmitFeedback(event:FormEvent){
    event.preventDefault();
    setIsSendingFeedback(true);

    await api.post('feedbacks',{
      comment,
      screenshot,
      type:feedbackType
    })

    setIsSendingFeedback(false);

    onFeedbackSent();
  }

  return(
    <>
      <header>
        <button onClick={onFeedbackTypeRestartRequested} type='button' className="top-5 left-5 absolute text-zinc-400 hover:text-zinc-100">
          <ArrowLeft weight="bold" className="h-4 w-4"/>
        </button>
        <span className="text-xl leading-6 flex items-center gap-2">
        <img src={feedbackTypeInfo.image.source} alt={feedbackTypeInfo.image.alt} className='w-6 h-6' />
          {feedbackTypeInfo.title}
        </span>

        <CloseButton/>
      </header>
      <form onSubmit={handleSubmitFeedback} className="my-4 w-full">
        <textarea 
          onChange={event => setComment(event.target.value)}
          className="min-w-[304px] w-full min-h-[112px] text-sm placeholder-zinc-400 text-zinc-100 border-zinc-600 bg-transparent rounded-md focus:outline-none  focus:border-brand-500 focus:ring-brand-500 focus:ring-1 resize-none scrollbar-thumb-zinc-700 scrollbar-track-transparent scrollbar-thin" placeholder="Conte com detalhes oque está acontecendo..."
        />
        <footer className="flex gap-2 mt-2">
          <ScreenshotButton
           screenshot={screenshot}
            onScreenshotTook={setScreenshot}
          />
          <button
            disabled={!(!!comment) || isSendingFeedback}
            type="submit"
            className="disabled:opacity-50 disabled:hover:bg-brand-500 p-2 bg-brand-500 rounded-md border-transparent flex-1 flex justify-center items-center text-sm hover:bg-brand-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 focus:ring-brand-500 transition-colors"

          >
            {isSendingFeedback ? <Loading /> : 'Enviar feedback'}
          </button>
        </footer>
      </form>
    </>
  )
}
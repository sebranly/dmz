import classnames from 'classnames';
import * as React from 'react';
import { CURRENT_SEASON } from '../constants/game';
import { YOUTUBE_REFERENCE } from '../constants/general';
import { questionsAnswers } from '../data/faq';
import { QuestionAnswer } from '../types';
import { displayWithTwoDigits } from '../utils/display';
import { Header } from './Header';

const FAQ = () => {
  const [faq, setFaq] = React.useState(questionsAnswers);

  const onToggle = (questionString: string) => {
    const newFaq = faq.map((qa: QuestionAnswer) => {
      const { answer, isNew, question, shown, yt } = qa;
      const isClicked = question === questionString;
      const shownValue = isClicked ? !shown : false;
      return { question, answer, isNew: !!isNew, shown: shownValue, yt: !!yt };
    });

    setFaq(newFaq);
  };

  return (
    <div id="faq">
      <Header text="FAQ" />
      {faq.map((qa: QuestionAnswer) => {
        const { answer, isNew, question, shown, yt } = qa;

        const questionSuffix = shown ? '-' : '+';
        const questionBis = `${question} [${questionSuffix}]`;
        const classnamesQuestionAndAnswer = classnames({ 'mt-2.5': !shown }, { 'my-5': shown });

        return (
          <div key={question} className={classnamesQuestionAndAnswer}>
            <div onClick={() => onToggle(question)} className="question">
              {isNew && <div className="inline text-amber-500">[New] </div>}
              {questionBis}
            </div>
            {shown && (
              <div className="answer mb-5">
                {answer.map((answerParagraph: string, index: number) => {
                  const classnamesParagraph = classnames('mb-5', { inline: index === answer.length - 1 && yt });
                  return (
                    <p className={classnamesParagraph} key={index}>
                      {answerParagraph}
                    </p>
                  );
                })}
                {yt && (
                  <>
                    {' '}
                    <a
                      className="underline yt-video"
                      href={YOUTUBE_REFERENCE}
                      rel="noopener noreferrer"
                      title="YouTube reference for conversion functions"
                      target="_blank"
                    >
                      {`watch S${displayWithTwoDigits(CURRENT_SEASON)} video`}
                    </a>
                  </>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export { FAQ };

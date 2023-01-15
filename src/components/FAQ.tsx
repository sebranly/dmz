import classnames from 'classnames';
import * as React from 'react';
import { YOUTUBE_REFERENCE } from '../constants/general';
import { questionsAnswers } from '../data/faq';
import { QuestionAnswer } from '../types';

const FAQ = () => {
  const [faq, setFaq] = React.useState(questionsAnswers);

  const onToggle = (questionString: string) => {
    const newFaq = faq.map((qa: QuestionAnswer) => {
      const { answer, question, shown, yt } = qa;
      const isClicked = question === questionString;
      const shownValue = isClicked ? !shown : false;
      return { question, answer, shown: shownValue, yt: !!yt };
    });

    setFaq(newFaq);
  };

  return (
    <div id="faq">
      <h3>FAQ</h3>
      {faq.map((qa: QuestionAnswer) => {
        const { answer, question, shown, yt } = qa;

        const questionSuffix = shown ? '-' : '+';
        const questionBis = `${question} [${questionSuffix}]`;
        const classnamesQuestionAndAnswer = classnames(
          { 'margin-top-10': !shown },
          { 'margin-bottom-20 margin-top-20': shown }
        );

        return (
          <div key={question} className={classnamesQuestionAndAnswer}>
            <div onClick={() => onToggle(question)} className="question">
              {questionBis}
            </div>
            {shown && (
              <div className="answer">
                {answer.map((answerParagraph: string, index: number) => {
                  const classnamesParagraph = classnames({ inline: index === answer.length - 1 && yt });
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
                      className="yt-video"
                      href={YOUTUBE_REFERENCE}
                      rel="noopener noreferrer"
                      title="YouTube reference for conversion functions"
                      target="_blank"
                    >
                      watch video
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
import classnames from 'classnames';
import * as React from 'react';
import { VIDEO_SEASON } from '../constants/game';
import { YOUTUBE_REFERENCE } from '../constants/general';
import { questionsAnswers } from '../data/faq';
import { QuestionAnswer } from '../types';
import { displaySeason } from '../utils/display';
import { Header } from './Header';

const FAQ = () => {
  const [faq, setFaq] = React.useState(questionsAnswers);

  const onToggle = (questionString: string) => {
    const newFaq = faq.map((qa: QuestionAnswer) => {
      const { answer, isNew, question, map, shown, yt } = qa;
      const isClicked = question === questionString;
      const shownValue = isClicked ? !shown : false;
      return { question, answer, isNew: !!isNew, shown: shownValue, map, yt: !!yt };
    });

    setFaq(newFaq);
  };

  return (
    <div id="faq-section">
      <Header text="FAQ" />
      {faq.map((qa: QuestionAnswer) => {
        const { answer, isNew, map, question, shown, yt } = qa;

        const questionSuffix = shown ? '-' : '+';
        const questionBis = `${question} [${questionSuffix}]`;
        const classnamesQuestionAndAnswer = classnames('text-base lg:text-lg', { 'mt-2.5': !shown }, { 'my-5': shown });

        return (
          <div key={question} className={classnamesQuestionAndAnswer}>
            <div
              onClick={() => onToggle(question)}
              className="text-left sm:text-center cursor-pointer font-bold mb-2 text-lime-400 hover:text-lime-500"
            >
              {isNew && <div className="inline text-amber-500 hover:text-amber-600">[New] </div>}
              {questionBis}
            </div>
            {shown && (
              <div className="text-left sm:text-justify mb-5">
                {answer.map((answerParagraph: string, index: number) => {
                  const classnamesParagraph = classnames('mb-5', { inline: index === answer.length - 1 && yt });

                  return (
                    <div
                      className={classnamesParagraph}
                      key={index}
                      dangerouslySetInnerHTML={{ __html: answerParagraph }}
                    />
                  );
                })}
                {yt && (
                  <a
                    className="underline block mt-5 text-center text-white"
                    href={YOUTUBE_REFERENCE}
                    rel="noopener noreferrer"
                    title="YouTube reference for conversion functions"
                    target="_blank"
                  >
                    {`Watch S${displaySeason(VIDEO_SEASON)} video`}
                  </a>
                )}
                {map && (
                  <ul className="text-center">
                    <li>
                      <a
                        className="underline text-white"
                        href="https://warzonetacmap.online"
                        rel="noopener noreferrer"
                        title="Hyperlink for a DMZ Interactive Map for finding the locations of dead drops"
                        target="_blank"
                      >
                        DMZ Interactive Map 1
                      </a>
                    </li>
                    <li>
                      <a
                        className="underline text-white"
                        href="https://wzhub.gg/map"
                        rel="noopener noreferrer"
                        title="Hyperlink for another DMZ Interactive Map for finding the locations of dead drops"
                        target="_blank"
                      >
                        DMZ Interactive Map 2
                      </a>
                    </li>
                  </ul>
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

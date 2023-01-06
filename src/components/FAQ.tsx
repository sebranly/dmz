import * as React from 'react';
import { questionsAnswers } from '../data/faq';
import { QuestionAnswer } from '../types';

const FAQ = () => {
  const [faq, setFaq] = React.useState(questionsAnswers);

  const onToggle = (questionString: string) => {
    const newFaq = faq.map((qa: QuestionAnswer) => {
      const { answer, question, shown } = qa;
      const isQuestion = question === questionString;
      const shownValue = isQuestion ? !shown : false;
      return { question, answer, shown: shownValue };
    });

    setFaq(newFaq);
  };

  return (
    <div id="faq">
      <h3>FAQ</h3>
      {faq.map((qa: QuestionAnswer) => {
        const { answer, question, shown } = qa;

        const questionSuffix = shown ? '-' : '+';
        const questionBis = `${question} [${questionSuffix}]`;

        return (
          <div key={question} className="question-and-answer">
            <div onClick={() => onToggle(question)} className="question">
              {questionBis}
            </div>
            {shown && <div className="answer">{answer}</div>}
          </div>
        );
      })}
    </div>
  );
};

export { FAQ };

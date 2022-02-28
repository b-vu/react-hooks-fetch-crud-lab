import {React, useState, useEffect} from "react";
import QuestionItem from "./QuestionItem";

function QuestionList() {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/questions")
    .then(res => res.json())
    .then(data => {
      setQuestions(data);
    });
  }, []);

  const handleDelete = questionId => {
    const newQuestionsArray = questions.filter(question => question.id !== questionId);
    setQuestions(newQuestionsArray);
  }

  const handleAnswerChange = (questionId, newAnswerIndex) => {
    const newQuestionsArray = questions.map(question => {
      if(question.id === questionId){
        return {
          ...question,
          "correctIndex": newAnswerIndex
        }
      }
      return question
    })
    setQuestions(newQuestionsArray);
  }
  
  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>{questions.map(question => {
        return <QuestionItem key={question.id} question={question} onDeleteClick={handleDelete} onNewAnswerSelection={handleAnswerChange}></QuestionItem>
      })}</ul>
    </section>
  );
}

export default QuestionList;

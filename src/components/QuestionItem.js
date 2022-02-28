import React from "react";

function QuestionItem({ question, onDeleteClick, onNewAnswerSelection }) {
  const { id, prompt, answers, correctIndex } = question;

  const options = answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  ));

  const handleDeleteClick = () => {
    fetch(`http://localhost:4000/questions/${question.id}`, {
      method: "DELETE"
    })
    .then(res => res.json())
    .then(() => onDeleteClick(question.id));
  }

  const handleNewAnswer = event => {
    fetch(`http://localhost:4000/questions/${question.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "correctIndex": parseInt(event.target.value)
      })
    })
    .then(res => res.json())
    .then(data => onNewAnswerSelection(data.id, data.correctIndex));
  }
  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select defaultValue={correctIndex} onChange={handleNewAnswer}>{options}</select>
      </label>
      <button onClick={() => handleDeleteClick()}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;

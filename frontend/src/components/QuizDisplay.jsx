import { useState } from 'react';
import './QuizDisplay.css';

function QuizDisplay({ quiz, onReset }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);

  // Handle option selection
  const handleSelectOption = (optionIndex) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [currentQuestion]: optionIndex
    });
  };

  // Go to next question
  const handleNext = () => {
    if (currentQuestion < quiz.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  // Go to previous question
  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  // Submit quiz and show results
  const handleSubmit = () => {
    setShowResults(true);
  };

  // Calculate score
  const calculateScore = () => {
    let correct = 0;
    quiz.forEach((question, index) => {
      if (selectedAnswers[index] === question.correctAnswer) {
        correct++;
      }
    });
    return correct;
  };

  // Check if current question is answered
  const isAnswered = selectedAnswers.hasOwnProperty(currentQuestion);

  // Check if all questions are answered
  const allAnswered = quiz.every((_, index) => selectedAnswers.hasOwnProperty(index));

  // RESULTS VIEW
  if (showResults) {
    const score = calculateScore();
    const percentage = Math.round((score / quiz.length) * 100);

    return (
      <div className="quiz-results">
        <div className="results-header">
          <h2>🎉 Quiz Complete!</h2>
          <div className="score-display">
            <div className="score-circle">
              <span className="score-number">{score}</span>
              <span className="score-total">/ {quiz.length}</span>
            </div>
            <p className="percentage">{percentage}% Correct</p>
          </div>
        </div>

        <div className="results-list">
          <h3>Review Your Answers</h3>
          {quiz.map((question, index) => {
            const userAnswer = selectedAnswers[index];
            const isCorrect = userAnswer === question.correctAnswer;

            return (
              <div key={index} className={`result-card ${isCorrect ? 'correct' : 'incorrect'}`}>
                <div className="result-header">
                  <h4>Question {index + 1}</h4>
                  <span className={`result-badge ${isCorrect ? 'correct' : 'incorrect'}`}>
                    {isCorrect ? '✓ Correct' : '✗ Incorrect'}
                  </span>
                </div>

                <p className="question-text">{question.question}</p>

                <div className="result-options">
                  {question.options.map((option, optIndex) => (
                    <div
                      key={optIndex}
                      className={`result-option ${
                        optIndex === question.correctAnswer ? 'correct-answer' : ''
                      } ${
                        optIndex === userAnswer && userAnswer !== question.correctAnswer
                          ? 'wrong-answer'
                          : ''
                      }`}
                    >
                      {option}
                      {optIndex === question.correctAnswer && ' ✓'}
                      {optIndex === userAnswer && userAnswer !== question.correctAnswer && ' ✗'}
                    </div>
                  ))}
                </div>

                <div className="explanation-box">
                  <strong>Explanation:</strong> {question.explanation}
                </div>
              </div>
            );
          })}
        </div>

        <button className="reset-btn" onClick={onReset}>
          Generate New Quiz
        </button>
      </div>
    );
  }

  // QUIZ TAKING VIEW
  const question = quiz[currentQuestion];
  const userAnswer = selectedAnswers[currentQuestion];

  return (
    <div className="quiz-display">
      {/* Progress Bar */}
      <div className="progress-bar">
        <div 
          className="progress-fill" 
          style={{ width: `${((currentQuestion + 1) / quiz.length) * 100}%` }}
        ></div>
      </div>

      {/* Question Counter */}
      <div className="question-counter">
        Question {currentQuestion + 1} of {quiz.length}
      </div>

      {/* Question Card */}
      <div className="question-card">
        <h2 className="question-text">{question.question}</h2>

        <div className="options-container">
          {question.options.map((option, index) => (
            <button
              key={index}
              className={`option-btn ${userAnswer === index ? 'selected' : ''}`}
              onClick={() => handleSelectOption(index)}
            >
              <span className="option-letter">
                {String.fromCharCode(65 + index)}
              </span>
              <span className="option-text">{option}</span>
              {userAnswer === index && <span className="checkmark">✓</span>}
            </button>
          ))}
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="navigation-buttons">
        <button
          className="nav-btn previous"
          onClick={handlePrevious}
          disabled={currentQuestion === 0}
        >
          ← Previous
        </button>

        <div className="question-indicators">
          {quiz.map((_, index) => (
            <button
              key={index}
              className={`indicator ${index === currentQuestion ? 'active' : ''} ${
                selectedAnswers.hasOwnProperty(index) ? 'answered' : ''
              }`}
              onClick={() => setCurrentQuestion(index)}
            >
              {index + 1}
            </button>
          ))}
        </div>

        {currentQuestion === quiz.length - 1 ? (
          <button
            className="nav-btn submit"
            onClick={handleSubmit}
            disabled={!allAnswered}
          >
            Submit Quiz
          </button>
        ) : (
          <button
            className="nav-btn next"
            onClick={handleNext}
          >
            Next →
          </button>
        )}
      </div>

      {/* Warning if not all answered */}
      {currentQuestion === quiz.length - 1 && !allAnswered && (
        <p className="warning-text">
          ⚠️ Please answer all questions before submitting
        </p>
      )}
    </div>
  );
}

export default QuizDisplay;
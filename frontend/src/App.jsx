import { useState } from 'react';
import QuizForm from './components/QuizForm';
import QuizDisplay from './components/QuizDisplay';
import './App.css';

function App() {
  const [quiz, setQuiz] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleQuizGenerated = (generatedQuiz) => {
    setQuiz(generatedQuiz);
  };

  const handleReset = () => {
    setQuiz(null);
  };

  return (
    <div className="App">
      <div className="container">
        <header className="app-header">
          <h1>AI Quiz Generator</h1>
          <p>Generate custom quizzes from any content using AI</p>
        </header>

        {loading ? (
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>🤖 AI is generating your quiz...</p>
            <p className="loading-subtext">This may take 5-10 seconds</p>
          </div>
        ) : quiz ? (
          <QuizDisplay quiz={quiz} onReset={handleReset} />
        ) : (
          <QuizForm 
            onQuizGenerated={handleQuizGenerated}
            setLoading={setLoading}
          />
        )}
      </div>
    </div>
  );
}

export default App;
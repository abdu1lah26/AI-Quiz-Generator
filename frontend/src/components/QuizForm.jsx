import {useState} from 'react';
import axios from 'axios';
import './QuizForm.css';

function QuizForm({ onQuizGenerated, setLoading}) {
    const [content, setContent] = useState('');
    const [ numQuestions, setNumQuestions ] = useState(5);
    const [ difficulty, setDifficulty ] = useState('medium');

    const handleSubmit = async (e) => {
        e.preventDefault();

        if( !content.trim() ) {
            alert('Please enter the content for the quiz.');
            return;
        }

        setLoading(true);

        try {
            const response = await axios.post('http://localhost:5000/api/quiz/generate', {
                content,
                numQuestions: parseInt(numQuestions),
                difficulty
            });

            if(response.data.success) {
                onQuizGenerated(response.data.quiz);
            }
        } catch (error) {
            alert('An error occurred while generating the quiz. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="quiz-form">
            <h2>Generate Your Quiz</h2>
            <form onSubmit={handleSubmit}>

                {/* Content Input */}
                <div className="form-group">
                    <label htmlFor="content">Content / Topic</label>
                    <textarea 
                    id="content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Paste your study material, article, or topic here...
            
Example: 'React Hooks are functions that let you use state and lifecycle features in functional components. useState is used for state management, and useEffect handles side effects.'"
            rows="8"
                    />
                </div>

                 {/* Settings Row */}
                <div className="settings-row">

                     {/* Number of Questions */}
                     <div className="form-group">
            <label htmlFor="numQuestions">Number of Questions</label>
            <select
              id="numQuestions"
              value={numQuestions}
              onChange={(e) => setNumQuestions(e.target.value)}
            >
              <option value="3">3 Questions</option>
              <option value="5">5 Questions</option>
              <option value="10">10 Questions</option>
              <option value="15">15 Questions</option>
            </select>
          </div>
                    {/* Difficulty Level */}
                    <div className="form-group">
            <label htmlFor="difficulty">Difficulty Level</label>
            <select
              id="difficulty"
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
            >
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>    
                </div>    
                 <button type="submit" className="generate-btn">
           Generate Quiz with AI
        </button>
            </form>
        </div>
    );
}

export default QuizForm;
import { GoogleGenAI } from "@google/genai";

// Initialize GenAI - NEW SYNTAX: Pass object with apiKey
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY
});

const generateQuiz = async (req, res) => {
  try {
    const { content, numQuestions, difficulty } = req.body;

    if (!content || !numQuestions || !difficulty) {
      return res.status(400).json({ 
        error: 'Missing required fields: content, numQuestions, difficulty' 
      });
    }

    const prompt = `
You are a quiz generator. Based on the following content, generate ${numQuestions} multiple-choice questions at ${difficulty} difficulty level.

Content:
${content}

Return ONLY a valid JSON array with this exact structure (no markdown, no extra text):
[
  {
    "question": "Question text here?",
    "options": ["Option A", "Option B", "Option C", "Option D"],
    "correctAnswer": 0,
    "explanation": "Why this is the correct answer"
  }
]

Rules:
- correctAnswer is the index (0-3) of the correct option
- Make questions clear and unambiguous
- Provide helpful explanations
- Return ONLY the JSON array, nothing else
`;

    console.log('🤖 Calling Gemini API...');

    // NEW SYNTAX: ai.models.generateContent()
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",  // Or "gemini-1.5-flash"
      contents: prompt
    });

    console.log('✅ Gemini response received');

    // NEW SYNTAX: response.text (property, not method)
    const text = response.text;

    // Clean response
    let cleanedText = text.trim();
    if (cleanedText.startsWith('```json')) {
      cleanedText = cleanedText.replace(/```json\n?/g, '').replace(/```\n?/g, '');
    } else if (cleanedText.startsWith('```')) {
      cleanedText = cleanedText.replace(/```\n?/g, '');
    }

    const quiz = JSON.parse(cleanedText);

    if (!Array.isArray(quiz) || quiz.length === 0) {
      throw new Error('Invalid quiz format received from AI');
    }

    res.json({ 
      success: true,
      quiz: quiz,
      message: `Generated ${quiz.length} questions successfully!`
    });

  } catch (error) {
    console.error('❌ Error generating quiz:', error);
    res.status(500).json({ 
      error: 'Failed to generate quiz',
      details: error.message 
    });
  }
};

export { generateQuiz };
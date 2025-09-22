import { GoogleGenerativeAI } from '@google/generative-ai';

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

if (!API_KEY) {
  console.error('VITE_GEMINI_API_KEY is not set in environment variables');
}

const genAI = new GoogleGenerativeAI(API_KEY);

export interface LetterSuggestion {
  content: string;
}

export async function getLetterSuggestions(currentText: string): Promise<LetterSuggestion[]> {
  if (!API_KEY) {
    console.error('Gemini API key is not configured');
    throw new Error('Gemini API key is not configured');
  }

  console.log('Getting suggestions for text:', currentText); // Debug log

  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

    const prompt = `You are helping someone write a heartfelt personal letter. Based on what they've written so far, suggest 1-2 natural continuations for what they could write next.

Current letter content:
"${currentText || '(empty)'}"

Rules:
- If the letter is empty, suggest opening lines
- If there's content, suggest what they could write next to continue their thought
- Keep suggestions natural, warm, and personal
- Each suggestion should be 1-2 sentences
- Focus on continuing the flow of the letter, not rewriting what's already there
- Make suggestions feel like they're coming from the person's own voice

Provide exactly 1-2 suggestions in this format:
Suggestion 1: [your suggestion here]
Suggestion 2: [your suggestion here]

Do not include any other text, explanations, or formatting.`;

    console.log('Sending prompt to Gemini...'); // Debug log

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    console.log('Gemini response:', text); // Debug log

    // Parse the response to extract suggestions
    const lines = text.split('\n').filter(line => line.trim().startsWith('Suggestion'));
    console.log('Parsed lines:', lines); // Debug log
    
    const suggestions = lines.map(line => ({
      content: line.replace(/^Suggestion \d+:\s*/, '').trim()
    }));

    console.log('Final suggestions:', suggestions); // Debug log

    if (suggestions.length > 0) {
      return suggestions;
    } else {
      console.warn('No suggestions found in response, using fallbacks');
      return getFallbackSuggestions(currentText);
    }

  } catch (error) {
    console.error('Error getting Gemini suggestions:', error);
    // For debugging, let's see the actual error
    if (error instanceof Error) {
      console.error('Error message:', error.message);
      console.error('Error stack:', error.stack);
    }
    return getFallbackSuggestions(currentText);
  }
}

function getFallbackSuggestions(currentText: string): LetterSuggestion[] {
  console.log('Using fallback suggestions for:', currentText); // Debug log
  
  if (!currentText || currentText.trim() === '') {
    return [
      { content: "Dear [Name], I've been thinking about you lately and wanted to reach out..." },
      { content: "Hi there! I hope this letter finds you well and in good spirits." }
    ];
  } 
  
  // Analyze the content to provide more relevant fallbacks
  const lowerText = currentText.toLowerCase();
  
  if (lowerText.includes('dear') && currentText.length < 50) {
    return [
      { content: "I hope you're doing well and that life has been treating you kindly." },
      { content: "It's been too long since we last spoke, and I wanted to catch up." }
    ];
  }
  
  if (lowerText.includes('thank') || lowerText.includes('grateful')) {
    return [
      { content: "Your kindness has meant more to me than you'll ever know." },
      { content: "I keep thinking about the impact you've had on my life." }
    ];
  }
  
  if (lowerText.includes('miss') || lowerText.includes('remember')) {
    return [
      { content: "Those memories bring such warmth to my heart every time I think of them." },
      { content: "I find myself smiling whenever I recall those special moments we shared." }
    ];
  }
  
  // Generic but more varied fallbacks
  const genericSuggestions = [
    { content: "I wanted to share more about what's been on my mind lately." },
    { content: "There's something I've been meaning to tell you for a while now." },
    { content: "I hope we can find time to connect soon and catch up properly." },
    { content: "Your friendship has always meant so much to me, especially during challenging times." },
    { content: "I've been reflecting on our relationship and how much it's shaped who I am today." }
  ];
  
  // Return 2 random suggestions from the generic ones
  const shuffled = genericSuggestions.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, 2);
}
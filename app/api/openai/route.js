import { NextResponse } from 'next/server';
import OpenAI from 'openai';
import { systemPrompt } from './systemPrompt';

export async function POST(request) {
  try {
    // Get the request body
    const { message } = await request.json();

    if (!message) {
      return NextResponse.json(
        { error: "No message provided" },
        { status: 400 }
      );
    }

    // Initialize OpenAI client
    // Note: You would need to provide your API key in an environment variable
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY, // This should be set in .env.local file
    });

    // Make a request to the OpenAI API
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          // Use the imported system prompt and encode any potentially problematic characters
          content: systemPrompt
        },
        {
          role: "user",
          content: message
        }
      ],
      max_tokens: 300,
    });

    const aiResponse = completion.choices[0].message.content;

    return NextResponse.json({ reply: aiResponse });
  } catch (error) {
    console.error('OpenAI API error:', error);
    
    // Log the specific error details for debugging
    if (error.response) {
      console.error('OpenAI API response error:', error.response.data);
    }

    return NextResponse.json(
      { error: "Error processing your request" },
      { status: 500 }
    );
  }
}

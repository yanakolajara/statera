import React, { useState } from 'react';
// import { financialAnalysis } from './prompts';
import { getGenaiResponse } from '../../../../genai/genai';
import { formatTransactionsForAI } from './pormptFormatter';

export default function GeminiTools({ transactions }) {
  const [response, setResponse] = useState('');
  const [prompt, setPrompt] = useState('');

  const handlePrompt1 = async () => {
    setPrompt(formatTransactionsForAI(transactions));
    const res = await getGenaiResponse(prompt);
    console.log(res);
    setResponse(res);
  };

  const handlePrompt2 = () => {};

  const handlePrompt3 = () => {
    // TODO: Implement Gemini prompt 3
    console.log('Prompt 3 clicked');
  };

  return (
    <article className='gemini-tools'>
      <h2>AI Assistant</h2>
      <div className='gemini-buttons'>
        <button className='btn' onClick={handlePrompt1}>
          Financial Analysis
        </button>
        <button className='btn' onClick={handlePrompt2}>
          Budget Planning
        </button>
        <button className='btn' onClick={handlePrompt3}>
          Savings Tips
        </button>
      </div>
      <div className='genai-response'>{response}</div>
    </article>
  );
}

import { useState, useEffect } from 'react';
import { getGenaiResponse } from './genai';

export const useStreamResponse = (transcript) => {
  const [response, setResponse] = useState('');

  useEffect(() => {
    const fetchStream = async () => {
      try {
        const text = await getGenaiResponse(transcript);
        setResponse(text);
      } catch (error) {
        console.error('Error fetching stream:', error);
        setResponse('Error: Unable to get response');
      }
    };

    if (transcript) {
      fetchStream();
    }
  }, [transcript]);

  return response;
};

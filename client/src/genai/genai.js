const { GoogleGenerativeAI } = require('@google/generative-ai');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

export const getGenaiResponse = async (prompt) => {
  const result = await model.generateContent(prompt);
  console.log(result.response.text());
  return result.response.text();
};

// export const getGenaiStreamResponse = async (prompt) => {
//   const response = await model.generateContentStream(prompt);
//   let fullText = '';

//   for await (const chunk of response.stream()) {
//     const text = chunk.text();
//     fullText += text;
//   }

//   return fullText;
// };

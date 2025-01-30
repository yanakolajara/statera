import { formatTransactionsForAI } from './pormptFormatter';

export const financialAnalysis = (transactions) => `
Based on the financial data I will provide, analyze my spending habits, income, and overall financial situation. Identify patterns, potential areas for savings, and any financial risks. Additionally, provide insights on how I can optimize my expenses, increase my disposable income, and improve my financial health. Offer opinions and recommendations on potential strategies, such as budgeting adjustments, investment opportunities, or expense reductions. Make sure the analysis is detailed and actionable.\n\n

${formatTransactionsForAI(transactions)}
`;

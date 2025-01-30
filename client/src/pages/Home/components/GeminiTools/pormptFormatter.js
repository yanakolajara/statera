export const formatTransactionsForAI = (transactions) => {
  if (!transactions || transactions.length === 0) {
    return 'No transactions available for analysis.';
  }

  let summary = `Financial Transactions Summary:\n\n`;
  let totalIncome = 0;
  let totalExpenses = 0;
  let categorySummary = {};

  transactions.forEach(({ amount, type, category, description, date }) => {
    const formattedDate = new Date(date).toLocaleDateString('en-US');
    const formattedAmount = `$${parseFloat(amount).toFixed(2)}`;

    // Choose correct phrasing for Income vs. Expense
    let actionPhrase =
      type === 'income'
        ? `Received ${formattedAmount} as`
        : `Spent ${formattedAmount} on`;

    summary += `- ${type.toUpperCase()}: ${actionPhrase} ${category} (${description}) on ${formattedDate}.\n`;

    if (type === 'income') {
      totalIncome += parseFloat(amount);
    } else {
      totalExpenses += parseFloat(amount);
    }

    // Track spending per category
    if (!categorySummary[category]) {
      categorySummary[category] = 0;
    }
    categorySummary[category] += parseFloat(amount);
  });

  summary += `\nTotal Income: $${totalIncome.toFixed(2)}\n`;
  summary += `Total Expenses: $${totalExpenses.toFixed(2)}\n`;
  summary += `Net Balance: $${(totalIncome - totalExpenses).toFixed(2)}\n`;

  summary += `\nSpending Breakdown by Category:\n`;
  Object.entries(categorySummary).forEach(([category, total]) => {
    summary += `- ${category}: $${total.toFixed(2)}\n`;
  });

  summary += `\nPlease analyze these transactions and provide insights on spending habits, financial risks, and potential savings strategies.`;

  return summary;
};

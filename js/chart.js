const renderChart = (transactions) => {
  const ctx = document.getElementById('expense-chart').getContext('2d');
  const categories = [...new Set(transactions.map(t => t.category))];
  const data = categories.map(cat => {
    return transactions
      .filter(t => t.category === cat)
      .reduce((sum, t) => sum + t.amount, 0);
  });

  new Chart(ctx, {
    type: 'pie',
    data: {
      labels: categories,
      datasets: [{
        label: 'Expenses by Category',
        data,
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4CAF50']
      }]
    }
  });
};

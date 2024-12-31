document.addEventListener('DOMContentLoaded', () => {
  const transactions = Storage.getData('transactions');
  const form = document.getElementById('transaction-form');
  const tableBody = document.querySelector('#transaction-table tbody');

  const renderTable = () => {
    tableBody.innerHTML = '';
    transactions.forEach((t, index) => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${t.date}</td>
        <td>${t.description}</td>
        <td>${t.category}</td>
        <td>${t.amount}</td>
        <td><button data-index="${index}" class="delete-btn">Delete</button></td>
      `;
      tableBody.appendChild(row);
    });
  };

  const renderChart = () => {
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

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const description = document.getElementById('description').value;
    const amount = parseFloat(document.getElementById('amount').value);
    const category = document.getElementById('category').value;
    const date = document.getElementById('date').value;

    transactions.push({ description, amount, category, date });
    Storage.saveData('transactions', transactions);
    
    renderTable();
    renderChart();

    form.reset();
  });

  document.getElementById('transaction-table').addEventListener('click', (e) => {
    if (e.target.classList.contains('delete-btn')) {
      const index = e.target.getAttribute('data-index');
      transactions.splice(index, 1);
      Storage.saveData('transactions', transactions);

      renderTable();
      renderChart();
    }
  });

  renderTable();
  renderChart();
});

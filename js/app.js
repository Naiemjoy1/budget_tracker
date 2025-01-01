document.addEventListener('DOMContentLoaded', () => {
  const transactions = Storage.getData('transactions');
  const form = document.getElementById('transaction-form');
  const tableBody = document.querySelector('#transaction-table tbody');
  const searchKeyword = document.getElementById('search-keyword');
  const filterCategory = document.getElementById('filter-category');
  const filterStartDate = document.getElementById('filter-start-date');
  const filterEndDate = document.getElementById('filter-end-date');

  const filterAndSearch = () => {
    const keyword = searchKeyword.value.toLowerCase();
    const category = filterCategory.value;
    const startDate = filterStartDate.value;
    const endDate = filterEndDate.value;

    const filteredTransactions = transactions.filter(t => {
      const matchesKeyword = t.description.toLowerCase().includes(keyword);
      const matchesCategory = category === 'all' || t.category === category;
      const matchesDate = (!startDate || new Date(t.date) >= new Date(startDate)) &&
                          (!endDate || new Date(t.date) <= new Date(endDate));

      return matchesKeyword && matchesCategory && matchesDate;
    });

    renderTable(filteredTransactions);
    renderChart(filteredTransactions);
  };

  const renderTable = (data) => {
    tableBody.innerHTML = '';
    data.forEach((t, index) => {
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

  const renderChart = (data) => {
    const ctx = document.getElementById('expense-chart').getContext('2d');
    const categories = [...new Set(data.map(t => t.category))];
    const chartData = categories.map(cat => {
      return data
        .filter(t => t.category === cat)
        .reduce((sum, t) => sum + t.amount, 0);
    });

    new Chart(ctx, {
      type: 'pie',
      data: {
        labels: categories,
        datasets: [{
          label: 'Expenses by Category',
          data: chartData,
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

    filterAndSearch();
    form.reset();
  });

  document.getElementById('transaction-table').addEventListener('click', (e) => {
    if (e.target.classList.contains('delete-btn')) {
      const index = e.target.getAttribute('data-index');
      transactions.splice(index, 1);
      Storage.saveData('transactions', transactions);

      filterAndSearch();
    }
  });

  searchKeyword.addEventListener('input', filterAndSearch);
  filterCategory.addEventListener('change', filterAndSearch);
  filterStartDate.addEventListener('change', filterAndSearch);
  filterEndDate.addEventListener('change', filterAndSearch);

  filterAndSearch();
});

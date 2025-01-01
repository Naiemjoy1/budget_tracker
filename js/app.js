document.addEventListener('DOMContentLoaded', () => {
  const transactions = Storage.getData('transactions');
  const form = document.getElementById('transaction-form');
  const tableBody = document.querySelector('#transaction-table tbody');
  const searchKeyword = document.getElementById('search-keyword');
  const filterCategory = document.getElementById('filter-category');
  const filterStartDate = document.getElementById('filter-start-date');
  const filterEndDate = document.getElementById('filter-end-date');

  const modal = document.createElement('div');
  modal.id = 'edit-modal';
  modal.style.display = 'none';
  modal.innerHTML = `
    <div class="modal-content">
      <span id="close-modal" class="close">&times;</span>
      <h2>Edit Transaction</h2>
      <form id="edit-form">
        <input type="text" id="edit-description" placeholder="Description" required />
        <input type="number" id="edit-amount" placeholder="Amount" required />
        <select id="edit-category">
          <option value="income">Income</option>
          <option value="food">Food</option>
          <option value="transport">Transport</option>
          <option value="entertainment">Entertainment</option>
        </select>
        <input type="date" id="edit-date" required />
        <button type="submit">Save</button>
      </form>
    </div>`;
  document.body.appendChild(modal);

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
        <td>
          <button data-index="${index}" class="edit-btn">Edit</button>
          <button data-index="${index}" class="delete-btn">Delete</button>
        </td>
      `;
      row.addEventListener('mouseover', () => row.classList.add('highlight'));
      row.addEventListener('mouseout', () => row.classList.remove('highlight'));
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

  form.addEventListener('input', (e) => {
    const input = e.target;
    if (input.validity.valid) {
      input.style.borderColor = 'green';
    } else {
      input.style.borderColor = 'red';
    }
  });

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
    } else if (e.target.classList.contains('edit-btn')) {
      const index = e.target.getAttribute('data-index');
      const transaction = transactions[index];

      document.getElementById('edit-description').value = transaction.description;
      document.getElementById('edit-amount').value = transaction.amount;
      document.getElementById('edit-category').value = transaction.category;
      document.getElementById('edit-date').value = transaction.date;

      modal.style.display = 'block';

      document.getElementById('edit-form').onsubmit = (event) => {
        event.preventDefault();

        transaction.description = document.getElementById('edit-description').value;
        transaction.amount = parseFloat(document.getElementById('edit-amount').value);
        transaction.category = document.getElementById('edit-category').value;
        transaction.date = document.getElementById('edit-date').value;

        Storage.saveData('transactions', transactions);
        modal.style.display = 'none';
        filterAndSearch();
      };
    }
  });

  document.getElementById('close-modal').addEventListener('click', () => {
    modal.style.display = 'none';
  });

  searchKeyword.addEventListener('input', filterAndSearch);
  filterCategory.addEventListener('change', filterAndSearch);
  filterStartDate.addEventListener('change', filterAndSearch);
  filterEndDate.addEventListener('change', filterAndSearch);

  filterAndSearch();
});
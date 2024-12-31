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
  
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const description = document.getElementById('description').value;
      const amount = parseFloat(document.getElementById('amount').value);
      const category = document.getElementById('category').value;
      const date = document.getElementById('date').value;
  
      transactions.push({ description, amount, category, date });
      Storage.saveData('transactions', transactions);
      renderTable();
      form.reset();
    });
  
    document.getElementById('transaction-table').addEventListener('click', (e) => {
      if (e.target.classList.contains('delete-btn')) {
        const index = e.target.getAttribute('data-index');
        transactions.splice(index, 1);
        Storage.saveData('transactions', transactions);
        renderTable();
      }
    });
  
    renderTable();
  });
  
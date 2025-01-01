// Service Worker Registration (for PWA functionality)
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js').then((registration) => {
      console.log('Service Worker registered with scope: ', registration.scope);
  }).catch((error) => {
      console.log('Service Worker registration failed: ', error);
  });
}

// Toggle dark mode
const toggleButton = document.querySelector(".toggle-button");
toggleButton.addEventListener("click", () => {
  document.body.dataset.theme = document.body.dataset.theme === "dark" ? "" : "dark";
});

// Export to CSV
const exportButton = document.querySelector(".export-button");
exportButton.addEventListener("click", () => {
  const table = document.getElementById("transaction-table");
  const rows = table.querySelectorAll("tr");
  const data = [];
  
  rows.forEach(row => {
      const cells = row.querySelectorAll("td, th");
      const rowData = [];
      cells.forEach(cell => rowData.push(cell.textContent.trim()));
      data.push(rowData);
  });

  exportCSV(data);
});

function exportCSV(data) {
  const csvContent = "data:text/csv;charset=utf-8," + data.map(row => row.join(",")).join("\n");
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", "transactions.csv");
  document.body.appendChild(link);
  link.click();
}

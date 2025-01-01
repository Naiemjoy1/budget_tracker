const exportButton = document.querySelector(".export-button");
      exportButton.addEventListener("click", () => {
        const table = document.getElementById("transaction-table");
        const rows = table.querySelectorAll("tr");
        const data = [];

        rows.forEach((row) => {
          const cells = row.querySelectorAll("td");
          if (cells.length > 0) {
            const rowData = [
              cells[0].textContent.trim(),
              cells[1].textContent.trim(),
              cells[2].textContent.trim(),
              cells[3].textContent.trim(),
            ];
            data.push(rowData);
          }
        });

        exportCSV(data);
      });

      function exportCSV(data) {
        const csvContent =
          "data:text/csv;charset=utf-8," +
          data.map((row) => row.join(",")).join("\n");
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "transactions.csv");
        document.body.appendChild(link);
        link.click();
      }
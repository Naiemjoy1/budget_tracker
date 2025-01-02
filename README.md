# Budget Tracker

A simple personal budget tracker that allows users to add transactions, filter and search through them, visualize the data in a pie chart, toggle between dark and light themes, and export transaction data as a CSV file. The project also supports progressive web app (PWA) functionality with offline capabilities.

## Features

- Add transactions with descriptions, amounts, categories, and dates.
- Filter and search transactions by description, category, and date range.
- Visualize the data in a pie chart showing the expense breakdown by category.
- Toggle between dark and light modes.
- Export transaction data as a CSV file.
- Offline functionality through Service Workers (PWA support).

## Technologies Used

- **HTML5** for the structure of the web pages.
- **CSS** for styling (light and dark themes).
- **JavaScript** for interactive features, such as adding, editing, deleting, filtering, and exporting data.
- **Chart.js** for rendering pie charts based on the transaction data.
- **Service Workers** for offline functionality (PWA).
- **LocalStorage** for saving transaction data.

## Project Structure

```
/project-root
├── /styles
│   └── style.css
├── /js
│   ├── app.js
│   ├── chart.js
│   ├── csv.js
│   ├── scrript.js
│   ├── toggle.js
│   └── storage.js
├── index.html
├── manifest.json
├── sw.js
└── README.md
```

- **`index.html`**: Main HTML file containing the structure of the app.
- **`style.css`**: Styling file that includes light and dark themes.
- **`app.js`**: JavaScript for handling the app logic (adding, editing, filtering, chart rendering, etc.).
- **`chart.js`**: Script to handle the creation of the expense breakdown pie chart.
- **`storage.js`**: Handles saving and loading transaction data using LocalStorage.
- **`sw.js`**: Service Worker script for enabling offline functionality.
- **`manifest.json`**: Metadata for the Progressive Web App (PWA) functionality.
- **`README.md`**: Project description and instructions for running the app.

## Prerequisites

- A web browser (Google Chrome, Firefox, etc.) to run the application locally.
- An internet connection for the first load to fetch necessary assets.

## Running the Project Locally

1. **Clone the repository**:

   If you're starting from a repository, clone it to your local machine:

   ```bash
   git clone https://github.com/your-username/budget-tracker.git
   cd budget-tracker
   ```

2. **Open `index.html`**:

   You can open the `index.html` file directly in a web browser to view the app.

   Alternatively, if you want to serve the app using a local server (for Service Worker functionality), you can use the following:

   - For **Node.js**: Use a simple HTTP server like `http-server`:

     ```bash
     npm install -g http-server
     http-server
     ```

   - For **Python** (if you have Python installed):

     ```bash
     python -m http.server
     ```

   Then open your browser and visit `http://localhost:8080`.

3. **Enjoy the app**:

   Once opened, you can start using the app to add transactions, filter, toggle themes, and export data.

## Additional Features

- **Dark Mode**: Toggle between dark and light themes with the button at the top.
- **Export to CSV**: Click the "Export Data as CSV" button to download the transaction data as a `.csv` file.
- **PWA**: The app is a Progressive Web App (PWA), meaning it can work offline once cached by the service worker.

## Notes

- The data entered into the app is saved locally using **LocalStorage**, so it will persist even after a page refresh.
- The app is designed to work as a Progressive Web App (PWA), so you can install it on your device for an app-like experience.

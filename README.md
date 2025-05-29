# 💸 Expense Tracker App (React)

A simple, clean and expandable Expense Tracker built with React and Styled Components. The project is being developed step by step, with clear milestones and good practices in mind.

---

## 🚀 Live Demo

👉 [Soon on GitHub Pages]

---

## 📦 Stack

- **React 18** (with Vite)
- **Styled Components**
- **ThemeProvider & GlobalStyle**
- Persisting data with **LocalStorage**
- Coming soon: TypeScript, React Router, LocalStorage, Charts

---

<!-- ## 📁 Project Structure

src/
├── components/
│   ├── Card/
│   ├── Container/
│   ├── Header/
│   └── ExpenseForm/
├── features/
│   └── expenses/
│       ├── ExpenseItem/
│       ├── ExpenseList/
│       ├── ExpensesFilter/
│       │   ├── ExpensesFilter.jsx
│       │   └── ExpensesFilterStyles.jsx
│       └── useExpenses.js
├── styles/
│   ├── GlobalStyle.js
│   └── theme.js
├── utils/
├── App.jsx
├── main.jsx -->


## 📦 Versions

### v0.1 – Project Setup
- Initialized project with Vite
- Added Styled Components
- Added basic theming and GlobalStyle

### ✅ v0.2 – Layout and Base Components
- Created basic layout components: `Header`, `Container`, `Card`
- Integrated all components into `App.jsx`

### ✅ v0.3 – Expense List Layout & Dummy Data
- Created `ExpenseList` component
- Used dummy data for mock display
- Styled list using `styled-components`

### ✅ v0.4 – Split ExpenseItem
- Extracted `ExpenseItem` as a separate component
- Applied existing styles
- Improved structure for better scalability

### ✅ v0.5 - Add ExpenseForm Component
- Created `ExpenseForm` component with inputs for title, amount, and date
- Added basic validation (required fields, amount > 0)
- Integrated `ExpenseForm` in `App.jsx` with submission handler logging new expenses
- Styled the form using styled-components for better layout and UX

### ✅ v0.6 – Persist Expenses with LocalStorage
- Created custom `useExpenses` hook
- Persisted expenses in localStorage
- Initialized state from localStorage on page load
- Removed dummy data after successful implementation

### ✅ v0.7 – Filter Expenses by Year
- Added `ExpensesFilter` component with dropdown menu
- Users can now filter expenses by year or select "All" to show all
- Displayed a message if no expenses match selected year
- Styled filter UI with styled-components

### ✅ v0.8 – Polish UI & UX Improvements
- Improved empty state: clear message when no expenses are found
- Set today's date as default in the expense form (YYYY-MM-DD)
- Autofocus on Title input after submitting a new expense
- Validations and inputs polished for better usability
- Sort expenses by date in descending order (newest first) in the list 

### ✅ v0.9 – Responsive Design and UI Enhancements
- Improved responsiveness for filters and expense items on small screens
- Unified button styles with reusable styled components
- Added "Load Sample Data" button with styling

### ✅ v1.0 – Expense Editing Functionality (Current)
- Added edit button to each expense item
- Implemented edit mode in ExpenseForm with save and cancel options
- Added updateExpense function to update expenses and persist changes in LocalStorage
- Improved overall UX for editing and managing expenses

## 🛠️ How to run locally

```bash
git clone https://github.com/Dor-Ka/frontend-react-expense-tracker.git
cd frontend-react-expense-tracker
npm install
npm run dev

## 🧠 Author
Created with ❤️ by Dorota Karpińska
Part of a personal learning journey and frontend portfolio.

## 📝 License
MIT
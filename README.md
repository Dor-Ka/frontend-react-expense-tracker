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
- Coming soon: TypeScript, React Router, LocalStorage, Charts

---

## 📁 Project Structure

src/
├── components/
│ ├── Card/
│ ├── Container/
│ ├── Header/
│ └── ExpenseForm/
├── features/
│ └── expenses/
│ │ ├── ExpenseItem/
│ │ ├── ExpenseList/
│ │ └── dummyExpenses.js
├── styles/
│ ├── GlobalStyle.js
│ └── theme.js
├── utils/
├── App.jsx
├── main.jsx

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


## 📌 Features – Roadmap

This app will be built and improved step by step:

| Version | Feature                                            | Status     |
|---------|----------------------------------------------------|------------|
| v0.1    | Project setup, Styled Components, GlobalStyle      | ✅ Done    |
| v0.2    | Layout structure and reusable components           | ✅ Done    |
| v0.3    | UI mockup with fake data (static state)            | ✅ Done    |
| v0.4    | Add ExpenseForm component with validation          | ✅ Done    |
| v0.5    | Extract ExpenseItem component                      | ✅ Done    |
| v0.6    | Persist expenses in LocalStorage                   | ✅ Done    |
| v0.6    | Filter expenses by year                            | ✅ Done    |
| v0.8    | Polish UI, empty states, UX improvements           | ⏳ Soon    |
| v0.9    | Responsive design                                  | ⏳ Soon    |
| v1.0    | TypeScript refactor                                | ⏳ Planned |
| v1.1    | Deploy, finalize README & cleanup                  | ⏳ Planned |

---

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
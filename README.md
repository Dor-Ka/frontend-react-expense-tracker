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
│ └── ExpenseItem/
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

## 📌 Features – Roadmap

This app will be built and improved step by step:

| Version | Feature                                            | Status     |
|---------|----------------------------------------------------|------------|
| v0.1    | Project setup, Styled Components, GlobalStyle      | ✅ Done    |
| v0.2    | Layout structure and reusable components           | ✅ Done    |
| v0.3    | UI mockup with fake data (static state)            | ✅ Done    |
| v0.4    | Extract ExpenseItem component                      | ✅ Done    |
| v0.5    | Persist expenses in LocalStorage                   | ⏳ Soon    |
| v0.6    | Filter by category/date, basic chart               | ⏳ Soon    |
| v0.7    | Polish UI, empty states, UX improvements           | ⏳ Soon    |
| v0.8    | Responsive design                                  | ⏳ Soon    |
| v0.9    | TypeScript refactor                                | ⏳ Planned |
| v1.0    | Deploy, finalize README & cleanup                  | ⏳ Planned |

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
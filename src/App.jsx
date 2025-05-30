import { useState, useCallback } from "react";
import { useExpenses } from "./hooks/useExpenses";
import { useExpenseFilters } from "./hooks/useExpenseFilters";

import Header from "./components/Header/Header";
import Container from "./components/Container/Container";
import Card from "./components/Card/Card";
import ExpenseList from "./features/expenses/ExpenseList/ExpenseList";
import ExpenseForm from "./components/ExpenseForm/ExpenseForm";
import ExpensesFilters from "./features/expenses/ExpensesFilters/ExpensesFilters";
import { SampleButton } from "./components/StyledButton";

function App() {
  const { 
    expenses, 
    addExpense, 
    deleteExpense, 
    updateExpense, loadSampleExpenses 
  } = useExpenses();
  
  const {
    selectedYear,
    setSelectedYear,
    selectedCategory,
    setSelectedCategory,
    categories,
    filteredExpenses,
  } = useExpenseFilters(expenses);
  
  const [editingExpense, setEditingExpense] = useState(null);
  
  const handleEdit = useCallback((id) => {
    const expense = expenses.find(exp => exp.id === id);
    if (expense) {
      setEditingExpense(expense);
    }
  }, [expenses]);
  
  const handleSave = useCallback((updatedExpense) => {
    updateExpense(updatedExpense);
    setEditingExpense(null);
  }, [updateExpense]);

  return (
    <>
      <Header />
      <Container>
        <Card>
          <ExpenseForm
            onAddExpense={addExpense}
            expenseToEdit={editingExpense}
            onSaveExpense={handleSave}
            onCancelEdit={() => setEditingExpense(null)}
          />
        </Card>

        <SampleButton onClick={loadSampleExpenses}>Load Sample Expenses</SampleButton>

        <ExpensesFilters
          expenses={expenses}
          selectedYear={selectedYear}
          onChangeYear={setSelectedYear}
          selectedCategory={selectedCategory}
          onChangeCategory={setSelectedCategory}
          categories={categories}
        />

        <ExpenseList
          expenses={filteredExpenses}
          onDelete={deleteExpense}
          onEdit={handleEdit} 
          selectedYear={selectedYear}
          selectedCategory={selectedCategory}
        />
      </Container>
    </>
  );
}

export default App;

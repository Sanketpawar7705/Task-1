document.addEventListener('DOMContentLoaded', () => {
    const totalIncomeEl = document.getElementById('total-income');
    const totalExpensesEl = document.getElementById('total-expenses');
    const balanceEl = document.getElementById('balance');
    const budgetAmountEl = document.getElementById('budget-amount');
    
    const budgetInput = document.getElementById('budget-input');
    const setBudgetBtn = document.getElementById('set-budget');
    
    const transactionForm = document.getElementById('transaction-form');
    const descriptionInput = document.getElementById('description');
    const amountInput = document.getElementById('amount');
    const categorySelect = document.getElementById('category');
    const transactionList = document.getElementById('transaction-list');
    
    let transactions = JSON.parse(localStorage.getItem('transactions')) || [];
    let budget = localStorage.getItem('budget') || 0;
    
    const updateDashboard = () => {
      const totalIncome = transactions
        .filter(transaction => transaction.category === 'income')
        .reduce((acc, transaction) => acc + transaction.amount, 0);
      
      const totalExpenses = transactions
        .filter(transaction => transaction.category === 'expense')
        .reduce((acc, transaction) => acc + transaction.amount, 0);
      
      const balance = totalIncome - totalExpenses;
      
      totalIncomeEl.textContent = totalIncome;
      totalExpensesEl.textContent = totalExpenses;
      balanceEl.textContent = balance;
      budgetAmountEl.textContent = budget;
    };
    
    const addTransaction = (description, amount, category) => {
      transactions.push({ description, amount: parseFloat(amount), category });
      localStorage.setItem('transactions', JSON.stringify(transactions));
      renderTransactions();
      updateDashboard();
    };
    
    const renderTransactions = () => {
      transactionList.innerHTML = '';
      transactions.forEach((transaction, index) => {
        const transactionEl = document.createElement('li');
        transactionEl.textContent = `${transaction.description}: ${transaction.amount} (${transaction.category})`;
        transactionList.appendChild(transactionEl);
      });
    };
    
    transactionForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const description = descriptionInput.value;
      const amount = amountInput.value;
      const category = categorySelect.value;
      if (description && amount && category) {
        addTransaction(description, amount, category);
        descriptionInput.value = '';
        amountInput.value = '';
        categorySelect.value = 'income';
      }
    });
    
    setBudgetBtn.addEventListener('click', () => {
      budget = budgetInput.value;
      localStorage.setItem('budget', budget);
      updateDashboard();
      budgetInput.value = '';
    });
    
    renderTransactions();
    updateDashboard();
  });
  
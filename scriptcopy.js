'use strict';

let start = document.getElementById('start');
let incomePlus = document.getElementsByTagName('button')[0];
let expensesPlus = document.getElementsByTagName('button')[1];
let depositCheck = document.querySelector('#deposit-check');
let additionalIncomeItem = document.querySelectorAll('.additional_income-item');
let expensesItems = document.querySelectorAll('.expenses-items');
let budgetMonthValue = document.getElementsByClassName('budget_month-value')[0];
let budgetDayValue = document.getElementsByClassName('budget_day-value')[0];
let expensesMonthValue = document.getElementsByClassName('expenses_month-value')[0];
let additionalIncomeValue = document.getElementsByClassName('additional_income-value')[0];
let additionalExpensesValue = document.getElementsByClassName('additional_expenses-value')[0];
let incomePeriodValue = document.getElementsByClassName('income_period-value')[0];
let targetMonthValue = document.getElementsByClassName('target_month-value')[0];
let salaryAmount = document.querySelector('.salary-amount');
let additionalIncome = document.querySelector('.additional_income>[type="text"]');
let expenses = document.querySelector('.expenses>[type="text"]');
let additionalExpensesItem = document.querySelector('.additional_expenses-item');
let targetAmount = document.querySelector('.target-amount');
let periodSelect = document.querySelector('.period-select');
let incomeItems = document.querySelectorAll('.income-items');
let periodAmount = document.querySelector('.period-amount');
let inputBlock = document.querySelectorAll('input[type=text]');
let cancel = document.querySelector('#cancel');


class appData {
  constructor () {
    this.income = {};
    this.addIncome = [];
    this.incomeMonth = 0;
    this.expenses = {};
    this.addExpenses = [];
    this.deposit = false;
    this.persentDeposit = 0;
    this.moneyDeposit = 0;
    this.budget = 0;
    this.budgetDay = 0;
    this.budgetMonth = 0;
    this.expensesMonth = 0;
  }

    start () {
  
      document.querySelectorAll('input[type="text"]').forEach(item => item.disabled = true);
      this.budget = +salaryAmount.value;

      this.getExpenses();
      this.getIncome();
      this.getExpensesMonth();
      this.getAddExpenses();
      this.getAddIncome();
      this.getBudget();
      this.getPeriodAmount();
      this.getInfoDeposit();
      this.calcSavedMoney();
      this.showResult();
      }

   showResult () {
      budgetMonthValue.value = appData.budgetMonth;
      budgetDayValue.value = appData.budgetDay;
      expensesMonthValue.value = appData.expensesMonth;
      additionalExpensesValue.value = appData.addExpenses.join(', ');
      additionalIncomeValue.value = appData.addIncome.join(', ');
      targetMonthValue.value = Math.ceil(appData.getTargetMonth());
      periodSelect.addEventListener('input', this.showResult);
      
      incomePeriodValue.value = appData.calcSavedMoney();
   }

   addExpensesBlock () {

         let cloneExpensesItem = expensesItems[0].cloneNode(true);
         cloneExpensesItem.querySelectorAll('input').forEach(input => input.value = '');
         expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus);

         expensesItems = document.querySelectorAll('.expenses-items');
         if (expensesItems.length === 3){
            expensesPlus.style.display = 'none';
         }    
   }

   getExpenses () {
         expensesItems.forEach((item) => {
            let itemExpenses = item.querySelector('.expenses-title').value;
            let cashExpenses = item.querySelector('.expenses-amount').value;
            if (itemExpenses !== '' && cashExpenses !== ''){
                  this.expenses[itemExpenses] = cashExpenses;
            }
         });
   }

   addIncomeBlock () {

         let cloneIncomeItem = incomeItems[0].cloneNode(true);
         cloneIncomeItem.querySelectorAll('input').forEach(input => input.value = '');
         incomeItems[0].parentNode.insertBefore(cloneIncomeItem, incomePlus);

         incomeItems = document.querySelectorAll('.income-items');
         if (incomeItems.length === 3){
            incomePlus.style.display = 'none';
         }
   }

   getIncome () {
      incomeItems.forEach((item) =>{
            let itemIncome = item.querySelector('.income-title').value;
            let cashIncome = item.querySelector('.income-amount').value;
            if (itemIncome !== '' && cashIncome !== ''){
                  this.income[itemIncome] = cashIncome;
            }
            for (let key in appData.income){
                  appData.incomeMonth += +appData.income[key];
            }
      });
   }

   getAddExpenses () {
       let addExpenses = additionalExpensesItem.value.split(',');
       addExpenses.forEach((item) => {
             item = item.trim();
             if (item !== ''){
                   this.addExpenses.push(item);
             }
       });
   }

   getAddIncome () {
         additionalIncomeItem.forEach(function(item){
               let itemValue = item.value.trim();
               if (itemValue !== ''){
                     appData.addIncome.push(itemValue);
               }
         });
   }

  hiddenStart () {
    start.style.display = "none";
    cancel.style.display = "block";
  }

  hiddenCancel () {
    start.style.display = "block";
    cancel.style.display = "none";
  }


  getExpensesMonth () {
    let sum = 0;
    for (let key in this.expenses) {
      sum += +this.expenses[key];
    }
    this.expensesMonth = sum;
    return sum;
  }

  getBudget () {
  this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
  this.budgetDay = Math.floor(this.budgetMonth / 30);
  }

  getTargetMonth () {

    return targetAmount.value / this.budgetMonth;
  }

  getPeriodAmount () {
      periodAmount.textContent = periodSelect.value;
  }

  getSalaryMonthValue () {
        if (salaryAmount.value === '' || isNaN(salaryAmount.value) || salaryAmount.value === null){
          start.setAttribute("disabled", true);
    } else {
      start.removeAttribute("disabled");
    }
  }

  calcSavedMoney () {
    return this.budgetMonth * periodSelect.value;
  }

  reset () {
  inputBlock.forEach(function(item) {
      item.removeAttribute('disabled');
    });

  inputBlock.forEach(function(item) {
    item.value = '';
  });

  for (let i = 1; i < incomeItems.length; i++){
    if (i > 0) {
      incomeItems[i].remove(incomeItems[i]);
      incomePlus.style.display = 'block';
    }
  }

  for (let i = 1; i < expensesItems.length; i++){
    if (i > 0) {
      expensesItems[i].remove(incomeItems[i]);
      expensesPlus.style.display = 'block';
    }
  }

  periodSelect.value = '1';
  periodAmount.textContent = '1';
  start.setAttribute("disabled", "disabled");


  this.income = {};
  this.addIncome = [];
  this.incomeMonth = 0;
  this.expenses = {};
  this.addExpenses = [];
  this.deposit = false;
  this.persentDeposit = 0;
  this.moneyDeposit = 0;
  this.budget = 0;
  this.budgetDay = 0;
  this.budgetMonth = 0;
  this.expensesMonth = 0;
  }

}

start.addEventListener('click', appData.hiddenStart);

salaryAmount.addEventListener('input', appData.getSalaryMonthValue);

expensesPlus.addEventListener('click', appData.addExpensesBlock);

incomePlus.addEventListener('click', appData.addIncomeBlock);

periodSelect.addEventListener('input', appData.getPeriodAmount);

cancel.addEventListener('click', appData.reset);

cancel.addEventListener('click', appData.hiddenCancel);
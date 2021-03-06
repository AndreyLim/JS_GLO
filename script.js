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

const AppData = function() {
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
};

AppData.prototype.start = function () {
      
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
};

AppData.prototype.showResult = function(){
   budgetMonthValue.value = this.budgetMonth;
   budgetDayValue.value = this.budgetDay;
   expensesMonthValue.value = this.expensesMonth;
   additionalExpensesValue.value = this.addExpenses.join(', ');
   additionalIncomeValue.value = this.addIncome.join(', ');
   targetMonthValue.value = Math.ceil(this.getTargetMonth());
   periodSelect.addEventListener('input', this.showResult);
   
   incomePeriodValue.value = this.calcSavedMoney();
};

AppData.prototype.addExpensesBlock = function(){
      let cloneExpensesItem = expensesItems[0].cloneNode(true);
      cloneExpensesItem.querySelectorAll('input').forEach(input => input.value = '');
      expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus);
      expensesItems = document.querySelectorAll('.expenses-items');
      if (expensesItems.length === 3){
         expensesPlus.style.display = 'none';
      }
      
};

AppData.prototype.getExpenses = function(){
  let _this = this;
      expensesItems.forEach(function(item){
         let itemExpenses = item.querySelector('.expenses-title').value;
         let cashExpenses = item.querySelector('.expenses-amount').value;
         if (itemExpenses !== '' && cashExpenses !== ''){
               _this.expenses[itemExpenses] = cashExpenses;
         }
      });
};

AppData.prototype.addIncomeBlock = function(){
      let cloneIncomeItem = incomeItems[0].cloneNode(true);
      cloneIncomeItem.querySelectorAll('input').forEach(input => input.value = '');
      incomeItems[0].parentNode.insertBefore(cloneIncomeItem, incomePlus);
      incomeItems = document.querySelectorAll('.income-items');
      if (incomeItems.length === 3){
         incomePlus.style.display = 'none';
      }
      
};

AppData.prototype.getIncome = function(){
  let _this = this;
   incomeItems.forEach(function(item){
         let itemIncome = item.querySelector('.income-title').value;
         let cashIncome = item.querySelector('.income-amount').value;
         if (itemIncome !== '' && cashIncome !== ''){
               _this.income[itemIncome] = cashIncome;
         }
         for (let key in _this.income){
               _this.incomeMonth += +_this.income[key];
         }
   });
};

AppData.prototype.getAddExpenses = function(){
    let _this = this;
    let addExpenses = additionalExpensesItem.value.split(',');
    addExpenses.forEach(function(item){
        item = item.trim();
        if (item !== ''){
              _this.addExpenses.push(item);
        }
    });
};

AppData.prototype.getAddIncome = function(){
    let _this = this;
    additionalIncomeItem.forEach(function(item){
          let itemValue = item.value.trim();
          if (itemValue !== ''){
                _this.addIncome.push(itemValue);
          }
    });
};

AppData.prototype.hiddenStart = function() {
  start.style.display = "none";
  cancel.style.display = "block";
};

AppData.prototype.hiddenCancel = function() {
  start.style.display = "block";
  cancel.style.display = "none";
};

AppData.prototype.getExpensesMonth = function() {
  let sum = 0;
  for (let key in this.expenses) {
    sum += +this.expenses[key];
  }
  this.expensesMonth = sum;
  return sum;
};

AppData.prototype.getBudget = function () {
this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
this.budgetDay = Math.floor(this.budgetMonth / 30);
};

/*
AppData.prototype.getStatusIncome = function () {
  if (appData.budgetDay > 1200) {
    console.log('У вас высокий уровень дохода');
  } else if (600 < (appData.budgetDay <= 1200)) {
    console.log('У вас средний уровень дохода');
  } else if (0 < (appData.budgetDay <= 600)) {
    console.log('К сожалению у вас уровень дохода ниже среднего');
  } else if ((appData.budgetDay <= 0)) {
    console.log('Что то пошло не так');
  }
};
*/

AppData.prototype.getTargetMonth = function () {
  return targetAmount.value / this.budgetMonth;
};

AppData.prototype.getPeriodAmount = function(){
    periodAmount.textContent = periodSelect.value;
};

AppData.prototype.getInfoDeposit = function(){
  if(this.deposit){
    let persentDeposit;
    do {
      persentDeposit = prompt('Какой годовой процент?');
    } while (isNaN(persentDeposit) || persentDeposit === '' || persentDeposit === null);
    this.persentDeposit = persentDeposit;
    let moneyDeposit;
    do {
      moneyDeposit = prompt('Какая сумма заложена?');
    } while (isNaN(moneyDeposit) || moneyDeposit === '' || moneyDeposit === null);
    this.moneyDeposit = moneyDeposit;
  }
};

AppData.prototype.getSalaryMonthValue = function(){
      if (salaryAmount.value === '' || isNaN(salaryAmount.value) || salaryAmount.value === null){
        start.setAttribute("disabled", true);
  } else {
    start.removeAttribute("disabled");
  }
};

AppData.prototype.calcSavedMoney = function(){
  return this.budgetMonth * periodSelect.value;
};

AppData.prototype.reset = function() {
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
};


AppData.prototype.eventsListeners = function() {

start.addEventListener('click', appData.hiddenStart.bind(appData));
start.addEventListener('click', appData.start.bind(appData));
salaryAmount.addEventListener('input', appData.getSalaryMonthValue.bind(appData));
expensesPlus.addEventListener('click', appData.addExpensesBlock.bind(appData));
incomePlus.addEventListener('click', appData.addIncomeBlock.bind(appData));
periodSelect.addEventListener('input', appData.getPeriodAmount.bind(appData));
cancel.addEventListener('click', appData.reset.bind(appData));
cancel.addEventListener('click', appData.hiddenCancel.bind(appData));

};

const appData = new AppData();

appData.eventsListeners();




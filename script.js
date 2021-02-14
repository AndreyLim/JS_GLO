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


let appData = {
  income: {},
  addIncome: [],
  incomeMonth: 0,
  expenses: {},
  addExpenses: [],
  deposit: false,
  persentDeposit: 0,
  moneyDeposit: 0,
  budget: 0,
  budgetDay: 0,
  budgetMonth: 0,
  expensesMonth: 0,
  start: function () {

            appData.budget = +salaryAmount.value;

            appData.getExpenses();
            appData.getIncome();
            appData.getExpensesMonth();
            appData.getAddExpenses();
            appData.getAddIncome();
            appData.getBudget();
            appData.getPeriodAmount();
            // appData.getInfoDeposit();
            // appData.calcSavedMoney();

            appData.showResult();

      },

   showResult: function(){
      budgetMonthValue.value = appData.budgetMonth;
      budgetDayValue.value = appData.budgetDay;
      expensesMonthValue.value = appData.expensesMonth;
      additionalExpensesValue.value = appData.addExpenses.join(', ');
      additionalIncomeValue.value = appData.addIncome.join(', ');
      targetMonthValue.value = Math.ceil(appData.getTargetMonth());
      periodSelect.addEventListener('input', appData.showResult);
      
      incomePeriodValue.value = appData.calcSavedMoney();
   },

   addExpensesBlock: function(){

         let cloneExpensesItem = expensesItems[0].cloneNode(true);
         expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus);
         expensesItems = document.querySelectorAll('.expenses-items');
         if (expensesItems.length === 3){
            expensesPlus.style.display = 'none';
         }
   },

   getExpenses: function(){
         expensesItems.forEach(function(item){
            let itemExpenses = item.querySelector('.expenses-title').value;
            let cashExpenses = item.querySelector('.expenses-amount').value;
            if (itemExpenses !== '' && cashExpenses !== ''){
                  appData.expenses[itemExpenses] = cashExpenses;
            }
         });
   },

   addIncomeBlock: function(){

         let cloneIncomeItem = incomeItems[0].cloneNode(true);
         incomeItems[0].parentNode.insertBefore(cloneIncomeItem, incomePlus);
         incomeItems = document.querySelectorAll('.income-items');
         if (incomeItems.length === 3){
            incomePlus.style.display = 'none';
         }
   },

   getIncome: function(){
      incomeItems.forEach(function(item){
            let itemIncome = item.querySelector('.income-title').value;
            let cashIncome = item.querySelector('.income-amount').value;
            if (itemIncome !== '' && cashIncome !== ''){
                  appData.income[itemIncome] = cashIncome;
            }
            for (let key in appData.income){
                  appData.incomeMonth += +appData.income[key];
            }
      });
   },

   getAddExpenses: function(){
       let addExpenses = additionalExpensesItem.value.split(',');
       addExpenses.forEach(function(item){
             item = item.trim();
             if (item !== ''){
                   appData.addExpenses.push(item);
             }
       });
   },

   getAddIncome(){
         additionalIncomeItem.forEach(function(item){
               let itemValue = item.value.trim();
               if (itemValue !== ''){
                     appData.addIncome.push(itemValue);
               }
         });
   },

  getExpensesMonth: function() {
    let sum = 0;
    for (let key in appData.expenses) {
      sum += +appData.expenses[key];
    }
    appData.expensesMonth = sum;
    return sum;
  },

  getBudget: function () {
  appData.budgetMonth = appData.budget + appData.incomeMonth - appData.expensesMonth;
  appData.budgetDay = Math.floor(appData.budgetMonth / 30);
  },


  getStatusIncome: function () {
    if (appData.budgetDay > 1200) {
      console.log('У вас высокий уровень дохода');

    } else if (600 < (appData.budgetDay <= 1200)) {
      console.log('У вас средний уровень дохода');

    } else if (0 < (appData.budgetDay <= 600)) {
      console.log('К сожалению у вас уровень дохода ниже среднего');

    } else if ((appData.budgetDay <= 0)) {
      console.log('Что то пошло не так');
    }
    },

  getTargetMonth: function () {

    return targetAmount.value / appData.budgetMonth;
  },

  getPeriodAmount: function(){
      periodAmount.textContent = periodSelect.value;
  },

  getInfoDeposit: function(){
    if(appData.deposit){
      let persentDeposit;
      do {
        persentDeposit = prompt('Какой годовой процент?');
      } while (isNaN(persentDeposit) || persentDeposit === '' || persentDeposit === null);
      appData.persentDeposit = persentDeposit;

      let moneyDeposit;
      do {
        moneyDeposit = prompt('Какая сумма заложена?');
      } while (isNaN(moneyDeposit) || moneyDeposit === '' || moneyDeposit === null);
      appData.moneyDeposit = moneyDeposit;
    }
  },

  getStartStop: function(){
      if (salaryAmount.value === '' || salaryAmount.value === null || isNaN(salaryAmount.value)){
            alert('Введите корректные данные в поле ввода "Месячный доход"!');
            return false;
      }

  },

  calcSavedMoney: function(){
    return appData.budgetMonth * periodSelect.value;
  }
};

start.addEventListener('click', appData.start);

start.addEventListener('click', appData.getStartStop);

expensesPlus.addEventListener('click', appData.addExpensesBlock);

incomePlus.addEventListener('click', appData.addIncomeBlock);

periodSelect.addEventListener('input', appData.getPeriodAmount);




// let expensesMonth = appData.getExpensesMonth();
// let budgetMonth = appData.getBudget();

// let getStatusIncome = appData.getStatusIncome();
// let getTargetMonth = appData.getTargetMonth();

// appData.addExpenses = appData.addExpenses.map(item => item.toString().charAt(0).toUpperCase() + item.slice(1));
// console.log(appData.addExpenses.join(', '));

// for (let key in appData) {
//       console.log('Наша программа включает в себя данные:' + key + appData[key]);
//     }

      // if (salaryAmount.value === ''){
      //       alert('Ошибка, поле "Месячный доход" должно быть заполнено!');
      //       return;
      // }
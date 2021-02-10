'use strict';

let money,
    start = function () {
      do {
        money = +prompt('Ваш месячный доход?', 40000);
      }
      while (isNaN(parseFloat(money)));

};

start();

let appData = {
  income: {},
  addIncome: [],
  expenses: {},
  addExpenses: [],
  deposit: false,
  persentDeposit: 0,
  moneyDeposit: 0,
  mission: 100000,
  period: 0,
  budget: money,
  budgetDay: 0,
  budgetMonth: 0,
  expensesMonth: 0,
  asking: function(){

    if (confirm('Есть ли у вас дополнительный источник заработка?')){
        let itemIncome
        do {
          itemIncome = prompt('Какой у вас дополнительный заработок?');
        } while (!isNaN(itemIncome) || itemIncome === null);
        let cashIncome
        do {
          cashIncome = prompt('Сколько в мес яц вы на этом зарабатываете?');
        } while (isNaN(cashIncome) || cashIncome === '' || cashIncome === null);

        appData.income[itemIncome] = cashIncome;
    }

    let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую', 'интернет,кварплата,кредит');
        appData.addExpenses = addExpenses.toLowerCase().split(',');
        appData.deposit = confirm('Есть ли у вас депозит в банке?');

    for (let i = 0; i < 2; i++) {
        let itemExpenses
        do {
          itemExpenses = prompt('Введите обязательную статью расходов?');
        } while (!isNaN(itemExpenses) || itemExpenses === null);

        let cashExpenses
        do {
            cashExpenses = +prompt('Во сколько это обойдется?');
        }
        while (isNaN(cashExpenses) || cashExpenses === '' || cashExpenses === null);

        appData.expenses[itemExpenses] = cashExpenses;
    }
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
  appData.budgetMonth = appData.budget - appData.expensesMonth;
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

    appData.period = Math.ceil(appData.mission / appData.budgetMonth);

    if (appData.period < 0) {
      console.log('Цель не будет достигнута');
    } else {
      console.log('Цель будет достигнута через ' + appData.period + ' месяца(-ев)');
    }

    return appData.period;
    },

  getInfoDeposit: function(){
    if(appData.deposit){
      let persentDeposit
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

  calcSavedMoney: function(){
    return appData.budgetMonth * appData.period;
  }
};

appData.asking();
appData.getInfoDeposit();
appData.calcSavedMoney();
let expensesMonth = appData.getExpensesMonth();
let budgetMonth = appData.getBudget();

let getStatusIncome = appData.getStatusIncome();
let getTargetMonth = appData.getTargetMonth();

console.log(appData);
console.log('Расходы за месяц: ' + appData.expensesMonth);

appData.addExpenses = appData.addExpenses.map(item => item.toString().charAt(0).toUpperCase() + item.slice(1));
console.log(appData.addExpenses.join(', '));

for (let key in appData) {
      console.log('Наша программа включает в себя данные:' + key + appData[key]);
    }

const score = document.getElementById('start');
console.log(score);

const plusIncome = document.getElementsByTagName('button')[0];
console.log(plusIncome);

const plusExpenses = document.getElementsByTagName('button')[1];
console.log(plusExpenses);

const check = document.querySelector('#deposit-check');
console.log(check);

const placeIncome = document.querySelectorAll('.additional_income-item');
console.log(placeIncome);

const incomeAmount = document.getElementsByClassName('income-amount');
console.log(incomeAmount);

const expensesAmount = document.getElementsByClassName('expenses-amount');
console.log(expensesAmount);

const dayValue = document.getElementsByClassName('budget_day-value');
console.log(dayValue);

const monthValue = document.getElementsByClassName('expenses_month-value');
console.log(monthValue);

const incomeValue = document.getElementsByClassName('additional_income-value');
console.log(incomeValue);

const expensesValue = document.getElementsByClassName('additional_expenses-value');
console.log(expensesValue);

const periodValue = document.getElementsByClassName('income_period-value');
console.log(periodValue);

const targetValue = document.getElementsByClassName('target_month-value');
console.log(targetValue);

const salaryAmount = document.querySelector('.salary-amount');
console.log(salaryAmount);

const incomeTitle = document.querySelector('.additional_income>[type="text"]');
console.log(incomeTitle);

const expensesTitle = document.querySelector('.expenses>[type="text"]');
console.log(expensesTitle);

const additionalExpensesItem = document.querySelector('.additional_expenses-item');
console.log(additionalExpensesItem);

const targetAmount = document.querySelector('.target-amount');
console.log(targetAmount);

const periodSelect = document.querySelector('.period-select');
console.log(periodSelect);

const budgetMonthValue = document.querySelector('.budget_month-value');
console.log(budgetMonthValue);
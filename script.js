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
  mission: 100000,
  period: 0,
  budget: money,
  budgetDay: 0,
  budgetMonth: 0,
  expensesMonth: 0,
  asking: function(){
    let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую', 'Интерент, Кварплата');
        appData.addExpenses = addExpenses.toLowerCase().split(',');
        appData.deposit = confirm('Есть ли у вас депозит в банке?');
  },

  getExpensesMonth: function() {
    let sum = 0;
    for (let i = 0; i < 2; i++) {
    if (i === 0) {
      appData.expenses[0] = prompt('Введите обязательную статью расходов?', 'Интернет');

    } else if (i === 1) {
      appData.expenses[1] = prompt('Введите обязательную статью расходов?',  'Кварплата');
    }
    do {
      sum += +prompt('Во сколько это обойдется?');
    }
    while (isNaN(sum) || sum === null);
    }
  appData.expensesMonth = sum;
  return sum;
  },


  getAccumulatedMonth: function () {
  appData.budgetMonth = appData.budget - appData.expensesMonth;
  return appData.budgetMonth;
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

    if (appData.period < 0) {
      console.log('Цель не будет достигнута');
    } else {
      console.log('Цель будет достигнута' );
    }

    appData.period = Math.ceil(appData.mission / appData.budgetMonth);
    return appData.period;
    }
};


let addExpenses = appData.asking();
let expensesMonth = appData.getExpensesMonth();
let budgetMonth = appData.getAccumulatedMonth();
appData.budgetDay = Math.floor(appData.budgetMonth / 30);
let getStatusIncome = appData.getStatusIncome();
let getTargetMonth = appData.getTargetMonth();



console.log('Расходы за месяц: ' + appData.expensesMonth);
console.log(appData.budgetDay);
console.log('Цель будет достигнута через ' + appData.period + ' месяца(-ев)');
console.log(appData);
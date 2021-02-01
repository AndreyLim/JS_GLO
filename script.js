'use strict';

let money = prompt('Ваш месячный доход?'); 
let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
let deposit = confirm('Есть ли у вас депозит в банке?');
let expenses1 = prompt('Введите обязательную статью расходов?');
let amount1 = prompt('Во сколько это обойдется?');
let expenses2 = prompt('Введите обязательную статью расходов?');
let amount2 = prompt('Во сколько это обойдется?');
let budgetMonth = money - amount1 - amount2;
console.log(budgetMonth);
let missionTime = Math.ceil(300000 / budgetMonth);
console.log(missionTime);
let budgetDay = Math.floor(budgetMonth / 30);
console.log(budgetDay);
if (budgetDay > 1200) {
  console.log('У вас высокий уровень дохода');
} else if (600 < budgetDay <= 1200) {
  console.log('У вас средний уровень дохода');
} else if (0 < budgetDay <= 600) {
  console.log('К сожалению у вас уровень дохода ниже среднего');
} else if (budgetDay <= 0) {
  console.log('Что то пошло не так');
}
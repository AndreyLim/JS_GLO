'use strict';

let money;
let expenses1;
let expenses2;
let amount1;
let amount2;

do {
  money = prompt('Ваш месячный доход?');
}
  while(isNaN(parseFloat(money)));


let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
let deposit = confirm('Есть ли у вас депозит в банке?');


let getExpensesMonth = function() {
  let sum = 0;

  for(let i = 0; i < 2; i++) {

    if (i===0) {
      expenses1 = prompt('Введите обязательную статью расходов?');
      
    } else if (i === 1) {
      expenses2 = prompt('Введите обязательную статью расходов?');
    }
    
    do {
      sum = +prompt('Во сколько это обойдется?');
    }
      while(isNaN(sum) || sum.trim() === '' || sum === null);
  } 

  console.log(sum);
  return sum;
};

let expensesAmount = getExpensesMonth();



let showTypeOf = function(data){
  console.log(data, typeof(data));
};
showTypeOf(money);
showTypeOf(deposit);



console.log(expensesAmount);

const getAccumulatedMonth = function (a, b){
  return a - b;
};
getAccumulatedMonth(+money, expensesAmount());

let accumulatedMonth = getAccumulatedMonth(+money, expensesAmount());

let budgetDay = Math.floor(accumulatedMonth / 30);
console.log(budgetDay);

let getStatusIncome = function(){
if (budgetDay > 1200) {
  console.log('У вас высокий уровень дохода');
} else if (600 < budgetDay <= 1200) {
  console.log('У вас средний уровень дохода');
} else if (0 < budgetDay <= 600) {
  console.log('К сожалению у вас уровень дохода ниже среднего');
} else if (budgetDay <= 0) {
  console.log('Что то пошло не так');
}
};

const getTargetMonth = function(a, b){
return a / b;
};
console.log(getTargetMonth(300000, accumulatedMonth));


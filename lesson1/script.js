let money = 40000; 
let income = 'фриланс'; 
let addExpenses = 'Коммуналка, Интернет, Аренда репточки, Кредит'; 
let deposit = 1; 
let mission = 300000; 
let period = 6;

console.log(typeof money);
console.log(typeof income);
console.log(typeof deposit);

console.log(addExpenses.length);

console.log('Период равен ' + period + ' месяцев');
console.log('Цель заработать ' + mission + ' рублей');

let addExpensesLow = addExpenses.toLowerCase();
console.log(addExpensesLow.split(', '));

let budgetDay = money/30;
console.log(budgetDay);
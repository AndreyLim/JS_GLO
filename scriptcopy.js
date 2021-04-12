'use strict';

const start = document.getElementById('start'),
      incomePlus = document.getElementsByTagName('button')[0],
      expensesPlus = document.getElementsByTagName('button')[1],
      depositCheck = document.querySelector('#deposit-check'),
      additionalIncomeItem = document.querySelectorAll('.additional_income-item'),
      budgetMonthValue = document.getElementsByClassName('budget_month-value')[0],
      budgetDayValue = document.getElementsByClassName('budget_day-value')[0],
      expensesMonthValue = document.getElementsByClassName('expenses_month-value')[0],
      additionalIncomeValue = document.getElementsByClassName('additional_income-value')[0],
      additionalExpensesValue = document.getElementsByClassName('additional_expenses-value')[0],
      incomePeriodValue = document.getElementsByClassName('income_period-value')[0],
      targetMonthValue = document.getElementsByClassName('target_month-value')[0],
      salaryAmount = document.querySelector('.salary-amount'),
      additionalIncome = document.querySelector('.additional_income>[type="text"]'),
      expenses = document.querySelector('.expenses>[type="text"]'),
      additionalExpensesItem = document.querySelector('.additional_expenses-item'),
      targetAmount = document.querySelector('.target-amount'),
      periodSelect = document.querySelector('.period-select'),
      periodAmount = document.querySelector('.period-amount'),
      inputBlock = document.querySelectorAll('input[type=text]'),
      cancel = document.querySelector('#cancel'),
      depositBank = document.querySelector('.deposit-bank'),
      depositAmount = document.querySelector('.deposit-amount'),
      depositPercent = document.querySelector('.deposit-percent');


let expensesItems = document.querySelectorAll('.expenses-items'),
    incomeItems = document.querySelectorAll('.income-items');


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

    start() {
  
      document.querySelectorAll('input[type="text"]').forEach(item => item.disabled = true);
      this.budget = +salaryAmount.value;

      this.getExpenses();
      this.getIncome();
      this.getExpensesMonth();
      this.getAddExpenses();
      this.getAddIncome();
      this.getInfoDeposit();
      this.getBudget();
      this.getTargetMonth()
      this.getPeriodAmount();
      this.calcSavedMoney();
      this.showResult();
      }

   showResult() {
      budgetMonthValue.value = this.budgetMonth;
      budgetDayValue.value = this.budgetDay;
      expensesMonthValue.value = this.expensesMonth;
      additionalExpensesValue.value = this.addExpenses.join(', ');
      additionalIncomeValue.value = this.addIncome.join(', ');
      targetMonthValue.value = this.getTargetMonth();
      periodSelect.addEventListener('input', this.showResult);
      
      incomePeriodValue.value = this.calcSavedMoney;
   }

   addExpensesBlock() {

         let cloneExpensesItem = expensesItems[0].cloneNode(true);
         cloneExpensesItem.querySelectorAll('input').forEach(input => input.value = '');
         expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus);

         expensesItems = document.querySelectorAll('.expenses-items');
         if (expensesItems.length === 3){
            expensesPlus.style.display = 'none';
         }    
   }

   getExpenses() {
         expensesItems.forEach((item) => {
            let itemExpenses = item.querySelector('.expenses-title').value;
            let cashExpenses = item.querySelector('.expenses-amount').value;
            if (itemExpenses !== '' && cashExpenses !== ''){
                  this.expenses[itemExpenses] = cashExpenses;
            }
         });
   }

   addIncomeBlock() {

         let cloneIncomeItem = incomeItems[0].cloneNode(true);
         cloneIncomeItem.querySelectorAll('input').forEach(input => input.value = '');
         incomeItems[0].parentNode.insertBefore(cloneIncomeItem, incomePlus);

         incomeItems = document.querySelectorAll('.income-items');
         if (incomeItems.length === 3){
            incomePlus.style.display = 'none';
         }
   }

   getIncome() {
      incomeItems.forEach((item) =>{
            let itemIncome = item.querySelector('.income-title').value;
            let cashIncome = item.querySelector('.income-amount').value;
            if (itemIncome !== '' && cashIncome !== ''){
                  this.income[itemIncome] = cashIncome;
            }
            for (let key in this.income){
                  this.incomeMonth += +this.income[key];
            }
      });
   }

   getAddExpenses() {
       let addExpenses = additionalExpensesItem.value.split(',');
       addExpenses.forEach((item) => {
             item = item.trim();
             if (item !== ''){
                   this.addExpenses.push(item);
             }
       });
   }

   getAddIncome() {
         additionalIncomeItem.forEach(function(item){
               let itemValue = item.value.trim();
               if (itemValue !== ''){
                     this.addIncome.push(itemValue);
               }
         });
   }

  hiddenStart() {
    start.style.display = "none";
    cancel.style.display = "block";
  }

  hiddenCancel() {
    start.style.display = "block";
    cancel.style.display = "none";
  }


  getExpensesMonth() {
    let sum = 0;
    for (let key in this.expenses) {
      sum += +this.expenses[key];
    }
    this.expensesMonth = sum;
    return sum;
  }

  getBudget() {
  this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
  this.budgetDay = Math.floor(this.budgetMonth / 30);
  }

  getTargetMonth() {

    return Math.ceil(targetAmount.value / this.budgetMonth);
  }

  getPeriodAmount() {
      periodAmount.textContent = periodSelect.value;
  }

  getSalaryMonthValue() {
        if (salaryAmount.value === '' || isNaN(salaryAmount.value) || salaryAmount.value === null){
          start.setAttribute("disabled", true);
    } else {
      start.removeAttribute("disabled");
    }
  }

  calcSavedMoney() {
    return this.budgetMonth * periodSelect.value;
  }

  reset() {
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

  getInfoDeposit() {
    if (this.deposit) {
      this.persentDeposit = depositPercent.value;
      this.moneyDeposit = depositAmount
    }
  }

  depositHandler() {
    if (depositCheck.checked) {
      depositBank.style.display = 'inline-block';
      depositAmount.style.display = 'inline-block';
      this.deposit = true;
    } else {
      depositBank.style.display = 'none';
      depositAmount.style.display = 'none';
      depositBank.value = '';
      depositAmount.value = '';
      this.deposit = false;
    }
  }



  eventsListeners() {
    start.addEventListener('click', this.hiddenStart);

    salaryAmount.addEventListener('input', this.getSalaryMonthValue);

    expensesPlus.addEventListener('click', this.addExpensesBlock);

    incomePlus.addEventListener('click', this.addIncomeBlock);

    periodSelect.addEventListener('input', this.getPeriodAmount);

    cancel.addEventListener('click', this.reset);

    cancel.addEventListener('click', this.hiddenCancel);

    depositCheck.addEventListener('change', this.depositHandler.bind(this));
    }
}
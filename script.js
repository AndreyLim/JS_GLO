const book = document.querySelectorAll('aside>.book');
      bodyPicture = document.querySelector('body');
      editTitle = document.querySelectorAll('h2');
      advertising = document.querySelector('.adv');
      editBook = document.querySelectorAll('aside>.book>ul');
      editBookList = document.querySelectorAll('aside>.book>ul>li');



console.log(book);
console.log(editTitle);
console.log(editBook);
console.log(editBookList);

book[0].before(book[1]);
book[3].before(book[4]);
book[5].after(book[2]);

bodyPicture.setAttribute('style', 'background-image:url(./image/you-dont-know-js.jpg)');

editTitle[4].innerHTML = '<a href="https://github.com/azat-io/you-dont-know-js-ru/blob/master/this%20%26%20object%20prototypes/README.md#you-dont-know-js-this--object-prototypes"target="_blank">Книга 3. this и Прототипы Объектов</a>';

advertising.remove();

editBookList[9].after(editBookList[2]);
editBookList[9].before(editBookList[7]);
editBookList[7].before(editBookList[4]);
editBookList[7].before(editBookList[5]);
editBookList[48].before(editBookList[55]);
editBookList[51].before(editBookList[48]);
editBookList[54].before(editBookList[51]);

const newElemList = document.createElement('li');
newElemList.textContent = 'Глава 8: За пределами ES6';
editBook[2].append(newElemList);
editBook[2].append(editBookList[26]);


console.log(book);
console.log(editTitle);
console.log(editBook);
console.log(editBookList);
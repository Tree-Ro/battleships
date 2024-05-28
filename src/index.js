import './style.css';

console.log('hello, world.');

//Arrow func should be transpiled
let a = () => {
  console.log(a, 'Did this get transpiled by babel?');
};
a();

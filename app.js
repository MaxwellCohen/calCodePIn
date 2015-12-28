'strict mode';
var eqString = '';
var $answer;
var $liveAns;
var canAddDecemal = true;
var parser = math.parser();
var reset = false;
$answer = document.getElementById('answer');
$liveAns = document.getElementById('liveAns');

//settings for math js
math.config({
  number: 'bignumber', // set to bignumber so .1+.1+.1 will equal 1
  precision: 64 // Number of significant digits for BigNumbers
});

var addDecemal = function addDecemal() {
  if (canAddDecemal) {
    eqString += '.';
  }

  canAddDecemal = false;
  render();
};

var render = function render() {
  $answer.innerHTML = eqString;
  if (eqString !== '') {
    try {
      $liveAns.innerHTML = parser.eval(eqString).toString();
    } catch (e) {
      $liveAns.innerHTML = 'invalid equation';
    }
  } else {
    $liveAns.innerHTML = '';
  }
};

var addNumber = function addNumber(n) {
  resetstring();
  eqString += '' + n;
  render();
};

var addOperator = function addOperator(operator) {
  resetstring();
  canAddDecemal = true;
  var operatorString = '(+-*/';
  var lastItem = eqString.slice(-1);
  eqString += operator;
  render();
};

var clearScreen = function clearScreen() {
  resetstring();
  eqString = '';
  render();
};

var backSpace = function backSpace() {
  resetstring();
  if (eqString.length > 0) {
    eqString = eqString.substr(0, eqString.length - 1);
  }
  render();
};
var resetstring = function resetstring() {
  if (reset) {
    eqString = '';
    reset = false;
  }
};

var equalSign = function equalSign() {
  try {
    eqString = parser.eval(eqString).toString();
  } catch (e) {
    eqString = 'invalid equation';
    reset = true;
  }
  $liveAns.innerHTML = '';
  $answer.innerHTML = eqString;
};
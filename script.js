const display = document.querySelector('#display');
let expression = '';

function updateDisplay() {
  display.value = expression || '0';
}

function calculate() {
  if (!expression) return;

  try {
    // Only calculator characters are accepted from the buttons and keyboard.
    if (!/^[0-9+\-*/.\s]+$/.test(expression)) throw new Error('Invalid expression');
    const result = Function(`"use strict"; return (${expression})`)();
    if (!Number.isFinite(result)) throw new Error('Invalid result');
    expression = String(Number(result.toFixed(10)));
  } catch {
    expression = '';
    display.value = 'Error';
  }
  updateDisplay();
}

document.querySelector('.buttons').addEventListener('click', (event) => {
  const button = event.target.closest('button');
  if (!button) return;

  const { value, action } = button.dataset;
  if (action === 'clear') expression = '';
  else if (action === 'delete') expression = expression.slice(0, -1);
  else if (action === 'calculate') calculate();
  else if (value) expression += value;

  updateDisplay();
});

document.addEventListener('keydown', (event) => {
  if (/^[0-9.+\-*/]$/.test(event.key)) expression += event.key;
  else if (event.key === 'Enter' || event.key === '=') calculate();
  else if (event.key === 'Backspace') expression = expression.slice(0, -1);
  else if (event.key === 'Escape') expression = '';
  else return;

  event.preventDefault();
  updateDisplay();
});

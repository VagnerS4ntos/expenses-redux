export const months = [
  'Janeiro',
  'Fevereiro',
  'Março',
  'Abril',
  'Maio',
  'Junho',
  'Julho',
  'Agosto',
  'Setembro',
  'Outubro',
  'Novembro',
  'Dezembro',
];

export function getNewDate(year, indexMonth) {
  const newDate = new Date(year, indexMonth);
  return newDate;
}

export function validateExpenseValue(value, type) {
  let validValue = 0;
  if (type === 'expense' && value > 0) {
    validValue = -1 * Number(value);
  } else if (type === 'income' && value < 0) {
    validValue = -1 * Number(value);
  } else {
    validValue = value;
  }
  return Number(validValue);
}

export function convertToMoney(value) {
  return Number(value).toLocaleString('pt-br', {
    style: 'currency',
    currency: 'BRL',
  });
}

export const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    );
};

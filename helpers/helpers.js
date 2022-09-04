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
  if (type === 'saída' && value > 0) {
    validValue = -1 * Number(value);
  } else if (type === 'entrada' && value < 0) {
    validValue = -1 * Number(value);
  } else {
    validValue = value;
  }
  return validValue;
}

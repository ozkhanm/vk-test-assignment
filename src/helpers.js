export const getValueByNumericalDigit = (value, numericalDigit) => {
  const digits = String(Math.floor(value / numericalDigit)).split("");
  
  return digits[digits.length - 1];
};

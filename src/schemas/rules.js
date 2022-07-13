// messages
const requiredMessage = 'This is a required field.';
const emailMessage = 'Email must be a valid email.';
const numberTypeErrorMessage = 'Must be a number.';
const numberIntegerMessage = 'Must be an integer.';

// string
const minLength = (value = 8) => ({
  value,
  message: `Must be at least ${value} characters.`,
});
const maxLength = (value = 24) => ({
  value,
  message: `Must be at most ${value} characters.`,
});

// num
const minValue = (value = 1) => ({
  value,
  message: `Must be more than or equal to ${value}.`,
});
const maxValue = (value = 150) => ({
  value,
  message: `Must be less than or equal to ${value}.`,
});

export {
  minLength,
  maxLength,
  requiredMessage,
  emailMessage,
  minValue,
  maxValue,
  numberTypeErrorMessage,
  numberIntegerMessage,
};

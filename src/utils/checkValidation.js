const validateLength = (inputValue, name, min, max) => {
  if (inputValue.length < min) {
    return {
      success: false,
      message: `${name} must be at least ${min}`,
    };
  } else if (inputValue.length > max) {
    return {
      success: false,
      message: `${name} can't be longer than ${max}`,
    };
  } else {
    return {
      success: true,
      message: `✔️`,
    };
  }
};

const validateEmail = (value) => {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (re.test(value.trim())) {
    return {
      success: true,
      message: `✔️`,
    };
  } else {
    return {
      success: false,
      message: `email is not valid`,
    };
  }
};

const checkValidation = (type, name, value) => {
  switch (type) {
    case 'length-min-6':
      return validateLength(value, name, 6, 256);
    case 'email':
      return validateEmail(value);
    default:
      return {
        success: true,
        message: `✔️ ${name} is valid`,
      };
  }
};

export default checkValidation;

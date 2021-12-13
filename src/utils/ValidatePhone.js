export const ValidatePhone = phone => {
  let phoneRegex = /^\d{10}$/;

  if (phoneRegex.test(phone)) {
    return true;
  }
  //invalid
  return false;
};

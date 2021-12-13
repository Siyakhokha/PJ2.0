export const ValidateEmail = email => {
  let mailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  if (mailRegex.test(email)) {
    return true;
  }
  //invalid
  return false;
};

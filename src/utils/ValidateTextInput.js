export const ValidateTextInput = text => {
  let OnlylettersRegex = /^[A-Za-z]{2,30}$/;

  if (OnlylettersRegex.test(text)) {
    return true;
  }
  //invalid
  return false;
};

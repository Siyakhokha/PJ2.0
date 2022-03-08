export const ValidateSpecialCharacters = text => {
  let NoSpecialCharacters = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;

  if (NoSpecialCharacters.test(text)) {
    return true;
  }
  //invalid
  return false;
};

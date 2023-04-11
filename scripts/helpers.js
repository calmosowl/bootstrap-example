export function generateString(maxLength) {
  const characters ='abcdefghijklmnopqrstuvwxyz';
  const stringLength = Math.floor(Math.random() * (Math.floor(maxLength) - 10) + 10);
  let result = '';

  for ( let i = 0; i < stringLength; i++ ) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }

  return result;
}

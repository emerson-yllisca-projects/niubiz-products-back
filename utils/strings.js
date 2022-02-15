const bcrypt = require('bcryptjs');

const { EMAIL_EXPRESION_REGEX } = require('../constants/index');

const normalizeString = (rawText) => {
  return rawText
    .trim()
    .normalize(`NFD`)
    .replace(/[\u0300-\u036f]/g, ``)
}

const getExtension = (fileName) => {
  return fileName.split(`.`).pop()
}

const quantityCharInAbcArray = 25
const quantityCharInAbc = quantityCharInAbcArray + 1

const getLeterFromAbc = (number) =>  {
  let numberToAscii = number
  let prevLetter = ``
  if (number > quantityCharInAbcArray) {
    const numberToPrevAbc = number / quantityCharInAbc - 1
    numberToAscii = number % quantityCharInAbc
    prevLetter = getLeterFromAbc(numberToPrevAbc)
  }
  const numberAscii = numberToAscii + 97
  return `${prevLetter}${String.fromCharCode(numberAscii)}`
}

const encryptString = ( string ) => {
  const salt = bcrypt.genSaltSync();
  return bcrypt.hashSync(string, salt);
}

const validPassword =  (password , passwordDB ) =>{
  let   validPassword = bcrypt.compareSync(password, passwordDB);
  return validPassword;
}

const validateEmial = (email) => {
  return EMAIL_EXPRESION_REGEX.test(email)
}

module.exports = {
  normalizeString,
  getExtension,
  getLeterFromAbc,
  encryptString,
  validateEmial,
  validPassword
}
function convertEnglishToArabicNumber(number) {
  const arabicNumerals = ["٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"];
  const englishNumerals = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
  let arabicNumber = "";
  for (let i = 0; i < number.length; i++) {
    let digit = number.charAt(i);
    let englishIndex = englishNumerals.indexOf(digit);
    if (englishIndex !== -1) {
      arabicNumber += arabicNumerals[englishIndex];
    } else {
      arabicNumber += digit;
    }
  }
  return arabicNumber;
}

export default convertEnglishToArabicNumber;

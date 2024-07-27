import { useState, useEffect } from "react";
import { useRTL } from "../../hooks/useRTL";

// const arabicNumbers = [
//   "الأولى",
//   "الثانية",
//   "الثالثة",
//   "الرابعة",
//   "الخامسة",
//   "السادسة",
//   "السابعة",
//   "الثامنة",
//   "التاسعة",
//   "العاشرة",
//   "الحادية عشر",
//   "الثانية عشر",
//   "الثالثة عشر",
//   "الرابعة عشر",
//   "الخامسة عشر",
//   "السادسة عشر",
//   "السابعة عشر",
//   "الثامنة عشر",
//   "التاسعة عشر",
//   "العشرون",
// ];
// const tens = [
//   "",
//   "عشر",
//   "العشرون",
//   "الثلاثون",
//   "الأربعون",
//   "الخمسون",
//   "الستون",
//   "السبعون",
//   "الثمانون",
//   "التسعون",
//   "المئة",
//   "المئة وواحد",
// ];

// const units = [
//   "",
//   "الحادية",
//   "الثانية",
//   "الثالثة",
//   "الرابعة",
//   "الخامسة",
//   "السادسة",
//   "السابعة",
//   "الثامنة",
//   "التاسعة",
// ];

const arabicNumbers = [
  "الأولى",
  "الثانية",
  "الثالثة",
  "الرابعة",
  "الخامسة",
  "السادسة",
  "السابعة",
  "الثامنة",
  "التاسعة",
  "العاشرة",
  "الحادية عشر",
  "الثانية عشر",
  "الثالثة عشر",
  "الرابعة عشر",
  "الخامسة عشر",
  "السادسة عشر",
  "السابعة عشر",
  "الثامنة عشر",
  "التاسعة عشر",
  "العشرون",
];

// English number words
const englishNumbers = [
  "first",
  "second",
  "third",
  "fourth",
  "fifth",
  "sixth",
  "seventh",
  "eighth",
  "ninth",
  "tenth",
  "eleventh",
  "twelfth",
  "thirteenth",
  "fourteenth",
  "fifteenth",
  "sixteenth",
  "seventeenth",
  "eighteenth",
  "nineteenth",
  "twentieth",
];

const arabicTens = [
  "",
  "عشر",
  "العشرون",
  "الثلاثون",
  "الأربعون",
  "الخمسون",
  "الستون",
  "السبعون",
  "الثمانون",
  "التسعون",
  "المئة",
  "المئة وواحد",
];

const englishTens = [
  "",
  "ten",
  "twenty",
  "thirty",
  "forty",
  "fifty",
  "sixty",
  "seventy",
  "eighty",
  "ninety",
  "one hundred",
  "one hundred and one",
];

const arabicUnits = [
  "",
  "الحادية",
  "الثانية",
  "الثالثة",
  "الرابعة",
  "الخامسة",
  "السادسة",
  "السابعة",
  "الثامنة",
  "التاسعة",
];

const englishUnits = [
  "",
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine",
];

const ConvertNumberToWord = () => {
  const [numbers, setNumbers] = useState([]);
  const isRTL = useRTL();

  useEffect(() => {
    const getArabicNumber = (n) => {
      if (isRTL) {
        if (n <= 20) {
          return arabicNumbers[n - 1];
        } else if (n <= 99) {
          const tensPart = arabicTens[Math.floor(n / 10)];
          const unitsPart = arabicUnits[n % 10];
          return ` ${unitsPart} ${unitsPart && "و"} ${tensPart}`.trim();
        } else if (n <= 200) {
          const hundredsPart = "المئة";
          const remainder = n - 100;
          return remainder === 0
            ? "المئة"
            : ` ${hundredsPart} و ${arabicUnits[remainder % 10]} ${
                arabicTens[Math.floor(remainder / 10)]
              }`.trim();
        } else {
          throw new Error("Number out of range");
        }
      } else {
        if (n <= 20) {
          return englishNumbers[n - 1];
        } else if (n <= 99) {
          const tensPart = englishTens[Math.floor(n / 10)];
          const unitsPart = englishUnits[n % 10];
          return ` ${unitsPart} ${unitsPart && "and"} ${tensPart}`.trim();
        } else if (n <= 200) {
          const hundredsPart = "one hundred";
          const remainder = n - 100;
          return remainder === 0
            ? "one hundred"
            : ` ${hundredsPart} و ${englishUnits[remainder % 10]} ${
                englishTens[Math.floor(remainder / 10)]
              }`.trim();
        } else {
          throw new Error("Number out of range");
        }
      }
    };

    const generateNumbers = () => {
      const numbersArray = isRTL ? [...arabicNumbers] : [...englishNumbers];
      for (let i = 21; i <= 200; i++) {
        numbersArray.push(getArabicNumber(i));
      }
      setNumbers(numbersArray);
    };

    generateNumbers();
  }, [isRTL]);

  return numbers;
};

export default ConvertNumberToWord;

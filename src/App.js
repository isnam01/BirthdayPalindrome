import { useState } from "react";
import "./styles.css";

export default function App() {
  const [bdayDate, setBdayDate] = useState(undefined);
  const [msg, setmsg] = useState("");

  const reverseStr = (str) => {
    var listOfChars = str.split("");
    var reverseListOfChars = listOfChars.reverse();
    var reversedStr = reverseListOfChars.join("");
    return reversedStr;
  };

  const isPalindrome = (str) => {
    var reverse = reverseStr(str);
    return str === reverse;
  };

  const convertDateToStr = (date) => {
    var dateStr = { day: "", month: "", year: "" };
    if (date.day < 10) {
      dateStr.day = "0" + date.day;
    } else {
      dateStr.day = date.day.toString();
    }
    if (date.month < 10) {
      dateStr.month = "0" + date.month;
    } else {
      dateStr.month = date.month.toString();
    }
    dateStr.year = date.year.toString();
    return dateStr;
  };

  const getAllDateFormats = (date) => {
    var dateStr = convertDateToStr(date);
    var ddmmyyyy = dateStr.day + dateStr.month + dateStr.year;
    var mmddyyyy = dateStr.month + dateStr.day + dateStr.year;
    var yyyymmdd = dateStr.year + dateStr.month + dateStr.day;
    var ddmmyy = dateStr.day + dateStr.month + dateStr.year.slice(-2);
    var mmddyy = dateStr.month + dateStr.day + dateStr.year.slice(-2);
    var yymmdd = dateStr.year.slice(-2) + dateStr.month + dateStr.day;

    return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yymmdd];
  };

  const checkPalindromeForAllDateFormats = (date) => {
    var listOfPalindromes = getAllDateFormats(date);
    var flag = false;
    for (var i = 0; i < listOfPalindromes.length; i++) {
      if (isPalindrome(listOfPalindromes[i])) {
        flag = true;
        break;
      }
    }
    return flag;
  };

  const isLeapYear = (year) => {
    if (year % 400 === 0) {
      return true;
    }
    if (year % 100 === 0) {
      return false;
    }
    if (year % 4 === 0) {
      return true;
    }
    return false;
  };

  const getNextDate = (date) => {
    var day = date.day + 1;
    var month = date.month;
    var year = date.year;
    var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    if (month === 2) {
      if (isLeapYear(year)) {
        if (day > 29) {
          day = 1;
          month++;
        }
      } else {
        if (day > 28) {
          day = 1;
          month++;
        }
      }
    } else {
      if (day > daysInMonth[month - 1]) {
        day = 1;
        month++;
      }
    }

    if (month > 12) {
      month = 1;
      year++;
    }
    return {
      day: day,
      month: month,
      year: year
    };
  };

  const getNextPalindromeDate = (date) => {
    var ctr = 0;
    var nextDate = getNextDate(date);
    while (1) {
      ctr++;
      var isPalindrome = checkPalindromeForAllDateFormats(nextDate);
      if (isPalindrome) {
        break;
      }
      nextDate = getNextDate(nextDate);
    }
    return [ctr, nextDate];
  };

  const submitHandler = () => {
    if (bdayDate && bdayDate !== "") {
      console.log(bdayDate);
      let listOfDate = bdayDate.split("-");
      let date = {
        day: Number(listOfDate[2]),
        month: Number(listOfDate[1]),
        year: Number(listOfDate[0])
      };
      let isPalindrome = checkPalindromeForAllDateFormats(date);
      if (isPalindrome) {
        setmsg("Yay! your birthday is a palindrome!! 🥳🥳");
      } else {
        let [ctr, nextPalindromeDate] = getNextPalindromeDate(date);
        setmsg(
          `Oops , you missed the Palindrome date by ${ctr} days . Next palindrome date is ${nextPalindromeDate.year}-${nextPalindromeDate.month}-${nextPalindromeDate.day} `
        );
      }
    }
  };

  return (
    <div className="App">
      <label>Enter date : </label>
      <input type="date" onChange={(e) => setBdayDate(e.target.value)}></input>
      <button onClick={() => submitHandler()}>Check</button>
      {bdayDate && msg && <p>{msg}</p>}
    </div>
  );
}

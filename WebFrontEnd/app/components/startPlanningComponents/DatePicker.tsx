import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import tw from "twrnc";
import { formatDate } from "@/app/helpers/dateTimeHelpers/dateTimeFunctions";

interface DatePickerProps {
  currentDate: string,
  startDate: string,
  endDate: string,
  setStartDate: React.Dispatch<React.SetStateAction<String>>;
  setEndDate: React.Dispatch<React.SetStateAction<String>>;
}

// JavaScript's Date object uses zero-indexed months (0 for January) so we align our UI with it
export default function DatePicker({ currentDate, startDate, endDate, setStartDate, setEndDate }: DatePickerProps) {

  const currentDateYear: string = currentDate.substring(0,4); // 2023
  const currentDateMonth: string = currentDate.substring(5,7); // 11 (but its actually December)
  const currentDateDate: string = currentDate.substring(8,10); // 18
  const [selectedYear, setSelectedYear] = useState<number>(parseInt(currentDateYear)); // 2023
  const [selectedMonth, setSelectedMonth] = useState<number>(parseInt(currentDateMonth)); // 11 (but its actually December)
  const [selectedYear2, setSelectedYear2] = useState<number>(selectedMonth === 11 ? (selectedYear + 1) : selectedYear);
  const [selectedMonth2, setSelectedMonth2] = useState<number>(selectedMonth === 11 ? 0: (selectedMonth + 1));
  const [selectedDate, setSelectedDate] = useState<number>(parseInt(currentDateDate)); // 18
  const [localStartDate, setLocalStartDate] = useState(startDate); // 2023-11-18 (but its actually December)
  const [localEndDate, setLocalEndDate] = useState(endDate); // 2023-11-18 (but its actually December)
  const [isPickingStart, setIsPickingStart] = useState(true);

  // console.log(currentDateYear);
  // console.log(currentDateMonth);
  // console.log(currentDateDate);
  // console.log(selectedYear);
  // console.log(selectedMonth);
  // console.log(selectedDate);
  // console.log(localStartDate);
  // console.log(localEndDate);

  const monthNames: string[] = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const generateDatesForMonth = (year: number, month: number): (number | string)[] => {
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayOfWeek = new Date(year, month, 1).getDay();
    return Array.from({ length: daysInMonth + firstDayOfWeek }, (_, i) =>
    i >= firstDayOfWeek ? i - firstDayOfWeek + 1 : `placeholder-${i}`);
  }

  const getDateFromNumber = (year: number, month: number, date: number): Date => {
    return new Date(year, month, date);
  }

  const getDateFromString = (year: string, month: string, date: string): Date => {
    // month in a JavaScript Date object is zero-indexed so need to -1 (if not done before)
    return new Date(parseInt(year), parseInt(month), parseInt(date))
  }

  const currentDateObject: Date = getDateFromString(currentDateYear, currentDateMonth, currentDateDate);

  const adjustStartEndDate = (year: number, month: number, date: number): void => {
    const selectedDateObject: Date = getDateFromNumber(year, month, date); // Ensure month is zero-indexed here
    const endDateObject: Date = getDateFromString(localEndDate.substring(0,4), localEndDate.substring(5,7), localEndDate.substring(8,10));
    const startDateObject: Date = getDateFromString(localStartDate.substring(0,4), localStartDate.substring(5,7), localStartDate.substring(8,10));
    // console.log("Current date object: " + currentDateObject);
    // console.log("Selected date object: " + selectedDateObject);
    // console.log("Start date object: " + startDateObject);
    // console.log("End date object: " + endDateObject);
    if (selectedDateObject < currentDateObject) {
      console.log("guard clause activated");
      return;
    }
    const newDate: string = formatDate(selectedDateObject.getFullYear(), selectedDateObject.getMonth(), selectedDateObject.getDate());
    // Out API calls still use 1-index for month
    const oneIndexedNewDate: string = formatDate(selectedDateObject.getFullYear(), selectedDateObject.getMonth() + 1, selectedDateObject.getDate());
    if (isPickingStart) {
      setStartDate(oneIndexedNewDate);
      setLocalStartDate(newDate);
      if (selectedDateObject > endDateObject) {
        setEndDate(oneIndexedNewDate);
        setLocalEndDate(newDate);
      }
    } else {
      setEndDate(oneIndexedNewDate);
      setLocalEndDate(newDate);
      if (selectedDateObject < startDateObject) {
        setStartDate(oneIndexedNewDate);
        setLocalStartDate(newDate);
      }
    }
  }

  // const handleYearChange = (year: number): void => {
  //   setSelectedYear(year);
  //   adjustStartEndDate(year, selectedMonth, selectedDate);
  // };

  const handleMonthChange = (change: number): void => {
    let newMonth = selectedMonth + change;
    let newYear = selectedYear;
    let newMonth2 = selectedMonth2 + change;
    let newYear2 = selectedYear2;

    if (newMonth > 11) {
      newMonth = 0;
      newYear++;
    } else if (newMonth < 0) {
      newMonth = 11;
      newYear--;
    }

    if (newMonth2 > 11) {
      newMonth2 = 0;
      newYear2++;
    } else if (newMonth2 < 0) {
      newMonth2 = 11;
      newYear2--;
    }

    setSelectedMonth(newMonth);
    setSelectedYear(newYear);
    setSelectedMonth2(newMonth2);
    setSelectedYear2(newYear2);
};

  const handleDateChange = (year: number, month: number, date: number): void => {
    // console.log("handleDateChange");
    // console.log(date);
    // console.log(selectedMonth);
    setSelectedDate(date);
    adjustStartEndDate(year, month, date);
    setIsPickingStart(!isPickingStart); // Correctly toggle the state
  };

  const isDateInRange = (date: Date, startDateString: string, endDateString: string): boolean => {
    const endDate: Date = getDateFromString(endDateString.substring(0,4), endDateString.substring(5,7), endDateString.substring(8,10));
    const startDate: Date = getDateFromString(startDateString.substring(0,4), startDateString.substring(5,7), startDateString.substring(8,10));
    // console.log("isDateInRange");
    // console.log(date);
    // console.log(startDate);
    // console.log(endDate);
    return date >= startDate && date <= endDate;
  }

  const dates1 = generateDatesForMonth(selectedYear, selectedMonth);
  const dates2 = generateDatesForMonth(selectedYear2, selectedMonth2);

  return (
    <View>
      {/* Header and Month/Year Selection */}
      <Text style={tw`text-center text-xl font-bold w-full my-3`}>Travel Dates</Text>
      <View style={styles.row}>
        <TouchableOpacity style={styles.arrowButton} onPress={() => handleMonthChange(-1)}>
          <Text>{"<"}</Text>
        </TouchableOpacity>
        <Text style={styles.headerText}>{monthNames[selectedMonth]} {selectedYear}</Text>
        <Text style={styles.headerText}>{monthNames[selectedMonth2]} {selectedYear2}</Text>
        <TouchableOpacity style={styles.arrowButton} onPress={() => handleMonthChange(1)}>
          <Text>{">"}</Text>
        </TouchableOpacity>
      </View>

      {/* Day Headers */}
      <View style={tw`flex flex-row justify-around py-3`}>
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <Text key={day} style={tw`font-semibold text-gray-600 text-xs`}>{day}</Text>
        ))}
      </View>

      {/* Dates for Selected Month */}
      <View style={tw`flex flex-row flex-wrap`}>
        {dates1.map((date, index) => {
          if (typeof date === 'string') { // This is a placeholder
            return <View key={date} style={tw`w-1/7 p-2`}></View>;
          }

          const dateObject = getDateFromNumber(selectedYear, selectedMonth, date);
          const inRange = isDateInRange(dateObject, localStartDate, localEndDate);
          const buttonStyle = inRange ? tw`bg-blue-500` : tw``;

          return (
            <TouchableOpacity
              key={`${date}-${index}`}
              onPress={() => handleDateChange(selectedYear, selectedMonth, date)}
              style={tw.style(`w-1/7 p-2 border border-gray-400 rounded-lg`, buttonStyle)}>
              <Text style={tw`text-center text-base`}>{date}</Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Dates for Next Month */}
      <View style={tw`flex flex-row flex-wrap`}>
        {dates2.map((date, index) => {
          if (typeof date === 'string') { // This is a placeholder
            return <View key={date} style={tw`w-1/7 p-2`}></View>;
          }

          const dateObject = getDateFromNumber(selectedYear2, selectedMonth2, date);
          const inRange = isDateInRange(dateObject, localStartDate, localEndDate);
          const buttonStyle = inRange ? tw`bg-blue-500` : tw``;

          return (
            <TouchableOpacity
              key={`${date}-${index}`}
              onPress={() => handleDateChange(selectedYear2, selectedMonth2, date)}
              style={tw.style(`w-1/7 p-2 border border-gray-400 rounded-lg`, buttonStyle)}>
              <Text style={tw`text-center text-base`}>{date}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = {
  row: tw`flex flex-row items-center justify-between`,
  arrowButton: tw`p-2 border border-gray-400 rounded-full`,
  yearMonthContainer: tw`w-[50]`,
  headerText: tw`text-lg font-bold mx-4 text-center`,
};

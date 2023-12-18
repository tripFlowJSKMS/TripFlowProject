import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import tw from "twrnc";
import formatDate from "@/app/helpers/formatDate";

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

  // Calculate the day of the week (0 = Sunday, 1 = Monday, etc.)
  const getDayOfWeek = (year: number, month: number, date: number): number => {
    return new Date(year, month - 1, date).getDay();
  };

  const generateDatesForMonth = (year: number, month: number): number[] => {
    const daysInMonth = new Date(year, month, 0).getDate();
    const firstDayOfWeek = getDayOfWeek(year, month, 1); // 0 = Sunday, 1 = Monday, etc.
    const dates = Array.from({ length: daysInMonth }, (_, i) => i + 1);

    // Add empty placeholders for days before the 1st day of the month
    for (let i = 0; i < firstDayOfWeek; i++) {
      dates.unshift(null);
    }

    return dates;
  };

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
    if (isPickingStart) {
      setStartDate(newDate);
      setLocalStartDate(newDate);
      if (selectedDateObject > endDateObject) {
        setEndDate(newDate);
        setLocalEndDate(newDate);
      } 
    } else {
      setEndDate(newDate);
      setLocalEndDate(newDate);
      if (selectedDateObject < startDateObject) {
        setStartDate(newDate);
        setLocalStartDate(newDate);
      }
    }
  }

  const handleYearChange = (year: number): void => {
    setSelectedYear(year);
    adjustStartEndDate(year, selectedMonth, selectedDate);
    setIsPickingStart(!isPickingStart); // Correctly toggle the state
  };

  // const handleMonthChange = (month: number): void => {
  //   setSelectedMonth(month);
  //   adjustStartEndDate(selectedYear, month, selectedDate);
  // };

  const handleMonthChange = (month: number): void => {
    setSelectedMonth(month);
    adjustStartEndDate(selectedYear, month, selectedDate);
    setIsPickingStart(!isPickingStart); // Correctly toggle the state
  };
  

  const handleDateChange = (date: number): void => {
    // console.log("handleDateChange");
    // console.log(date);
    // console.log(selectedMonth);
    setSelectedDate(date);
    adjustStartEndDate(selectedYear, selectedMonth, date);
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

  return (
    <View>
      <Text style={tw`text-center text-xl font-bold w-full my-3`}>Travel Dates</Text>
      <View>
        <View style={styles.row}>
          <TouchableOpacity style={styles.arrowButton} onPress={() => handleYearChange(selectedYear - 1)}>
            <Text>{"<"}</Text>
          </TouchableOpacity>
            <Text style={styles.headerText}>{selectedYear}</Text>
          <TouchableOpacity style={styles.arrowButton} onPress={() => handleYearChange(selectedYear + 1)}>
            <Text>{">"}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.row}>
          <TouchableOpacity style={styles.arrowButton}
            onPress={() => handleMonthChange(selectedMonth - 1 === -1 ? 11 : selectedMonth - 1)}>
            <Text>{"<"}</Text>
          </TouchableOpacity>
            <Text style={styles.headerText}>
              {monthNames[selectedMonth]}
            </Text>
          <TouchableOpacity style={styles.arrowButton} onPress={() => handleMonthChange(selectedMonth + 1 === 12 ? 0 : selectedMonth + 1)}>
            <Text>{">"}</Text>
          </TouchableOpacity>
        </View>

        {/* I know this is not centered and the proper way to do it is instantiate one header
            and put the corresponding dates below in a grid format but i cant seem to get the logic out.
            If anyone can do it please revise this portion of the code */}
        <View>
          <View style={tw`flex flex-row justify-around py-[3%] `}>
              <Text style={tw`font-semibold text-gray-600 text-xs`}>Sun</Text>
              <Text style={tw`font-semibold text-gray-600 text-xs`}>Mon</Text>
              <Text style={tw`font-semibold text-gray-600 text-xs`}>Tue</Text>
              <Text style={tw`font-semibold text-gray-600 text-xs`}>Wed</Text>
              <Text style={tw`font-semibold text-gray-600 text-xs`}>Thu</Text>
              <Text style={tw`font-semibold text-gray-600 text-xs`}>Fri</Text>
              <Text style={tw`font-semibold text-gray-600 text-xs`}>Sat</Text>
          </View>

          <View style={tw`flex flex-row flex-wrap`}>
  {generateDatesForMonth(selectedYear, selectedMonth).map((date, index) => {
    if (date === null) {
      return <View key={`placeholder-${index}`} style={tw`w-1/7 p-2`}></View>;
    }
    
    // This needs to be -1 so that it is referring to the correct button
    // const dateObject: Date = new Date(selectedYear, selectedMonth - 1, date);
    const dateObject: Date = new Date(selectedYear, selectedMonth, date); // selectedMonth is already zero-indexed
    // console.log(dateObject);
    // console.log("error reaches here");
    // console.log(localStartDate);
    // console.log(localEndDate);
    const isInRange = isDateInRange(dateObject, localStartDate, localEndDate);
    const buttonStyle = isInRange ? tw`bg-blue-500` : tw``;

    return (
      <TouchableOpacity 
        key={`${date}-${index}`}
        onPress={() => handleDateChange(date)}
        style={tw.style(`w-1/7 p-2 border border-gray-400 rounded-lg`, buttonStyle)}>
        <Text style={tw`text-center text-base`}>{date}</Text>
      </TouchableOpacity>
    );
  })}
</View>


        </View>
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

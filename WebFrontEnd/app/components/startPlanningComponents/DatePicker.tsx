import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import tw from "twrnc";

interface DatePickerProps {
  selectedYear: number,
  selectedMonth: number,
  selectedDate: number,
  setSelectedYear: React.Dispatch<React.SetStateAction<number>>,
  setSelectedMonth: React.Dispatch<React.SetStateAction<number>>,
  setSelectedDate: React.Dispatch<React.SetStateAction<number>>;
}

export default function DatePicker({ selectedYear, selectedMonth, selectedDate, setSelectedYear, setSelectedMonth, setSelectedDate }: DatePickerProps) {

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
  const getDayOfWeek = (year: number, month: number, day: number) => {
    return new Date(year, month - 1, day).getDay();
  };

  const generateDatesForMonth = (year: number, month: number) => {
    const daysInMonth = new Date(year, month, 0).getDate();
    const firstDayOfWeek = getDayOfWeek(year, month, 1); // 0 = Sunday, 1 = Monday, etc.
    const dates = Array.from({ length: daysInMonth }, (_, i) => i + 1);

    // Add empty placeholders for days before the 1st day of the month
    for (let i = 0; i < firstDayOfWeek; i++) {
      dates.unshift(null);
    }

    return dates;
  };

  const handleYearChange = (year: number) => {
    setSelectedYear(year);
  };

  const handleMonthChange = (month: number) => {
    setSelectedMonth(month);
  };

  const handleDateChange = (date: number) => {
    setSelectedDate(date);
  };

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
            onPress={() => handleMonthChange(selectedMonth - 1 === 0 ? 12 : selectedMonth - 1)}>
            <Text>{"<"}</Text>
          </TouchableOpacity>
            <Text style={styles.headerText}>
              {monthNames[selectedMonth - 1]}
            </Text>
          <TouchableOpacity style={styles.arrowButton} onPress={() => handleMonthChange(selectedMonth + 1 === 13 ? 1 : selectedMonth + 1, )}>
            <Text>{">"}</Text>
          </TouchableOpacity>
        </View>

        {/* I know this is not centered and the proper way to do it is instantiate one header
            and put the corresponding dates below in a grid format but i cant seem to get the logic out.
            If anyone can do it please revise this portion of the code */}
        <View>
          <View style={tw`flex flex-row justify-around py-3`}>
              <Text style={tw`font-semibold text-gray-600 text-xs`}>Sun</Text>
              <Text style={tw`font-semibold text-gray-600 text-xs`}>Mon</Text>
              <Text style={tw`font-semibold text-gray-600 text-xs`}>Tue</Text>
              <Text style={tw`font-semibold text-gray-600 text-xs`}>Wed</Text>
              <Text style={tw`font-semibold text-gray-600 text-xs`}>Thu</Text>
              <Text style={tw`font-semibold text-gray-600 text-xs`}>Fri</Text>
              <Text style={tw`font-semibold text-gray-600 text-xs`}>Sat</Text>
          </View>

          <View style={tw`flex flex-row flex-wrap`}>
            {generateDatesForMonth(selectedYear, selectedMonth).map(
              date => date !== null
                ? (
                  <TouchableOpacity onPress={() => handleDateChange(date)}
                    style={tw.style(`w-1/7 p-2 border border-gray-400 rounded-lg`, date === selectedDate && `bg-blue-500`)}>
                    <Text style={tw`text-center text-base`}>{date}</Text>
                  </TouchableOpacity>
                )
                : <View style={tw`w-1/7`} />
            )}
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

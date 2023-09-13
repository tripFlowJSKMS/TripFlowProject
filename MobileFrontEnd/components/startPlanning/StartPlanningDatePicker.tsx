import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import tw from "twrnc";

interface StartPlanningDatePickerProps {
  startDate: Date;
  endDate: Date;
  setStartDate: (date: Date) => void;
  setEndDate: (date: Date) => void;
}

export default function StartPlanningDatePicker({
  startDate,
  endDate,
  setStartDate,
  setEndDate,
}: StartPlanningDatePickerProps) {
  const currentDate = new Date();
  const [selectedYear, setSelectedYear] = useState(currentDate.getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(
    currentDate.getMonth() + 1,
  );
  const [selectedDate, setSelectedDate] = useState(currentDate.getDay());

  const years = Array.from({ length: 10 }, (_, i) => selectedYear - 5 + i);

  const monthNames = [
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
  const getDayOfWeek = (year, month, day) => {
    return new Date(year, month - 1, day).getDay();
  };

  const generateDatesForMonth = (year, month) => {
    const daysInMonth = new Date(year, month, 0).getDate();
    const firstDayOfWeek = getDayOfWeek(year, month, 1); // 0 = Sunday, 1 = Monday, etc.
    const dates = Array.from({ length: daysInMonth }, (_, i) => i + 1);

    // Add empty placeholders for days before the 1st day of the month
    for (let i = 0; i < firstDayOfWeek; i++) {
      dates.unshift(null);
    }

    return dates;
  };

  const handleYearChange = (year) => {
    setSelectedYear(year);
  };

  const handleMonthChange = (month) => {
    setSelectedMonth(month);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  return (
    <View>
      <Text style={tw`text-center text-5x1 font-bold w-full mt-4`}>
        Travel Dates
      </Text>
      <View style={tw`w-full border-t border-gray-100 my-2`} />
      <View style={tw`flex flex-col items-center justify-center`}>
        <View style={styles.row}>
          <TouchableOpacity
            style={tw`p-2 border border-gray-400 rounded-full`}
            onPress={() => handleYearChange(selectedYear - 1)}
          >
            <Text>{"<"}</Text>
          </TouchableOpacity>
          <View style={styles.yearMonthContainer}>
            <Text style={styles.headerText}>{selectedYear}</Text>
          </View>
          <TouchableOpacity
            style={tw`p-2 border border-gray-400 rounded-full`}
            onPress={() => handleYearChange(selectedYear + 1)}
          >
            <Text>{">"}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.row}>
          <TouchableOpacity
            style={styles.arrowButton}
            onPress={() =>
              handleMonthChange(
                selectedMonth - 1 === 0 ? 12 : selectedMonth - 1,
              )
            }
          >
            <Text>{"<"}</Text>
          </TouchableOpacity>
          <View style={styles.yearMonthContainer}>
            <Text style={styles.headerText}>
              {monthNames[selectedMonth - 1]}
            </Text>
          </View>
          <TouchableOpacity
            style={styles.arrowButton}
            onPress={() =>
              handleMonthChange(
                selectedMonth + 1 === 13 ? 1 : selectedMonth + 1,
              )
            }
          >
            <Text>{">"}</Text>
          </TouchableOpacity>
        </View>

        {/* I know this is not centered and the proper way to do it is instantiate one header
            and put the corresponding dates below in a grid format but i cant seem to get the logic out.
            If anyone can do it please revise this portion of the code */}
        <View style={styles.calendar}>
          <View
            style={tw`flex flex-row justify-between pl-[5%] pr-[5%] pb-[3%]`}
          >
            <View
              style={tw`flex items-center w-1/7 justify-center text-center`}
            >
              <Text style={tw`font-semibold text-gray-600 text-xs`}>Sun</Text>
            </View>
            <View
              style={tw`flex items-center w-1/7 justify-center text-center`}
            >
              <Text style={tw`font-semibold text-gray-600 text-xs`}>Mon</Text>
            </View>
            <View
              style={tw`flex items-center w-1/7 justify-center text-center`}
            >
              <Text style={tw`font-semibold text-gray-600 text-xs`}>Tue</Text>
            </View>
            <View
              style={tw`flex items-center w-1/7 justify-center text-center`}
            >
              <Text style={tw`font-semibold text-gray-600 text-xs`}>Wed</Text>
            </View>
            <View
              style={tw`flex items-center w-1/7 justify-center text-center`}
            >
              <Text style={tw`font-semibold text-gray-600 text-xs`}>Thu</Text>
            </View>
            <View
              style={tw`flex items-center w-1/7 justify-center text-center`}
            >
              <Text style={tw`font-semibold text-gray-600 text-xs`}>Fri</Text>
            </View>
            <View
              style={tw`flex items-center w-1/7 justify-center text-center`}
            >
              <Text style={tw`font-semibold text-gray-600 text-xs`}>Sat</Text>
            </View>
          </View>

          <View style={{ ...styles.dateContainer, alignItems: "center" }}>
            {generateDatesForMonth(selectedYear, selectedMonth).map(
              (date, index) =>
                date !== null ? (
                  <TouchableOpacity
                    key={`date-${date}`}
                    onPress={() => handleDateChange(date)}
                    style={[
                      styles.dateItem,
                      date === selectedDate && styles.selectedItem,
                    ]}
                  >
                    <Text style={styles.dateText}>{date}</Text>
                  </TouchableOpacity>
                ) : (
                  <View
                    key={`empty-${index}`}
                    style={styles.emptyDateItem}
                  ></View>
                ),
            )}
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = {
  calendar: tw`mt-4`,
  dateContainer: tw`flex flex-row flex-wrap`,
  dateItem: tw`w-1/7 p-2 border border-gray-400 rounded-lg items-center justify-center`,
  emptyDateItem: tw`w-1/7`,
  selectedItem: tw`bg-blue-500`,
  dateText: tw`text-center text-base text-black`,
  row: tw`flex flex-row items-center justify-center`,
  arrowButton: tw`p-2 border border-gray-400 rounded-full`,
  yearMonthContainer: tw`w-[50]`,
  headerText: tw`text-lg font-bold mx-4 text-center`,
};

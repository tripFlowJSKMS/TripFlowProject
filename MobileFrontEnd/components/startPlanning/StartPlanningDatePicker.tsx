import React, { useState, useEffect } from "react";
import DatePicker from "react-native-modern-datepicker";

export default function StartPlanningDatePicker() {
  const [date, setDate] = useState("");

  useEffect(() => {
    console.log(date);
  }, [date]);

  return (
    <DatePicker
      options={{
        backgroundColor: "#090C08",
        textHeaderColor: "#FFA25B",
        textDefaultColor: "#F6E7C1",
        selectedTextColor: "#fff",
        mainColor: "#F4722B",
        textSecondaryColor: "#D6C7A1",
        borderColor: "rgba(122, 146, 165, 0.1)",
      }}
      mode="monthYear"
      selectorStartingYear={2000}
      onMonthYearChange={(selectedDate) => setDate(selectedDate)}
    />
  );
}

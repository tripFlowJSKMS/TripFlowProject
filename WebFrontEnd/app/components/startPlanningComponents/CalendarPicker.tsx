import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import CalendarPicker from "react-native-calendar-picker";
import tw from "twrnc";
import { Dimensions } from 'react-native';

const window = Dimensions.get('window');


interface MyCalendarPickerState {
    selectedStartDate: Date | null;
    selectedEndDate: Date | null;
}

export default class App extends Component<{}, MyCalendarPickerState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      selectedStartDate: null,
      selectedEndDate: null,
    };
    this.onDateChange = this.onDateChange.bind(this);
  }

  onDateChange(date: Date, type) {
    if (type === "END_DATE") {
      this.setState({
        selectedEndDate: date,
      });
    } else {
      this.setState({
        selectedStartDate: date,
        selectedEndDate: null,
      });
    }
  }

  render() {
    const { selectedStartDate, selectedEndDate } = this.state;
    const minDate = new Date();
    const maxDate = new Date(2100, 12, 31);
    const startDate = selectedStartDate ? selectedStartDate.toString() : "";
    const endDate = selectedEndDate ? selectedEndDate.toString() : "";
    const screenWidth = window.width;
    const screenHeight = window.height;
    console.log(screenHeight);
    console.log(screenWidth);

    return (
      <View style={styles.container}>
        <CalendarPicker
          startFromMonday={true}
          allowRangeSelection={true}
          minDate={minDate}
          maxDate={maxDate}
          todayBackgroundColor="#f2e6ff"
          selectedDayColor="#7300e6"
          selectedDayTextColor="#FFFFFF"
          onDateChange={this.onDateChange}
          scaleFactor={900}
          style={styles.calendarStyle}
          previousTitleStyle={t}
          nextTitleStyle={styles.nextTitleStyle}


        //   height={screenHeight}
        //   width={screenWidth/4}
        //   https://www.npmjs.com/package/react-native-calendar-picker?activeTab=readme
        />

        <View>
          <Text>SELECTED START DATE:{startDate}</Text>
          <Text>SELECTED END DATE:{endDate}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#FFFFFF",
      marginTop: 100,
    },
    calendarStyle: {
        transform: [{ scale: 0.5 }], // Scale down the calendar
    },
    previousTitleStyle: {
        flex: 1,
        textAlign: 'right', // Align text to the right
        font: 500,
    },
    nextTitleStyle: {
        flex: 1,
        textAlign: 'left', // Align text to the left
    }, 
  });
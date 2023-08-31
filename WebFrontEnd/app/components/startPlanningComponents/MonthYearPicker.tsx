import { Text, View } from "react-native";
import DatePicker from 'react-native-modern-datepicker';
import tw from "twrnc";
import { useState } from "react";

export default function MonthYearPicker() {
    
    const [date, setDate] = useState('');

    return (
        <View>
            <Text style={tw`text-center text-5x1 font-bold w-100 mt-4`}>Travel Dates</Text>
            <View style={tw`w-full border-t border-gray-1000 my-2`} />
            <View style={tw`flex flex-row items-center justify-center`}>
                {/*https://hosseinshabani.github.io/react-native-modern-datepicker/*/}
                <DatePicker
                    options={{
                    backgroundColor: '#090C08',
                    textHeaderColor: '#FFA25B',
                    textDefaultColor: '#F6E7C1',
                    selectedTextColor: '#fff',
                    mainColor: '#F4722B',
                    textSecondaryColor: '#D6C7A1',
                    borderColor: 'rgba(122, 146, 165, 0.1)',
                    }}
                    mode="monthYear"
                    selectorStartingYear={2000}
                    onMonthYearChange={selectedDate => setDate(selectedDate)}
                />
            </View>
        </View>
    )
}


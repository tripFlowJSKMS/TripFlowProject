import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';
import tw from 'twrnc';
import { DestinationType } from '../../../../Shared/types';
import { useDispatch } from 'react-redux';
import { deleteDestinationNotes, updateDestinationNotes } from '@/lib/reducers/destinationNotesReducer';
import { ScrollView } from 'react-native-gesture-handler';

interface DestinationModalProps {
  isModalVisible: boolean;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  destination: DestinationType;
  destinationNotes: string[];
}

export function DestinationModal({ isModalVisible, setModalVisible, destination, destinationNotes }: DestinationModalProps) {
  const [inputNote, setInputNote] = useState<string>('');
  const dispatch = useDispatch();

  const handleAddNote = () => {
    if (inputNote.trim() !== '') {
      dispatch(updateDestinationNotes({ destinationName: destination.name, note: inputNote }));
      setInputNote('');
    }
  }
  const handleDeleteNote = (index: number) => {
    dispatch(deleteDestinationNotes({ destinationName: destination.name, noteIndex: index }));
  }

  return (
    <Modal style={tw`items-center`} isVisible={isModalVisible} onBackdropPress={() => {
      setModalVisible(false);
      setInputNote('');
      }}>
      <View style={tw`w-6/12 h-5/6 items-center bg-white rounded-lg p-4`}>
        <Text style={tw`text-lg font-bold mb-4`}>{destination.name}</Text>
        <ScrollView style={tw`w-full`}>
          {destinationNotes.map((note, index) => (
            <View style={tw`flex-row justify-between items-center`} key={index}>
              <Text style={tw`w-9/12 border self-start m-2 p-4 rounded-lg`} >{note}</Text>
              <TouchableOpacity style={tw`w-2/12`} onPress={() => handleDeleteNote(index)}><Text style={tw`text-center font-bold`}>X</Text></TouchableOpacity>
            </View>
          ))}
          <View style={tw`w-full flex-row justify-between items-center`}>
            <TextInput style={tw`w-9/12 border border-dashed m-2 p-4 rounded-lg`} placeholder="Type your note..." value={inputNote} onChangeText={setInputNote} multiline/>
            <TouchableOpacity onPress={handleAddNote} style={tw`h-3/6 w-2/12 items-center justify-center bg-blue-500 rounded-full`}>
              <Text style={tw`text-white font-bold`}>Add note</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
}

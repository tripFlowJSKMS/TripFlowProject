import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { View, Text } from 'react-native';
import tw from "twrnc";

const FileUpload = () => {
  const [files, setFiles] = useState([]);

  const onDrop = useCallback(acceptedFiles => {
    setFiles(acceptedFiles.map(file => Object.assign(file, {
      preview: URL.createObjectURL(file)
    })));
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  // Update the return statement to use Tailwind classes for styling
  return (
    <div style={tw`p-5 border-2 border-dashed border-gray-400 rounded-lg mr-[8%] mt-[20%] absolute right-0`} {...getRootProps()}>
      <input {...getInputProps()} />
      <Text style={tw`text-gray-700 text-center`}>Drop the files here ...</Text>
      {files.map(file => (
        <View key={file.name} style={tw`mt-2`}>
          <Text>{file.name}</Text>
        </View>
      ))}
    </div>
  );
};

export default FileUpload;

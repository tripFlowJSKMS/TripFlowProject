import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { View, Text } from 'react-native';
import tw from "twrnc";
// npm i --save https://cdn.sheetjs.com/xlsx-0.20.1/xlsx-0.20.1.tgz (not the usual npm i xlsx)
import XLSX from 'xlsx';
import mammoth from 'mammoth';
import { callGPT } from '@/api/callGPT';
import { processFile } from '@/api/processFile';
import { GPTScrapedEventType } from '../../../../Shared/types/callGPT';
import { useDispatch } from 'react-redux';
import { setIndividualEventArr } from '@/lib/reducers/individualEventArrReducer';

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const dispatch = useDispatch();

  const onDrop = useCallback(async (acceptedFiles: Blob[]) => {
    // Keep to 1 file for MVP
    const uploadedFile = acceptedFiles[0];
    setFile(uploadedFile);

    const formData = new FormData();
    formData.append('file', uploadedFile);

    try {
      const parsedData = await processFile(formData);
      try {
        callGPT(parsedData);
      } catch (error) {
        console.error("Error calling GPT with parsed data:", error);
      }
    } catch (error) {
      console.error("Error processing file:", error);
    }

  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    multiple: false
  });

  return (
    <div style={tw`p-5 border-2 border-dashed border-gray-400 rounded-lg`} {...getRootProps()}>
      <input {...getInputProps()} />
      <Text style={tw`text-gray-700 text-center`}>Drop the file here or click to select a file</Text>
      {file && (
        <View style={tw`mt-2`}>
          <Text style={tw`text-gray-700`}>{file.name}</Text>
        </View>
      )}
    </div>
  );
};

export default FileUpload;

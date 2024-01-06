import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { View, Text } from 'react-native';
import tw from "twrnc";
// npm i --save https://cdn.sheetjs.com/xlsx-0.20.1/xlsx-0.20.1.tgz (not the usual npm i xlsx)
import XLSX from 'xlsx';
import mammoth from 'mammoth';
import { callGPT } from '@/api/callGPT';
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
    const reader = new FileReader();
    const fileType = uploadedFile.name.split('.').pop().toLowerCase();

    reader.onload = async (event) => {
      const arrayBuffer = event.target.result as ArrayBuffer;
      if (arrayBuffer) {
        let textContent = '';
        if (fileType === 'xlsx' || fileType === 'xls') {
          const data = new Uint8Array(arrayBuffer);
          const workbook = XLSX.read(data, { type: 'array' });
          const sheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[sheetName];
          const jsonData = XLSX.utils.sheet_to_json(worksheet);
          textContent = JSON.stringify(jsonData, null, 2);
        } else if (fileType === 'docx') {
          // Handle Word textContent as needed...
          // mammoth.extractRawText({ arrayBuffer: result }).then((output) => {
          //   textContent = output.value;
          // });
        } else if (fileType === 'pdf') {
          // PDFs should be handled server-side due to complexity...???
          // uploadPdfToServer(file);
        }

        callGPT(textContent);
        
      }
    };

    reader.onerror = (error) => {
      console.error('FileReader error:', error);
    };

    // Read the file according to its type
    if (fileType === 'docx' || fileType === 'xlsx' || fileType === 'xls') {
      reader.readAsArrayBuffer(uploadedFile);
    } else if (fileType === 'pdf') {
      // For PDF, you would send the file to a server-side endpoint
      // uploadPdfToServer(file);
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

import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { View, Text } from 'react-native';
import tw from "twrnc";
// npm i --save https://cdn.sheetjs.com/xlsx-0.20.1/xlsx-0.20.1.tgz (not the usual npm i xlsx)
import XLSX from 'xlsx';
import mammoth from 'mammoth';
 

const FileUpload = () => {
  const [files, setFiles] = useState([]);

  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.forEach((file) => {
      const reader = new FileReader();
      const fileType = file.name.split('.').pop().toLowerCase();
  
      reader.onload = (event) => {
        const arrayBuffer = event.target.result as ArrayBuffer;
        if (arrayBuffer) {
          let textContent = '';
          if (fileType === 'xlsx' || fileType === 'xls') {
            const data = new Uint8Array(arrayBuffer);
            console.log(data);
            console.log(XLSX);
            const workbook = XLSX.read(data, { type: 'array' });
            const sheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[sheetName];
            const jsonData = XLSX.utils.sheet_to_json(worksheet);
            textContent = JSON.stringify(jsonData, null, 2);
            // Handle Excel textContent as needed...
          } else if (fileType === 'docx') {
            // Handle Word textContent as needed...
            // mammoth.extractRawText({ arrayBuffer: result }).then((output) => {
            //   textContent = output.value;
            // });
          } else if (fileType === 'pdf') {
            // PDFs should be handled server-side due to complexity...
            // uploadPdfToServer(file);
          }
          // Process textContent for non-PDF files...
          console.log(textContent);
        }
      };
  
      reader.onerror = (error) => {
        console.error('FileReader error:', error);
      };
  
      // Read the file according to its type
      if (fileType === 'docx' || fileType === 'xlsx' || fileType === 'xls') {
        reader.readAsArrayBuffer(file);
      } else if (fileType === 'pdf') {
        // For PDF, you would send the file to a server-side endpoint
        // uploadPdfToServer(file);
      }
    });
  }, []);
  


  // Include 'multiple: true' in the useDropzone configuration if it's not already
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    multiple: true // Allows multiple files to be dropped
  });

  return (
    // Unfortunately this must be div and not View - not sure how it will affect production 
    <div style={tw`p-5 border-2 border-dashed border-gray-400 rounded-lg mr-[8%] mt-[20%] absolute right-0`} {...getRootProps()}>
      <input {...getInputProps()} />
      <Text style={tw`text-gray-700 text-center`}>Drop the files here or click to select files</Text>
      {files.map(file => (
        <View key={file.path} style={tw`mt-2`}> {/* Use `path` or `name` as a key, but `path` can handle cases where two files have the same name */}
          <Text>{file.name}</Text>
        </View>
      ))}
    </div>
  );
};

export default FileUpload;

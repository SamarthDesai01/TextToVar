const readline = require('readline');
const fs = require('fs');

const variableName = 'nouns';
const variableType = 'const';
const outputFileName = 'output.js';
const inputFileName = 'nounlist.txt';

var outputStream = fs.createWriteStream(outputFileName, {flags: 'a'});

//Declare our variable
outputStream.write(`${variableType} ${variableName} = [`);

//Create the stream to read the file from
const inputStream = readline.createInterface({
    input: fs.createReadStream(inputFileName)
});

//Add each line as an item to the array
inputStream.on('line', (line) => {
    if(line.indexOf('\'') === -1){
        outputStream.write(`\'${line}\',`);
    }
});

//Close the array and export it
inputStream.on('close', () => {
    outputStream.write(']');
    outputStream.write("\n\nmodule.exports = {");
    outputStream.write("\n    " + variableName);
    outputStream.write("\n};");
});


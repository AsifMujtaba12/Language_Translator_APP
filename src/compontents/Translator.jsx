import React, { useState } from "react";
import { HiOutlineSpeakerWave } from "react-icons/hi2";
import { FaRegCopy } from "react-icons/fa6";
import { FaExchangeAlt } from "react-icons/fa";
import languages from "../Languages";

function Translator() {
    const [fromText, setFromText] =useState('');
    const [toText, setToText] =useState('');
    const [fromLang, setFromLang] =useState('en-GB');
    const [toLang, setToLang] = useState('hi-IN');

    //Exchange textarea contents
 function handleExchange(){
       [setFromLang(toLang), setToLang(fromLang)];
       [setFromText(toText), setToText(fromText)]

 }
 //function for copying text
 const copyContent=(text)=>{
    navigator.clipboard.writeText(text);
    alert('Text copied successfully');
 }
//  function for speaking text
 const speakText=(text, lang)=>{
    const synth = window.speechSynthesis;
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = lang;
        synth.speak(utterance);


 }
 // Function for clicking on the icon buttons
const handleIconBtn = (target, id) => {
  if (target.classList.contains("copy")) {
    if (id == "from") {
      copyContent(fromText);
    } else {
      copyContent(toText);
    }
  } else {
    // speaker check
    if (id == "from") {
      speakText(fromText, fromLang);
    } else {
      speakText(toText, toLang);
    }
  }
};
//function for translating text using Mymemorary api
const handleTranslate = async()=>{
    if(!fromText){
        alert('Please enter some text to translate.');
        return;
    }
try{
    const response = await fetch(`https://api.mymemory.translated.net/get?q=${fromText}&langpair=${fromLang}|${toLang}`);

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    console.log(data);
    setToText(data.responseData.translatedText);
}catch(e){
    console.error('Error:', e);
    alert('Failed to translate text. Please check your internet connection or try again later.');
}

}
// Reset function to clear all text and refresh the state
const handleReset = () => {
    setFromText("");
    setToText("");
    setFromLang("en-GB"); // Reset to default language
    setToLang("hi-IN"); // Reset to default language
  };
  return (
    <div className="max-w-2xl w-full bg-gray-300 shadow-lg rounded-lg p-6">
      {/* Textareas for translation */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <textarea value={fromText} onChange={(e) => setFromText(e.target.value)}
          name="from"
          id="from"
          placeholder="Enter Text"
          className="w-full h-64 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        ></textarea>
        <textarea value={toText}
          name="to"
          id="to"
          placeholder="Translation"
          readOnly
          className="w-full h-64 p-3 border border-gray-300 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
        ></textarea>
      </div>

      {/* Controls */}
      <div className="mt-6 flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Left Controls */}
        <div className="flex items-center gap-3">
         {/* Speak button click */}
          <HiOutlineSpeakerWave   onClick={(e)=>handleIconBtn(e.currentTarget, "from")}
            className="text-2xl text-blue-500 hover:text-blue-700 cursor-pointer speaker"
            title="Speak" 
          />

          {/* copy button click */}
          <FaRegCopy  onClick={(e)=>handleIconBtn(e.currentTarget, "from")} 
            className="text-xl text-blue-500 hover:text-blue-700 cursor-pointer copy"
            title="Copy"  
          />
          {/* Languages  */}

          <select value={fromLang} onChange={(e)=>setFromLang(e.target.value)}
            className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
        {Object.entries(languages).map(([code, name]) => (
                        <option key={code} value={code}>
                        {name}
                        </option>
                    ))}
          </select>
        </div>

        {/* Middle Divider */}
       {/* Exchange Button */}
       <div onClick={handleExchange}  className="flex items-center justify-center md:h-12 md:w-12 h-10 w-10 rounded-full bg-blue-100 shadow-md">
          <FaExchangeAlt
            className="text-2xl text-blue-500 hover:text-blue-700 cursor-pointer"
            title="Exchange"
          />
        </div>

        {/* Right Controls */}
        <div className="flex items-center gap-3">
         {/* speaker button */}
          <HiOutlineSpeakerWave  onClick={(e)=>handleIconBtn(e.currentTarget, "to")}
            className="text-2xl text-blue-500 hover:text-blue-700 cursor-pointer speaker"
            title="Speak"
          />
          {/* copy button */}
          <FaRegCopy  onClick={(e)=>handleIconBtn(e.currentTarget, "to")}
            className="text-xl text-blue-500 hover:text-blue-700 cursor-pointer copy"
            title="Copy"
          />
          {/* Languages  */}
           <select value={toLang} onChange={(e)=>setToLang(e.target.value)}
            className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {Object.entries(languages).map(([code, name]) => (
                        <option key={code} value={code}>
                        {name}
                        </option>
                    ))}
          </select>
        </div>
      </div>

      {/* Translate Button */}
      <div className="mt-6 text-center flex gap-2 items-center justify-center">
        <button onClick={handleTranslate}
        className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
          Translate
        </button>
        <button
          onClick={handleReset}
          className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
        >
          Reset
        </button>
      </div>
    </div>
  );
}

export default Translator;

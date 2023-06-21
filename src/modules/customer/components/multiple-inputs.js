import React, { useEffect, useState } from "react";
import MultipleInputItem from "./multiple-input-item";

function MultipleInputs({ type, onChange,value }) {
  const [inputFields, setInputFields] = useState([""]);

  useEffect(() =>{
    console.log("SPAGETI",value)
    if(value){
      setInputFields(value)
    }
  },[value])

  const addInputField = () => {
    setInputFields([
      ...inputFields,""
    ]);
  };
  const removeInputFields = (index) => {
    const rows = [...inputFields];
    rows.splice(index, 1);
    setInputFields(rows);
  };
  const handleChange = (index,value) => {
    inputFields[index] = value; 
    setInputFields([...inputFields])
  };
  useEffect(() =>{
    onChange(inputFields);
     // eslint-disable-next-line 
  },[inputFields])
  return (
    <div className="mb-2">
      {inputFields?.map((data, index) => {
        return (
          <div className="row mb-1" key={index}>
            <MultipleInputItem
              isLast={inputFields.length === index + 1}
              type={type}
              value={value && value[index]? value[index] : ""}
              onChange={(e) => handleChange(index,e.target.value)}
              onAdd={addInputField}
              onRemove={() => removeInputFields(index)}
            />
          </div>
        );
      })}
    </div>
  );
}

export default MultipleInputs;

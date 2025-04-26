'use client'
//import React, { ChangeEvent } from 'react'
import { useState, useRef } from "react"
import styles from "@/styles/registerPage.module.css"
export default function loginPage() {

  interface ILoginValues {
    "email" : string,
    "password": string
  }
  function newLoginValues() : ILoginValues {
    return {
    "email" : "",
    "password": ""
  }}
  const loginValuesRef = useRef<ILoginValues>(newLoginValues());
  const [inputErrors,setInputErrors] = useState<ILoginValues>(newLoginValues());


  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>){
    if (e){
        let inputField = e.target.dataset['type'];
        let inputValue = e.target.value;

        let tempLoginValues = {...loginValuesRef.current};

        inputField === "email" ? tempLoginValues.email = inputValue : ""; 
        inputField === "password" ? tempLoginValues.password = inputValue : "";
        loginValuesRef.current = tempLoginValues;
    }
  }
  function handleSubmitButton(e: React.MouseEvent<HTMLButtonElement>){
    
    if (e){
      let tempLoginValues = loginValuesRef.current;
      let tempErrors = newLoginValues();

      tempLoginValues.email.includes("@") === false ? tempErrors.email = "Enter valid email" : tempErrors.email =''; 
 
      tempLoginValues.password.length < 6 ? tempErrors.password = "password must be minimum 6 symbols" : 
      tempLoginValues.password.length > 32 ? tempErrors.password = "password must be maximum 32 symbols" : tempErrors.password ='';

      setInputErrors(tempErrors);
    }
  }

return (
<div>
  <form className={styles['login-form']}>
    {inputErrors.email}
    <input
      placeholder = "email"
      data-type = "email"
      onChange = {(e) =>{handleInputChange(e)}}
    />

    {inputErrors.password}
  <input
      placeholder = "password"
      data-type = "password"
      onChange = {(e) =>{handleInputChange(e)}}
    />
        
  </form>
  <button 
    onClick={(e)=>{handleSubmitButton(e)}}
  >
    Submit form

  </button>

</div>
)
}

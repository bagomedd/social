'use client'
//import React, { ChangeEvent } from 'react'
import { useState, useRef } from "react"
import styles from "@/styles/registerPage.module.css"
export default function registerPage() {

  interface IRegisterValues {
    "email" : string,
    "username": string,
    "password": string,
    "confirmPassword" :string
  }
  function newRegisterValues() : IRegisterValues {
    return {
    "email" : "",
    "username": "",
    "password": "",
    "confirmPassword" :""
  }}
  const registerValuesRef = useRef<IRegisterValues>(newRegisterValues());
  const [inputErrors,setInputErrors] = useState<IRegisterValues>(newRegisterValues());


  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>){
    if (e){
        let inputField = e.target.dataset['type'];
        let inputValue = e.target.value;

        let tempRegisterValues = {...registerValuesRef.current};

        inputField === "email" ? tempRegisterValues.email = inputValue : ""; 
        inputField === "username" ? tempRegisterValues.username = inputValue : ""; 
        inputField === "password" ? tempRegisterValues.password = inputValue : ""; 
        inputField === "confirmPassword" ? tempRegisterValues.confirmPassword = inputValue : ""; 
        registerValuesRef.current = tempRegisterValues;
    }
  }
  function handleSubmitButton(e: React.MouseEvent<HTMLButtonElement>){
    
    if (e){
      let tempRegisterValues = registerValuesRef.current;
      let tempErrors = newRegisterValues();

      tempRegisterValues.email.includes("@") === false ? tempErrors.email = "Enter valid email" : tempErrors.email =''; 
      
      tempRegisterValues.username.length < 5 ? tempErrors.username = "username must be minimum 5 symbols" : 
      tempRegisterValues.username.length > 15 ? tempErrors.username = "username must be maximum 15 symbols" : tempErrors.username ='';
      
      tempRegisterValues.password.length < 6 ? tempErrors.password = "password must be minimum 6 symbols" : 
      tempRegisterValues.password.length > 32 ? tempErrors.password = "password must be maximum 32 symbols" : tempErrors.password ='';
      
      tempRegisterValues.confirmPassword.length < 6 ? tempErrors.confirmPassword = "email must be minimum 6 symbols" : 
      tempRegisterValues.confirmPassword.length > 32 ? tempErrors.confirmPassword = "email must be maximum 32 symbols" : tempErrors.confirmPassword ='';

      tempRegisterValues.password !== tempRegisterValues.confirmPassword ? tempErrors.confirmPassword += "\npassword must be the same" : null;

      setInputErrors(tempErrors);
    }
  }

return (
<div>
  <form className={styles['register-form']}>
    {inputErrors.email}
    <input
      placeholder = "email"
      data-type = "email"
      onChange = {(e) =>{handleInputChange(e)}}
    />
{inputErrors.username}
  <input
      placeholder = "username"
      data-type = "username"
      onChange = {(e) =>{handleInputChange(e)}}
    />
    {inputErrors.password}
  <input
      placeholder = "password"
      data-type = "password"
      onChange = {(e) =>{handleInputChange(e)}}
    />
        {inputErrors.confirmPassword}
  <input
      placeholder = "Confirm password"
      data-type = "confirmPassword"
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

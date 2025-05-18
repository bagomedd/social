export interface IRegisterValues {
    "email" : string,
    "username": string,
    "password": string,
    "confirmPassword" :string
  }


export function newRegisterValues() : IRegisterValues {
    return {
    "email" : "",
    "username": "",
    "password": "",
    "confirmPassword" :""
  }}
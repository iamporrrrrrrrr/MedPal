"use client"
import { React,useState,useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useContext } from 'react';
import { GlobalStateContext } from './context/GlobalState';
import "./styles/Login.css"


export default function Login(){

  const { setIsSignedIn, setPatientInfo, patients, setPatients } = useContext(GlobalStateContext);
  
  const router = useRouter()
  
  const [input,setInput] = useState("")

  // const [patients, setPatients] = useState([])

  // useEffect(() => {
  //   async function fetchPatients() {
  //       try {
  //           const response = await fetch('/api/patients');
  //           const data = await response.json();
  //           setPatients(data);
  //       } catch (error) {
  //           console.error("Failed to fetch patients:", error);
  //       }
  //   }
  //   fetchPatients();
  // }, []);

  // useEffect(() => {
  //   async function fetchPatients() {
  //     const response = await fetch("/patient-data.json")
  //     const data = await response.json()
  //     setPatients(data)
  //   }

  //   fetchPatients()
  // }, [])

  function handleSubmit(e){
    e.preventDefault()
    const patient = patients.find(e => {
      return e.id == input
    })
    if(patient){
      setIsSignedIn(true)
      setPatientInfo(patient)
      router.push("/Home")
    }
  }


  return(
    <div className="page login-page">
      <div className="login-container">
        <div className="login-name">MedPal</div>
        <img src="./assets/medicine.svg" className="login-logo"/>
        <div className="login-header">Login</div>
        <div className="login-desc">Please Enter ID</div>
        <form onSubmit={handleSubmit} className="login-form"> 
          <input 
            value= {input} 
            onChange={e => setInput(e.target.value)} 
            type="text" 
            id="patient-id"
          />
          <button className="login-submit">Retrieve Info</button>
        </form>
        <div className="login-manage" onClick={() => router.push("/Manage")}> 
          Manage Patient
        </div>
        {/* {JSON.stringify(patients)} */}
      </div>
    </div>
  )
}
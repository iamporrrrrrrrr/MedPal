"use client"
import {React, useEffect, useState, useContext} from "react"
import { GlobalStateContext } from '../../context/GlobalState';
import Link from "next/link"
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import "../../styles/Manage.css"

export default function Manage() {
    const { curPatient, setCurPatient, patients, handleDeletePatient } = useContext(GlobalStateContext);
    const router = useRouter();
  
    return (
      <div className="page manage-page">
      <div className="manage-top">
          <span>Medicine</span>
          <button onClick={() => {
            setCurPatient({
              id: "",
              name: "",
              sex: "",
              dob: "",
              medicalInfo: "",
              meds: [],
              emptyTubes: [1, 2, 3, 4, 5, 6, 7, 8],
              log: [],
            });
            router.push("/Register")}} 
            className="manage-top-button">
              <Image src="/assets/plus.svg" alt="" layout="responsive" width={1} height={1} /> 
          </button> 
      </div>
      <hr/>
      <div className="list-container">
          {patients.length==0 && "No Patient"}
          {patients.map((patient,index) => {
              return (
                  <div key = {index}>
                      <div className="manage-list-element" key={patient.name}>
                          {/* <div className="list-tube">Tube {med.info.Tube}</div> */}
                          <div className="list-main">
                                <span>{patient.id} | {patient.name}</span>

                                <button className='delete-btn'
                                    onClick={() => {handleDeletePatient(patient.id)}}
                                >
                                    <Image src="/assets/trash.svg" alt="" className="trash" layout="responsive" width={1} height={1} /> 
                                </button>

                                <button className="edit-btn"
                                    onClick = {() => {
                                        setCurPatient(patient)
                                        router.push('/Register')
                                    }}
                                >
                                    <Image src="/assets/right-arrow.svg" alt="" className="right-arrow" layout="responsive" width={1} height={1}/> 
                                </button>

                          </div>
                      </div>
                      <hr/>
                  </div>
              )
          })}
      </div>
      <Link href='/'>
          <div className="to-home-container">
              <Image src="/assets/home.svg" alt="" className='to-home' layout="responsive" width={1} height={1}/> 
          </div>
      </Link>
  </div>
    )
}
  
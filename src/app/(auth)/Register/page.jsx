"use client"
import {React, useEffect, useState } from "react"
import { useRouter } from 'next/navigation'
import DynamicInput from "../../components/DynamicInput"
import { useContext } from 'react';
import { GlobalStateContext } from '../../context/GlobalState';
import '../../styles/Register.css'

export default function Register(){
    const {curPatient, setCurPatient, handleAddPatient, handleUpdatePatient } = useContext(GlobalStateContext);
    const router = useRouter()

    function handleSubmit(e){
        e.preventDefault()
        // if(curMed == {Name:"", Type:"", Dosage:"", Interval:"", Duration:"", Instruction:"", Description:"", Time:[""], Tube:0, Take:false}) return


        if(curPatient.sex==="") curPatient.sex = "M"

        // if(!curMed.Tube) curMed.Tube = Math.min(...patientInfo.emptyTubes)

        // if(!('Take' in curMed)) curMed.Take = false

        // addMed(curMed)
        if(curPatient.id=='') handleAddPatient(curPatient)
        else handleUpdatePatient(curPatient)

        setCurPatient({ id: '', name: '', sex: '', dob: '', medicalInfo:' ',meds:[], emptyTubes: [1,2,3,4,5,6,7,8], log: []})

        router.push("/Manage")
    }

    function handleCancel(){
        setCurPatient({ id: '', name: '', sex: '', dob: '', medicalInfo:' ',meds:[], emptyTubes: [1,2,3,4,5,6,7,8], log: []})
        router.push("/Manage")
    }

    return(
        <div className="page register-page">
            <form onSubmit={handleSubmit} className="new-item-form"> 
            <div className="form-content">
                <div className="form-row form-name">
                    <label htmlFor="name">Patient Name</label>
                    <input 
                    value= {curPatient.name} 
                    onChange={e => setCurPatient({...curPatient, name: e.target.value})} 
                    type="text" 
                    id="name"
                    />
                </div>
                <div className="form-sex form-row">
                    <label htmlFor="sex">Gender</label>
                    <select name="sex" id="sex" defaultValue={curPatient.sex} onChange={e => setCurPatient({...curPatient, sex: e.target.value})}>
                        <option value="M">M</option>
                        <option value="F">F</option>
                    </select>
                </div>

                <div className="form-dob form-row">
                    <label htmlFor="dob">Date of Birth</label>
                    <input 
                    value= {curPatient.dob} 
                    onChange={e => setCurPatient({...curPatient, dob: e.target.value})} 
                    type="date" 
                    id="dob"
                    lang="en-US"
                    />
                </div>

                <div className="form-medical-info form-row">
                    <label htmlFor="medical-info">Medical Information</label>
                    <textarea id="medical-info" rows="15" value= {curPatient.medicalInfo} 
                    onChange={e => setCurPatient({...curPatient, medicalInfo: e.target.value})} />
                </div>

            </div>
            
            <div className="form-footer">
                <button type="button" className="form-cancel" onClick={() => handleCancel()}> Cancel</button>
                <button className="form-submit">Done</button>
            </div>
            </form>
        </div>
    )
}
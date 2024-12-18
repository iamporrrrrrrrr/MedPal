"use client"
import {React, useEffect} from "react"
import Link from "next/link"
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { useContext } from 'react';
import { GlobalStateContext } from '../../context/GlobalState';
import "../../styles/PatientInfo.css"

export default function PatientInfo(){
    const { patientInfo, setPatientInfo, time, addMed } = useContext(GlobalStateContext);

    const router = useRouter()

    useEffect(() => {
        const formattedTime = `${String(time.getHours()).padStart(2, '0')}:${String(time.getMinutes()).padStart(2, '0')}`;
        const medAlarm = patientInfo.meds.filter(med => med.info.Time.includes(formattedTime) && !time.getSeconds());
        medAlarm.map(med => {
            addMed({...med.info, Take:true})
        })
        if(medAlarm.length && !time.getSeconds()){
            router.push('/Alarm')
        }
    },[time])

    let formattedDOB = (new Date(patientInfo.dob)).toLocaleDateString('en-us', {year:"numeric", month:"short", day:'numeric'});
    
    return(
        <div className="page patient-info-page">
            <div className="patient-info-header">
                Patient Information
            </div>
            <div className="patient-info-img-section">
                <div className="patient-info-img-container">
                    <Image src={`/assets/patient-img/${patientInfo.sex}.jpg`} alt="" className="patient-info-img"  layout="responsive" width={1} height={1}/>
                </div>
            </div>
            <div className="patient-info-text-container">
                <div className="patient-info-text">
                    Patient ID: <span className="patient-info-subtext">{patientInfo.id}</span>
                </div>
                <div className="patient-info-text">
                    Name: <span className="patient-info-subtext">{patientInfo.name}</span>
                </div>
                <div className="patient-info-text">
                    Gender: <span className="patient-info-subtext">{patientInfo.sex == 'M' ? 'Male': patientInfo.sex == 'F' ? 'Female' : 'Others'}</span>
                </div>
                <div className="patient-info-text">
                    Date of Birth: <span className="patient-info-subtext">{formattedDOB}</span>
                </div>
                <div className="patient-info-text">
                    Medical Information: 
                </div>
                <div className="patient-info-medicalInfo">
                    {patientInfo.medicalInfo}
                </div>
            </div>
            <Link href='/Home'>
                <div className="to-home-container">
                    <Image src="/assets/home.svg" alt="" className='to-home' layout="responsive" width={1} height={1}/> 
                </div>
            </Link>
        </div>
    )
}
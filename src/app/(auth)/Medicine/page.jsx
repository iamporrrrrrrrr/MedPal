"use client"
import {React, useEffect} from "react"
import Link from "next/link"
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { useContext } from 'react';
import { GlobalStateContext } from '../../context/GlobalState';
import '../../styles/Medicine.css'

export default function Medicine(){
    const {addMed, setCurMed, deleteMed, time, patientInfo} = useContext(GlobalStateContext);

    const router = useRouter()

    useEffect(() => {
        const formattedTime = `${String(time.getHours()).padStart(2, '0')}:${String(time.getMinutes()).padStart(2, '0')}`;
        const medAlarm = patientInfo.meds.filter(med => med.info.Time.includes(formattedTime));
        medAlarm.map(med => {
            addMed({...med.info, Take:true})
        })
        if(medAlarm.length && !time.getSeconds()){
            router.push('/Alarm')
        }
    },[time])
    
    return(
        <div className="page medicine-page">
            <div className="med-top">
                <span>Medicine</span>
                <button onClick = {() => router.push('/MedicineConfig')}>
                    <Image src="/assets/plus.svg" alt="" layout="fill" /> 
                </button> 
            </div>
            <hr/>
            <div className="list-container">
                {patientInfo.meds.length==0 && "No Pending Medicine"}
                {patientInfo.meds.map((med,index) => {
                    return (
                        <div key = {index}>
                            <div className="list-element" key={med.info.Name}>
                                <div className="list-tube">Tube {med.info.Tube}</div>
                                <div className="list-main">
                                    <span>{med.info.Name}</span>

                                    <button className='delete-btn'
                                        onClick = {() => deleteMed(med.info)}    
                                    >
                                        <Image src="/assets/trash.svg" alt="" className="trash" layout="fill" /> 
                                    </button>

                                    <button className="edit-btn"
                                        onClick = {() => {
                                            setCurMed(med.info)
                                            router.push('/MedicineConfig')
                                        }}
                                    >
                                        <Image src="/assets/right-arrow.svg" alt="" className="right-arrow" layout="fill"/> 
                                    </button>

                                </div>
                            </div>
                            <hr/>
                        </div>
                    )
                })}
            </div>
            <Link href='/Home'>
                <div className="to-home-container">
                    <Image src="/assets/home.svg" alt="" className='to-home' layout="fill"/> 
                </div>
            </Link>
        </div>
    )
}
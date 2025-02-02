"use client"
import {React, useEffect} from "react"
import Link from "next/link"
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { useContext } from 'react';
import { GlobalStateContext } from '../../context/GlobalState';
import "../../styles/History.css"

export default function History(){
    const { patientInfo, time, addMed } = useContext(GlobalStateContext);

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

    
    
    return(
        <div className="page history-page">
            {/* {JSON.stringify(patientInfo.log)} */}
            <div className="history-header">
                Medicine History
            </div>
            <div className="history-list-container">
                {patientInfo.log.length==0 && "No Medicine History"}
                {patientInfo.log.map(med => {
                    const medTime = new Date(med.Time)
                    return(
                        <div className='history-list' key= {crypto.randomUUID()}>
                            <div className="history-list-left">
                                <span className='history-list-header'>
                                    {med.Name+" | "+med.Dosage+" "+med.Type+"(s)"} 
                                </span>
                                <span className='history-list-time'>
                                    {`${String(medTime.getHours()).padStart(2, '0')}:${String(medTime.getMinutes()).padStart(2, '0')}`}
                                </span>
                            </div>
                            <hr className='ver-line'/>
                            <div className='history-list-text'>
                                {`${String(medTime.getDate()).padStart(2, '0')}/${String(medTime.getMonth()).padStart(2, '0')}/${medTime.getFullYear()}`}
                            </div>   
                        </div> 
                    ) 
                })}
            </div>
            <Link href='/Home'>
                <div className="to-home-container">
                    <Image src="/assets/home.svg" alt="" className='to-home' layout="responsive" width={1} height={1}/> 
                </div>
            </Link>
        </div>
    )
}
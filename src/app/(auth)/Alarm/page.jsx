"use client"
import { React,useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { useContext } from 'react';
import { GlobalStateContext } from '../../context/GlobalState';
import '../../styles/Alarm.css'
import InfoPopUp from '../../components/InfoPopUp'

export default function Alarm(){

    const { time, addMed, patientInfo } = useContext(GlobalStateContext);

    const router = useRouter()
    
    function findMed(){
        const medAlarm = patientInfo.meds.filter(med => med.info.Take === true);
        if(medAlarm.length) return medAlarm
        return -1
    }

    const [showInfo,setShowInfo] = useState({show:false,info:0})

    return(
        <div className='page alarm-page'>
            <div className="alarm-time">
                {`${String(time.getHours()).padStart(2, '0')}:${String(time.getMinutes()).padStart(2, '0')}`}
            </div>
            <div className="alarm-img-container">
                <Image src="/assets/medicine.svg" alt="" className='med-img' layout="responsive" width={1} height={1} />
            </div>
            <div className="alarm-top">
                {findMed()!==-1 && findMed().map(med => {
                    return(
                        <div key= {crypto.randomUUID()}>
                            {med.info.Name + ' | '+med.info.Dosage+' '+med.info.Type+'(s)'}
                            <button className='alarm-med-info' onClick = {() => setShowInfo({show:true,info:med.info})}> i </button> 
                        </div>
                    )
                })}
                {findMed()===-1&&"No Pending Medicine"}
            </div>
            <button onClick={()=> {
                patientInfo.meds.map(med => {
                    addMed({...med.info,Take:false})
                })
                router.back()
            }}>I have taken the medicine</button>
            {showInfo.show===true && <InfoPopUp info = {showInfo.info} setShowInfo = {setShowInfo}/>}
        </div>
    )
}
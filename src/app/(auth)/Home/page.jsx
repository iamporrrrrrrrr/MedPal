"use client"
import { React, useEffect,useState } from 'react'
import Link from "next/link"
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { useContext } from 'react';
import { GlobalStateContext } from '../../context/GlobalState';
import Clock from "../../components/Clock"
import MedicineList from "../../components/MedicineList"
import Sidebar from "../../components/Sidebar"
import '../../styles/Home.css'

export default function Home(){

    const { addMed, time, patientInfo} = useContext(GlobalStateContext);
    const [openSidebar,setOpenSidebar] = useState(false)

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
        <div className='page home-page'>
            <div className="home-top">   
                <div className='home-top-top'>
                    <div className='profile-container' onClick={()=>setOpenSidebar(true)}>
                        <Image src="/assets/user-solid.svg" alt="" className='profile'  layout="responsive" width={1} height={1}/> 
                    </div>
                    <span className="name-container">{patientInfo.name.toUpperCase()}</span>
                </div>    
                <Clock time = {time}/>
            </div>
            <div className="home-bottom">
                <span>Upcoming</span>
                <MedicineList meds = {patientInfo.meds} time = {time}/>
                <Link href="/Medicine">
                    <div className="to-list-container">
                        <Image src="/assets/three-lines.svg" alt="" layout="responsive" width={1} height={1}/> 
                    </div>
                </Link>
            </div>
            {openSidebar && <Sidebar patientInfo={patientInfo} setOpenSidebar={setOpenSidebar}/>}
        </div>
    )
}
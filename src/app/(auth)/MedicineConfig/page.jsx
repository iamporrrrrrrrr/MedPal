"use client"
import {React, useEffect} from "react"
import { useRouter } from 'next/navigation'
import DynamicInput from "../../components/DynamicInput"
import { useContext } from 'react';
import { GlobalStateContext } from '../../context/GlobalState';
import '../../styles/MedicineConfig.css'

export default function MedicineConfig(){
    const { addMed, curMed, setCurMed, time, patientInfo} = useContext(GlobalStateContext);
    
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


    function handleSubmit(e){
        e.preventDefault()
        if(curMed == {Name:"", Type:"", Dosage:"", Interval:"", Duration:"", Instruction:"", Description:"", Time:[""], Tube:0, Take:false}) return


        if(curMed.Type==="") curMed.Type = "Tablet"

        if(!curMed.Tube) curMed.Tube = Math.min(...patientInfo.emptyTubes)

        if(!('Take' in curMed)) curMed.Take = false

        addMed(curMed)

        setCurMed({Name:"", Type:"", Dosage:"", Interval:"", Duration:"", Instruction:"", Description:"", Time:[""], Tube:0, Take:false})

        router.push("/Medicine")
    }

    function handleCancel(){
        setCurMed({Name:"", Type:"", Dosage:"", Interval:"", Duration:"", Instruction:"", Description:"", Time:[""], Tube:0, Take:false})
        router.push("/Medicine")
    }

    return(
        <div className="page config-page">
            <form onSubmit={handleSubmit} className="new-item-form"> 
            <div className="form-content">
                <div className="form-row form-name">
                    <label htmlFor="name">Medicine Name</label>
                    <input 
                    value= {curMed.Name} 
                    onChange={e => setCurMed({...curMed, Name: e.target.value})} 
                    type="text" 
                    id="name"
                    />
                </div>
                <div className="form-type form-row">
                    <label htmlFor="type">Type</label>
                    <select name="type" id="type" defaultValue={curMed.Type} onChange={e => setCurMed({...curMed, Type: e.target.value})}>
                        <option value="Tablet">Tablet</option>
                        <option value="Capsule">Capsule</option>
                        <option value="Others">Others</option>
                    </select>
                </div>

                <div className="form-dosage form-row">
                    <label htmlFor="dosage">Dosage</label>
                    <input 
                    value= {curMed.Dosage} 
                    onChange={e => setCurMed({...curMed, Dosage: e.target.value})} 
                    type="number" 
                    id="dosage"
                    />
                </div>

                <div className="form-interval form-row">
                    <label htmlFor="interval">Interval <span className="form-subtext-days">(Days)</span></label>
                    <input 
                    value= {curMed.Interval} 
                    onChange={e => setCurMed({...curMed, Interval: e.target.value})} 
                    type="number" 
                    id="interval"
                    />
                </div>

                <div className="form-duration form-row">
                    <label htmlFor="duration">Duration <span className="form-subtext-days">(Days)</span></label>
                    <input 
                    value= {curMed.Duration} 
                    onChange={e => setCurMed({...curMed, Duration: e.target.value})} 
                    type="number" 
                    id="duration"
                    />
                </div>

                <DynamicInput curMed = {curMed} setCurMed = {setCurMed}/>

                <div className="form-instruction form-row">
                    <label htmlFor="instruction">Instruction</label>
                    <textarea id="instruction" rows="4" value= {curMed.Instruction} 
                    onChange={e => setCurMed({...curMed, Instruction: e.target.value})} />
                </div>

                <div className="form-description form-row">
                    <label htmlFor="description ">Description</label>
                    <textarea id="description" rows="4" value= {curMed.Description} 
                    onChange={e => setCurMed({...curMed, Description: e.target.value})} />
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
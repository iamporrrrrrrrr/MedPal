import { React } from 'react'

export default function MedicineList({meds, time}){

    const colorList = ["#4E9DDD","#DD4E4E","#FFDF5E"]

    function expandMed(meds){
        return meds.map(med => {
            return med.info.Time.map(time => {return {...(med.info),TimeSing: time}}) 
        }).flat(Infinity).sort(function(a,b) {return (a.TimeSing < b.TimeSing)? -1:(a.TimeSing > b.TimeSing)? 1:(a.Name < b.Name)? -1:1})
    }
    return(
        <div className="alarm">
            {meds.length==0 && "No Pending Medicine"}
            {expandMed(meds).filter(med => med.TimeSing > `${String(time.getHours()).padStart(2,'0')}:${String(time.getMinutes()).padStart(2,'0')}`).map(med => {
                return(
                    <div className='alarm-list' style={{borderColor: colorList[med.Tube%3]}} key= {crypto.randomUUID()}>
                            <div className="alarm-left">
                                <span className='alarm-header'>
                                    {med.Name+" | "+med.Dosage+" "+med.Type+"(s)"} 
                                </span>
                                <span className='alarm-time'>
                                    {med.TimeSing}
                                </span>
                            </div>
                            <hr className='ver-line'/>
                            <div className='alarm-text'>
                                {med.Description}
                            </div>
                        
                    </div>
                    
                ) 
            })}
            {expandMed(meds).filter(med => med.TimeSing <= `${String(time.getHours()).padStart(2,'0')}:${String(time.getMinutes()).padStart(2,'0')}`).map(med => {
                return(
                    <div className='alarm-list' style={{borderColor: colorList[med.Tube%3]}} key= {crypto.randomUUID()}>
                            <div className="alarm-left">
                                <span className='alarm-header'>
                                    {med.Name+" | "+med.Dosage+" "+med.Type+"(s)"} 
                                </span>
                                <span className='alarm-time'>
                                    {med.TimeSing}
                                </span>
                            </div>
                            <hr className='ver-line'/>
                            <div className='alarm-text'>
                                {med.Description}
                            </div>
                        
                    </div>
                    
                )
            })}
            {/* {JSON.stringify(expandMed(meds))} */}
        </div>
    )
}
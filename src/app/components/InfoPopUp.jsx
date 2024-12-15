export default function InfoPopUp({info,setShowInfo}){

    return(
        <div className='info-container'>
            <div className="info-button-container">
                <button onClick={() => setShowInfo({ok:false,info:''})}>x</button>
            </div>
            <div className="info-name">{info.Name}</div>
            <span className="info-dosage-head info-head">Dosage: </span>
            <span className="info-dosage">{info.Dosage+' '+info.Type+'(s)'}</span>
            <div className="info-instruction-head info-head">Instruction:</div>
            <div className="info-instruction">{info.Instruction}</div>
            <div className="info-description-head info-head">Description: </div>
            <div className="info-description">{info.Description}</div>
        </div>
    )
}
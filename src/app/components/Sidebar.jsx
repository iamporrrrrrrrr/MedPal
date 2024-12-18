import { React } from 'react'
import Link from 'next/link'
import Image from 'next/image'



export default function Sidebar({patientInfo, setOpenSidebar}){

    return(
        <div className='sidebar-page'>
            <div className="sidebar-container">
                <button className="sidebar-close">
                    <div className="sidebar-close-icon-container">
                        <Image src="/assets/close.svg" alt="" className="sidebar-close-icon" onClick={()=>setOpenSidebar(false) } layout="responsive" width={1} height={1} />
                    </div>
                </button>
                <div className="sidebar-img-section">
                    <div className="sidebar-img-container">
                        <Image src={`/assets/patient-img/${patientInfo.sex}.jpg`} alt="" className="patient-img"  layout="responsive" width={1} height={1}/>
                    </div>
                    <div className="sidebar-name">
                        {(patientInfo.name).toUpperCase()}
                        <Link href="/">
                            <div className="sidebar-logout-container">
                                <Image src="/assets/logout.svg" alt="" className="sidebar-logout" layout="responsive" width={1} height={1} />
                            </div>
                            
                        </Link>
                    </div>
                </div>
                <Link href="/PatientInfo" style={{ textDecoration: 'none' }}>
                    <div className="sidebar-option">
                        <div className="sidebar-icon-container">
                            <Image src="/assets/user-solid-dark.svg" alt="" className="sidebar-icon" layout="responsive" width={1} height={1} />
                        </div>
                        Patient Information
                    </div>
                </Link>
                <Link href="/Medicine" style={{ textDecoration: 'none' }}>
                    <div className="sidebar-option">
                        <div className="sidebar-icon-container">
                            <Image src="/assets/medicine-dark.svg" alt="" className="sidebar-icon" layout="responsive" width={1} height={1} />
                        </div>
                        Medicine Information
                    </div>
                </Link>
                <Link href="/History" style={{ textDecoration: 'none' }}>
                    <div className="sidebar-option">
                        <div className="sidebar-icon-container">
                            <Image src="/assets/history.svg" alt="" className="sidebar-icon" layout="responsive" width={1} height={1}/>
                        </div>
                        History
                    </div>
                </Link>
            </div>
        </div>
    )
}
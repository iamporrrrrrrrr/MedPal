"use client"
import { createContext, useState, useEffect } from 'react';

export const GlobalStateContext = createContext();

export function GlobalStateProvider({ children }) {

  const [patients, setPatients] = useState([])
  const [patientInfo, setPatientInfo] = useState(() => {
    // if (typeof window !== 'undefined'){
    //   const localValue = localStorage.getItem('PATIENTINFO');
    //   return localValue ? JSON.parse(localValue) : { id: '', name: '', meds:[], emptyTubes: [1,2,3,4,5,6,7,8] };
    // }
    return { id: '', name: '', sex: '', dob: '', meds:[], emptyTubes: [1,2,3,4,5,6,7,8], log: []};
  });

  // const [meds, setMeds] = useState(() => {
  //   const localValue = localStorage.getItem('MEDS');
  //   return localValue ? JSON.parse(localValue) : [];
  // });

  const [isSignedIn, setIsSignedIn] = useState(() => {
    // if (typeof window !== 'undefined'){
    //   const localValue = localStorage.getItem('ISSIGNEDIN');
    //   return localValue ? JSON.parse(localValue) : false;
    // }
    return false;
  });

  const [curMed, setCurMed] = useState(() => {
    // if (typeof window !== 'undefined'){
    // const localValue = localStorage.getItem('CURMED');
    // return localValue ? JSON.parse(localValue) : { Name: '', Type: '', Dosage: '', Interval: '', Duration: '', Instruction: '', Description: '', Time: [''], Tube: 0 };
    // }
    return { Name: '', Type: '', Dosage: '', Interval: '', Duration: '', Instruction: '', Description: '', Time: [''], Tube: 0 };
  });

  const [curPatient, setCurPatient] = useState(() => {
    return { id: '', name: '', sex: '', dob: '', meds:[], emptyTubes: [1,2,3,4,5,6,7,8], log: []}
  });

  // const [emptyTubes, setEmptyTubes] = useState(() => {
  //   const localValue = localStorage.getItem('TUBES');
  //   return localValue ? JSON.parse(localValue) : [1, 2, 3, 4, 5, 6, 7, 8];
  // });

  const [time, setTime] = useState(new Date());

  // Synchronize states with localStorage
  useEffect(() => {
    const intervalId = setInterval(() => setTime(new Date()), 1000);
    if (typeof window !== 'undefined'){
      const localCurMed = localStorage.getItem('CURMED');
      setCurMed(localCurMed ? JSON.parse(localCurMed) : { Name: '', Type: '', Dosage: '', Interval: '', Duration: '', Instruction: '', Description: '', Time: [''], Tube: 0 })
      const localIsSignedIn = localStorage.getItem('ISSIGNEDIN');
      setIsSignedIn(localIsSignedIn ? JSON.parse(localIsSignedIn) : false)
      const localPatientInfo = localStorage.getItem('PATIENTINFO');
      setPatientInfo(localPatientInfo ? JSON.parse(localPatientInfo) : { id: '', name: '', sex: '', dob: '', medicalInfo:' ',meds:[], emptyTubes: [1,2,3,4,5,6,7,8], log: []})
      const localCurPatient = localStorage.getItem('CURPATIENT');
      setCurPatient(localCurPatient ? JSON.parse(localCurPatient) : { id: '', name: '', sex: '', dob: '', medicalInfo:' ',meds:[], emptyTubes: [1,2,3,4,5,6,7,8], log: []})
      // console.log(
      //   "INNINININ", (localPatientInfo ? localPatientInfo:"NO")
      // )
    }
    fetchPatients()
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    // const initial = { id: '', name: '', sex: '', dob: '', meds:[], emptyTubes: [1,2,3,4,5,6,7,8], log: []}
    if (typeof window !== 'undefined') localStorage.setItem('PATIENTINFO', JSON.stringify(patientInfo));
    if(JSON.stringify(patientInfo) !== JSON.stringify({ id: '', name: '', sex: '', dob: '', meds:[], emptyTubes: [1,2,3,4,5,6,7,8], log: []})) handleUpdatePatient(patientInfo)
  }, [patientInfo]);

  useEffect(() => {
    // const initial = { id: '', name: '', sex: '', dob: '', meds:[], emptyTubes: [1,2,3,4,5,6,7,8], log: []}
    if (typeof window !== 'undefined' ) localStorage.setItem('CURPATIENT', JSON.stringify(curPatient));
  }, [curPatient]);

  // useEffect(() => {
  //   localStorage.setItem('MEDS', JSON.stringify(meds));
  // }, [meds]);

  useEffect(() => {
    // const initial = false
    if (typeof window !== 'undefined' ) localStorage.setItem('ISSIGNEDIN', JSON.stringify(isSignedIn));
  }, [isSignedIn]);

  useEffect(() => {
    // const initial = { Name: '', Type: '', Dosage: '', Interval: '', Duration: '', Instruction: '', Description: '', Time: [''], Tube: 0 }
    if (typeof window !== 'undefined') localStorage.setItem('CURMED', JSON.stringify(curMed));
  }, [curMed]);


  const addMed = (medInfo) => {
    setPatientInfo((e) => {
      return {...e, meds: [...e.meds.filter((todo) => todo.info.Name !== medInfo.Name), { id: crypto.randomUUID(), info: medInfo }], emptyTubes: e.emptyTubes.filter((e) => e !== medInfo.Tube).sort()};
    });
  };

  const deleteMed = (medInfo) => {
    setPatientInfo((e) => {
      return {...e, meds: e.meds.filter((todo) => todo.info !== medInfo), emptyTubes: ([...e.emptyTubes, medInfo.Tube]).sort()};
    });
  };

  const fetchPatients = async () => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/patients`);
        const data = await response.json();
        setPatients(data);
    } catch (error) {
        console.error("Failed to fetch patients:", error);
    }
}

  const handleAddPatient = async () => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/patients`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(curPatient),
        });

        if (!response.ok) {
            throw new Error('Failed to add patient');
        }

        // Refresh the patient list
        fetchPatients();
        // Clear input fields
    } catch (error) {
        console.error('Error adding patient:', error);
    }
};

const handleDeletePatient = async (id) => {
  try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/patients`, {
          method: 'DELETE',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id }),
      });

      if (!response.ok) {
          throw new Error('Failed to delete patient');
      }

      // Refresh the patient list
      fetchPatients();
  } catch (error) {
      console.error('Error deleting patient:', error);
  }
};

const handleUpdatePatient = async (patient) => {
  try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/patients`, {
          method: 'PATCH',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(patient),
      });

      if (!response.ok) {
          throw new Error('Failed to update patient');
      }

      // Refresh the patient list
      fetchPatients();
  } catch (error) {
      console.error('Error updating patient:', error);
  }
};



  return (
    <GlobalStateContext.Provider
      value={{
        patientInfo,
        setPatientInfo,
        //meds,
        //setMeds,
        isSignedIn,
        setIsSignedIn,
        curMed,
        setCurMed,
        //emptyTubes,
        //setEmptyTubes,
        time,
        addMed,
        deleteMed,
        curPatient,
        setCurPatient,
        patients,
        setPatients,
        handleAddPatient,
        handleDeletePatient,
        handleUpdatePatient
      }}
    >
      {children}
    </GlobalStateContext.Provider>
  );
}

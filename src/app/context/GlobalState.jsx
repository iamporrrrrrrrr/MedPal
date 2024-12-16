"use client"
import { createContext, useState, useEffect } from 'react';

export const GlobalStateContext = createContext();

export function GlobalStateProvider({ children }) {
  const [patientInfo, setPatientInfo] = useState(() => {
    // if (typeof window !== 'undefined'){
    //   const localValue = localStorage.getItem('PATIENTINFO');
    //   return localValue ? JSON.parse(localValue) : { id: '', name: '', meds:[], emptyTubes: [1,2,3,4,5,6,7,8] };
    // }
    return { id: '', name: '', meds:[], emptyTubes: [1,2,3,4,5,6,7,8] };
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
        setPatientInfo(localPatientInfo ? JSON.parse(localPatientInfo) : { id: '', name: '', meds:[], emptyTubes: [1,2,3,4,5,6,7,8] })
      }
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') localStorage.setItem('PATIENTINFO', JSON.stringify(patientInfo));
  }, [patientInfo]);

  // useEffect(() => {
  //   localStorage.setItem('MEDS', JSON.stringify(meds));
  // }, [meds]);

  useEffect(() => {
    if (typeof window !== 'undefined') localStorage.setItem('ISSIGNEDIN', JSON.stringify(isSignedIn));
  }, [isSignedIn]);

  useEffect(() => {
    if (typeof window !== 'undefined') localStorage.setItem('CURMED', JSON.stringify(curMed));
  }, [curMed]);

  // useEffect(() => {
  //   localStorage.setItem('TUBES', JSON.stringify(emptyTubes));
  // }, [emptyTubes]);

  const addMed = (medInfo) => {
    setPatientInfo((e) => {
      return {...patientInfo, meds: [...e.meds.filter((todo) => todo.info.Name !== medInfo.Name), { id: crypto.randomUUID(), info: medInfo }], emptyTubes: e.emptyTubes.filter((e) => e !== medInfo.Tube).sort()};
    });
  };

  const deleteMed = (medInfo) => {
    setPatientInfo((e) => {
      return {...patientInfo, meds: e.meds.filter((todo) => todo.info !== medInfo), emptyTubes: ([...e.emptyTubes, medInfo.Tube]).sort()};
    });
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
      }}
    >
      {children}
    </GlobalStateContext.Provider>
  );
}

export default function AddDynamicInputFields({curMed, setCurMed}) {

  const handleAddInput = () => {
    setCurMed({...curMed,Time: [...curMed.Time, ""]});
  };

  const handleChange = (event, index) => {
    let onChangeValue = [...curMed.Time];
    onChangeValue[index] = event.target.value;
    setCurMed({...curMed, Time: onChangeValue});
  };

  const handleDeleteInput = (index) => {
    const newArray = [...curMed.Time];
    newArray.splice(index, 1);
    setCurMed({...curMed, Time: newArray});
  };


  return (
    <div className="form-row form-time">
        <span> Time </span>
        <div className="dynamic-container">
          {curMed.Time.map((item, index) => (
              <div className = "dynamic-container-child" key={index}>
                <div className="dynamic-input" key={index}>
                  <input
                      name="time"
                      type="time"
                      value={item}
                      onChange={(event) => handleChange(event, index)}
                  />

                  {curMed.Time.length > 1 && (
                      <button type="button" onClick={() => handleDeleteInput(index)} key= {crypto.randomUUID()}>X</button>
                  )}
                </div>
                  {index === curMed.Time.length - 1 && (
                      <button type="button" onClick={() => handleAddInput() }className="dynamic-add" key= {crypto.randomUUID()}>
                        +
                      </button>
                  )}
              </div>
          ))}
        </div>
        

      {/* <div className="body"> {JSON.stringify(curMed.Time)} </div> */}
    </div>
  );
}

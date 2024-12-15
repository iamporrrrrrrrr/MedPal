export default function Clock({time}){
  
    function formatTime(){
      let hours = time.getHours()
      let minutes = time.getMinutes()
  
      return `${String(hours).padStart(2,'0')}:${String(minutes).padStart(2,'0')}`
    }

    function formatDate(){
      let dayArr = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']
      let monthArr = ['January','February','March','April','May','June','July','August','September','October','November','December']
      let day = dayArr[time.getDay()]
      let date = time.getDate()
      let month = monthArr[time.getMonth()]

      return `${day}, ${String(date)} ${month}`
    }

    return(
        <div className='clock-container'>
            <div className='clock-time'>{formatTime()}</div>
            <div className='clock-date'>{formatDate()}</div>
        </div>
    )
}
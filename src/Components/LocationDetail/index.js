import './locationDetail.css'

const LocationDetail = ({weatherDetails}) => {
    console.log('weatherDetails', weatherDetails)
    return (
        <div className="location-detail-main">
            <div className='temprature-txt-container'>
                <span className="temprature-txt">{Number((weatherDetails?.main?.temp || 0) - 273.15).toFixed(2)}</span>
                <span className="degree-txt">° C</span>
            </div>
            <div className='date-container'>
                <span className='date-txt'>{new Date().toDateString()}</span>
                <span className='day-time-txt'>{new Date().toLocaleTimeString()}</span>
            </div>
        </div>
    )
}

export default LocationDetail;
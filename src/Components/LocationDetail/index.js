import './locationDetail.css'

const LocationDetail = ({weatherDetails}) => {
    console.log(weatherDetails)
    return (
        <div className="location-detail-main">
            <div className='temprature-txt-container'>
                <span className="temprature-txt">{Number((weatherDetails?.main?.temp || 0) - 273.15).toFixed(2)}</span>
                <span className="degree-txt">° C</span>
            </div>
            <div className='date-container'>
                <span className='date-txt'>17th Jun ‘21</span>
                <span className='day-time-txt'>Thrusday   |   2:45 am</span>
            </div>
        </div>
    )
}

export default LocationDetail;
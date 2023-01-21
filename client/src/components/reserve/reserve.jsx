import { faCalendarXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useFetch from "../../hooks/useFetch";
import "./reserve.css";

const Reserve = ({setOpen, hotelId}) => {
    const {data, loading, error} = useFetch(`http://localhost:2000/api/hotels/room/${hotelId}`)

    return (
        <div className="reserve">
            <div className="rContainer">
                <FontAwesomeIcon icon={faCalendarXmark} className="rClose" onClick={() => setOpen(false)}/>
                {data.map(i => (
                    <div className="rItem">
                        <div className="rItemInfo">
                            <div className="rTitle">{i.titile}</div>
                            <div className="rDesc">{i.desc}</div>
                            <div className="rMax">max People:{i.maxPeople}</div>
                        </div>
                    </div>
                ))

                }
            </div>
        </div>
    );
};

export default Reserve;
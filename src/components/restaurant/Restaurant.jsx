import { useNavigate, useParams } from "react-router-dom";
import Loader from "../loader/Loader";
import { useEffect, useState } from "react";
import { Button } from "@mui/material";

function Restaurant() {
    const params = useParams();
    const { id } = params;
    const [showLoader, setShowLoader] = useState(false);
    const [restaurantData, setRestaurantData] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        setShowLoader(true);
        fetch('/api/restaurant/' + id)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setShowLoader(false);
                setRestaurantData(data);
                console.log({ data })
            })
    }, []);

    const backToHome = () => {
        navigate('/');
    }

    return (
        <div className="restaurantContainer">
            {showLoader ? <Loader /> : (
                <div>
                    <div style={{ textAlign: 'left'}}><Button variant="text" onClick={backToHome}>Back to Home</Button></div>
                    <h3>{restaurantData['Restaurant Name']}</h3>
            <img className="food-img" src='https://picsum.photos/400/150'/>
                {Object.keys(restaurantData).map(key => (
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px'}}>
                        <div style={{ fontWeight: '500' }}>{key}</div>
                        <div>{restaurantData[key]}</div>
                        </div>
                ))}
                    </div>
            )}
            {}
        </div>
    )
}

export default Restaurant;
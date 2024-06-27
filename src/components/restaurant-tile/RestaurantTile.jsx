import { useNavigate } from 'react-router-dom';
import './restaurant-tile.css'

function getRating(rating) {
    if (rating > 4) {
        return 'green';
    }
    if (rating > 3) {
        return 'orange';
    }
    return 'red';
}

function RestaurantTile(props) {
    const {} = props;
    const rating = props['Aggregate rating'];
    const avgCost = props['Average Cost for two'];
    const openForDelivery = props['Is delivering now'];

    return (
        <div className="restaurant-tile" onClick={() => props.navigateToRestaurant(props['Restaurant ID'])}>
            <img className="food-img" src='https://picsum.photos/200/150'/>
            <div className='name-rating'>
                <div className='restaurantName'>{props["Restaurant Name"]}</div>
                <div className={`rating ${getRating(rating)}`}>{props['Aggregate rating']}</div>
            </div>
            <div className='name-rating'>
                <div className='cuisine'>{props["Cuisines"]}</div>
                <div className={`cost`}>&#8377;{avgCost}</div>
            </div>
        </div>
    );
}

export default RestaurantTile;

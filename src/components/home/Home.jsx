import { useEffect, useState } from "react";
import Loader from "../loader/Loader";
import Pagination from '@mui/material/Pagination';
import RestaurantTile from "../restaurant-tile/RestaurantTile";
import './home.css';
import { useNavigate } from "react-router-dom";
import { Input } from "@mui/material";
import FilterDrawer from "../filter-drawer/FilterDrawer";
import FilterListIcon from '@mui/icons-material/FilterList';

export function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => {
      clearTimeout(handler);
    };
  }, [value]);

  return debouncedValue;
}


function Home() {
    const [showLoader, setShowLoader] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const searchTerm = useDebounce(searchQuery, 500);
    const [restaurantsData, setRestaurantsData] = useState([]);
    const [perPage, setPerPage] = useState(10);
    const [totalRecords, setTotalRecords] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedCuisine, setSelectedCuisine] = useState('');
    const [selectedCountryCode, setSelectedCountryCode] = useState('');
    const [filterDrawer, setFilterDrawer] = useState(false);
    const [filterList, setFilterList] = useState({});
    const navigate = useNavigate();
    useEffect(() => {
        setShowLoader(true);
        fetch('/api/restaurants?page_number='+currentPage+'&search_query='+searchTerm+"&cuisine="+selectedCuisine+'&country='+selectedCountryCode)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setShowLoader(false);
                setRestaurantsData(data.restaurants);
                setPerPage(data.per_page);
                setTotalRecords(data.total);
                console.log({ data })
            })
    }, [currentPage, searchTerm, selectedCuisine, selectedCountryCode]);

    useEffect(() => {
        fetch('/api/filter')
        .then(response => response.json())
        .then(data => {
            console.log(data);
            setFilterList(data);
        })
    }, []);
    const navigateToRestaurant = (id) => {
        navigate('/restaurant/' + id);
    }

    const onPageChange = (e, newPage) => {
        window.scrollTo(0, 0);
        console.log({ newPage})
        setCurrentPage(newPage)
    }

    const onTextChange = (e) => {
        setSearchQuery(e.target.value);
    }
    
    const onCuisine = (cuisine) => {
        setCurrentPage(1);
        setSelectedCuisine(cuisine);
    }

    console.log({ selectedCuisine})

    const onFilterClick = () => {
        setFilterDrawer(true);
    }
    const onClose = () => {
        setFilterDrawer(false);
    }

    const onCountry = countryCode => {
        setCurrentPage(1);
        setSelectedCountryCode(countryCode);
    }

    console.log({ filterDrawer});


    return (
        <div style={{ width: '100%'}}>
            {showLoader ? <Loader /> : <>
            <h3>Restaurant App</h3>
            <div>
                
            <Input
                placeholder="Search for restaurant"
                value={searchQuery}
                onChange={onTextChange}
            />
            <FilterListIcon onClick={onFilterClick} />
            </div>
            {restaurantsData?.length === 0 && <div>No restaurant found</div>}
            <div className="restaurant-tile-container">
                {restaurantsData?.map((item) => <RestaurantTile {...item} navigateToRestaurant={navigateToRestaurant} />)}
            </div>
            {(!showLoader && restaurantsData?.length > 0 &&  <Pagination page={currentPage} count={Math.ceil(totalRecords/perPage)} onChange={onPageChange} />)}
            </>}
            <FilterDrawer filterList={filterList} onCuisine={onCuisine} onClose={onClose} open={filterDrawer} onCountry={onCountry} />
        </div>
    );
}

export default Home;
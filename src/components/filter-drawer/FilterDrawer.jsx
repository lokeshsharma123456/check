import { Checkbox, Drawer, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from "@mui/material";
function FilterDrawer(props) {
    const {
        open,
        onClose,
        onCuisine,
        filterList,
        onCountry,
    } = props;
    const onCuisineSelect = (e) => {
        onCuisine(e.target.value)
    }

    const onCountrySelect = (e) => {
        onCountry(e.target.value);
    }
    return (
        <Drawer open={open} onClose={onClose} className="filter-drawer" anchor="right">
            <div className="cuisine-filter">
                <FormControl>
                    <FormLabel id="demo-radio-buttons-group-label"><b>Cuisine</b></FormLabel>
                    <div className="cuisines-list">
                        <RadioGroup
                            aria-labelledby="demo-radio-buttons-group-label"
                            defaultValue="female"
                            name="radio-buttons-group"
                            onChange={onCuisineSelect}
                        >
                            {filterList?.cuisines?.map(item => (
                                <FormControlLabel value={item} control={<Radio />} label={item} />
                            ))}
                        </RadioGroup>
                    </div>
                </FormControl>
                <FormControl>
                    <FormLabel id="demo-radio-buttons-group-label"><b>Country</b></FormLabel>
                    <div className="cuisines-list">
                        <RadioGroup
                            aria-labelledby="demo-radio-buttons-group-label"
                            defaultValue="female"
                            name="radio-buttons-group"
                            onChange={onCountrySelect}
                        >
                            {filterList?.country_codes?.map(item => (
                                <FormControlLabel value={item.id} control={<Radio />} label={item.name} />
                            ))}
                        </RadioGroup>
                    </div>
                </FormControl>
            </div>
        </Drawer>
    );
}

export default FilterDrawer;

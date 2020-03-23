import Select from 'react-select';
import Router from 'next/router';

const DynamicSelect = props => {
    let selectOptions = [];

    // build select data
    if (props.allCountries) {
        Object.keys(props.allCountries).forEach(country => {
            const countryFlag = props.allCountries[country].flag;
            selectOptions.push({
                value: country,
                label: countryFlag + ' ' + country
            })
        });
    }

    const onSelectChange = (e) => {
        Router.push('/country/' + e.value)
    }

    return (
        <div className="abs">
            <label className="visually-hidden" htmlFor="countries-select">Search for a country</label>
            <Select
                id="countries-select"
                onChange={onSelectChange}
                options={selectOptions} 
                placeholder="Search for a specific country"
            />
        </div>
    )
}

export default DynamicSelect;
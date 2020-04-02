import Link from 'next/link'
import Panel from '../Panel';

import { figureFormatter } from '../../utils/formatter';

import './index.css';

const List = ({ title, data, property }) => (
    <div className="country-list__group">
        <h3 className="country-list__title">{title}</h3>
        <ul className="country-list__list scrollbar">
            {(data || []).map((country, i) => (
                <li className="country-list__list-item" key={i}>
                    <span>{figureFormatter(country[property])}</span>
                    <Link href="/country/[country]" as={`/country/${country.name}`}>
          <a>{country.name}</a>
        </Link>
                </li>
            ))}
        </ul>
    </div>
);

const CountryList = (props) => {
    const totalCasesData = [];
    const activeData = [];
    const deathsData = [];
    const recoveredData = [];
    
    Object.keys(props.results).forEach((country, i) => {
        const countryData = props.results[country];
        const lastDayData = countryData[countryData.length - 1];
        const actualActiveCases = lastDayData.confirmed - lastDayData.deaths - lastDayData.recovered;
        
        if (lastDayData.confirmed > 0) {
            totalCasesData.push({ name: country, confirmed: lastDayData.confirmed });
        }
        if (actualActiveCases > 0) {
            activeData.push({ name: country, active: actualActiveCases });
        }
        if (lastDayData.deaths > 0) {
            deathsData.push({ name: country, deaths: lastDayData.deaths });
        }
        if (lastDayData.recovered > 0) {
            recoveredData.push({ name: country, recovered: lastDayData.recovered });
        }
    });

    totalCasesData.sort(function (a, b) {
        return b.confirmed - a.confirmed;
    });

    activeData.sort(function (a, b) {
        return b.active - a.active;
    });

    deathsData.sort(function (a, b) {
        return b.deaths - a.deaths;
    });

    recoveredData.sort(function (a, b) {
        return b.recovered - a.recovered;
    });

    return (
        <Panel className="country-list">
            <List
                title="Total confirmed cases"
                data={totalCasesData}
                property="confirmed"
            />
            <List
                title="Total active cases"
                data={activeData}
                property="active"
            />
            <List
                title="Total recovered cases"
                data={recoveredData}
                property="recovered"
            />
            <List
                title="Total deaths"
                data={deathsData}
                property="deaths"
            />
        </Panel>
    );
}

export default CountryList;
import Panel from "../Panel";
import List from "./List";
import { sortAscOrder } from "../../utils/formatter";
import "./index.css";

const CountryList = ({ results }) => {
    const totalCasesData = [];
    const activeData = [];
    const deathsData = [];

    for (const country in results) {
        const countryData = results[country];
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
    }

    totalCasesData.sort(sortAscOrder);
    activeData.sort(sortAscOrder);
    deathsData.sort(sortAscOrder);

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
                title="Total deaths"
                data={deathsData}
                property="deaths"
            />
        </Panel>
    );
};

export default CountryList;
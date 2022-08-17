import Layout from "../../components/layout";
import fetch from "isomorphic-unfetch";
import ComparePanel from "../../components/ComparePanel";
import CountryChart from "../../components/CountryChart";
import DailyCasesChart from "../../components/DailyCasesChart";
import { ALL_DATA_API } from "../../constants/settings";

const Country = ({results, country }) => {

    if (!results) {
        return (
            <React.Fragment>
                <h1>{country}</h1>
                <h2>No cases of Covid-19 reported in this country.</h2>
            </React.Fragment>
        );
    }

    const currentDay = results[results.length - 1];
    const prevDay = results[results.length - 2];

    let totalCurrentActive = currentDay.confirmed - currentDay.recovered - currentDay.deaths;
    let totalPreviousActive = prevDay.confirmed - prevDay.recovered - prevDay.deaths;

    return (
        <Layout>
            <h2 className="page-title">{country}</h2>
            <div className="panel-group">
                <ComparePanel className="compare--total" title="Total Confirmed" current={currentDay.confirmed} prev={prevDay.confirmed} />
                <ComparePanel className="compare--active" title="Currently Active" current={totalCurrentActive} prev={totalPreviousActive} />
                <ComparePanel className="compare--deaths" title="Deaths" current={currentDay.deaths} prev={prevDay.deaths} />
            </div>
            <DailyCasesChart results={results} />
            <CountryChart results={results} />
        </Layout>
    );
};

Country.getInitialProps = async (context) => {
    const { country } = context.query;
    const res = await fetch(ALL_DATA_API);
    const data = await res.json();
    return { country, results: data[country] };
};

export default Country;
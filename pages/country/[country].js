import Layout from '../../components/layout';
import fetch from 'isomorphic-unfetch';

import ComparePanel from '../../components/ComparePanel';
import CountryChart from '../../components/CountryChart';
import DailyCasesChart from '../../components/DailyCasesChart';

const Country = props => {

    if (!props.results) {
        return (
            <React.Fragment>
                <h1>{props.country}</h1>
                <h2>No cases of Covid-19 reported in this country.</h2>
            </React.Fragment>
        )
    }

    const currentDay = props.results[props.results.length - 1];
    const prevDay = props.results[props.results.length - 2];

    let totalCurrentActive = currentDay.confirmed - currentDay.recovered - currentDay.deaths;
    let totalPreviousActive = prevDay.confirmed - prevDay.recovered - prevDay.deaths;

    return (
        <Layout>
            <h2 style={{marginTop: '30px'}}>{props.country}</h2>
            <div className="panel-group">
                <ComparePanel className="compare--total" title="Total Confirmed" current={currentDay.confirmed} prev={prevDay.confirmed} />
                <ComparePanel className="compare--active" title="Currently Active" current={totalCurrentActive} prev={totalPreviousActive} />
                <ComparePanel className="compare--recovered" title="Recovered" current={currentDay.recovered} prev={prevDay.recovered} />
                <ComparePanel className="compare--deaths" title="Deaths" current={currentDay.deaths} prev={prevDay.deaths} />
            </div>
            <DailyCasesChart results={props.results} />
            <CountryChart results={props.results} />
        </Layout>
    )
};

Country.getInitialProps = async function (context) {
    const { country } = context.query;
    const res = await fetch(`https://pomber.github.io/covid19/timeseries.json`);
    const data = await res.json();
    return { country, results: data[country] };
};

export default Country;
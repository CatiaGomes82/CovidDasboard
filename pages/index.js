import Layout from "../components/layout";
import useSWR from "swr";
import Head from "next/head";
import ComparePanel from "../components/ComparePanel";
import CountryList from "../components/CountryList";
import { ALL_DATA_API } from "../constants/settings";
import { fetcher } from "../utils/fetcher";
import { sortAscOrder } from "../utils/formatter";

const Index = () => {
    const { data: results } = useSWR(ALL_DATA_API, fetcher);

    let totalCurrentConfirmed = 0;
    let totalPreviousConfirmed = 0;

    let totalCurrentActive = 0;
    let totalPreviousActive = 0;

    let totalCurrentRecovered = 0;
    let totalPreviousRecovered = 0;

    let totalCurrentDeaths = 0;
    let totalPreviousDeaths = 0;

    // current cases everywhere
    let currentData = [];

    if (results) {
        for (const country in results) {
            const countryData = results[country];
            const latestData = countryData[countryData.length - 1];
            const yesterdayData = countryData[countryData.length - 2];

            totalCurrentConfirmed = totalCurrentConfirmed + latestData.confirmed;
            totalPreviousConfirmed = totalPreviousConfirmed + yesterdayData.confirmed;

            totalCurrentActive = totalCurrentActive + (latestData.confirmed - latestData.recovered - latestData.deaths);
            totalPreviousActive = totalPreviousActive + (yesterdayData.confirmed - yesterdayData.recovered - yesterdayData.deaths);

            totalCurrentRecovered = totalCurrentRecovered + latestData.recovered;
            totalPreviousRecovered = totalPreviousRecovered + yesterdayData.recovered;

            totalCurrentDeaths = totalCurrentDeaths + latestData.deaths;
            totalPreviousDeaths = totalPreviousDeaths + yesterdayData.deaths;

            currentData.push({ country: country, confirmed: latestData.confirmed - latestData.recovered - latestData.deaths })
        }

        currentData.sort(sortAscOrder);
    }

    return (
        <React.Fragment>
            <Head>
                <title>Covid-19 Global trends</title>
            </Head>
            <Layout>
                {results ? (
                    <React.Fragment>
                        <div className="panel-group">
                            <ComparePanel className="compare--total" title="Total Confirmed" current={totalCurrentConfirmed} prev={totalPreviousConfirmed} />
                            <ComparePanel className="compare--active" title="Active Confirmed" current={totalCurrentActive} prev={totalPreviousActive} />
                            <ComparePanel className="compare--deaths" title="Deaths" current={totalCurrentDeaths} prev={totalPreviousDeaths} />
                        </div>
                        <CountryList
                            title="Confirmed Cases by Country"
                            results={results}
                        />
                    </React.Fragment>
                ) : (
                    <p>Loading</p>
                )}
            </Layout>
        </React.Fragment>
    );
};

export default Index;
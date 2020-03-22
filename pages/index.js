import { useState } from 'react';
import Layout from '../components/layout';
import useSWR from 'swr';
import Head from 'next/head';
import Link from 'next/link';

import ComparePanel from '../components/ComparePanel';
import DynamicSelect from '../components/DynamicSelect';

import { COUNTRIES_API, ALL_DATA_API } from '../constants/settings';
import { figureFormatter } from '../utils/formatter';

function fetcher(url) {
    return fetch(url).then(r => r.json());
}

const Index = () => {
    const { data: results } = useSWR(ALL_DATA_API, fetcher);
    const { data: allCountries } = useSWR(COUNTRIES_API, fetcher);

    let totalCurrentConfirmed = 0;
    let totalPreviousConfirmed = 0;

    let totalCurrentActive = 0;
    let totalPreviousActive = 0;

    let totalCurrentRecovered = 0;
    let totalPreviousRecovered = 0;

    let totalCurrentDeaths = 0;
    let totalPreviousDeaths = 0;

    let currentData = [];

    if (results) {
        Object.keys(results).forEach(country => {
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


            currentData.push({ country: country, confirmed: latestData.confirmed })
        });
    }

    currentData.sort(function (a, b) {
        return b.confirmed - a.confirmed;
    });

    return (
        <React.Fragment>
            <Head>
                <title>Covid-19 Global trends</title>
            </Head>
            <Layout>
                {results ? (
                    <React.Fragment>
                        <div style={{ marginTop: 40 }}>
                            <DynamicSelect allCountries={allCountries} />
                        </div>
                        <div className="panel-group">
                            <ComparePanel className="compare--total" title="Total Confirmed" current={totalCurrentConfirmed} prev={totalPreviousConfirmed} />
                            <ComparePanel className="compare--active" title="Active Confirmed" current={totalCurrentActive} prev={totalPreviousActive} />
                            <ComparePanel className="compare--recovered" title="Recovered" current={totalCurrentRecovered} prev={totalPreviousRecovered} />
                            <ComparePanel className="compare--deaths" title="Deaths" current={totalCurrentDeaths} prev={totalPreviousDeaths} />
                        </div>
                        <div>
                            <h4>Confirmed Cases by Country</h4>
                            <ul>
                                {currentData.map((country, i) => (
                                    <li key={i}>
                                        {country.country} - {figureFormatter(country.confirmed)}
                                    </li>
                                ))}
                            </ul>
                        </div>

                    </React.Fragment>
                ) : (
                        <p>Loading</p>
                    )}
            </Layout>
        </React.Fragment>
    );
}

export default Index;
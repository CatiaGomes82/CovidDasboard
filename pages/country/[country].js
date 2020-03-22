import Layout from '../../components/layout';
import fetch from 'isomorphic-unfetch';
import { ResponsiveLine } from '@nivo/line';
import ComparePanel from '../../components/ComparePanel';

const Country = props => {

    if (!props.results) {
        return (
            <React.Fragment>
                <h1>{props.country}</h1>
                <h2>No cases of Covid-19 reported in this country.</h2>
            </React.Fragment>
        )
    }

    let graphData = [];

    // confirmed data // index 0
    graphData.push({
        id: "Confirmed cases",
        color: "hsl(130, 70%, 50%)",
        data: []
    })

    // deaths // index 1
    graphData.push({
        id: "Deaths",
        color: "hsl(122, 70%, 50%)",
        data: []
    })

    // recovered // index 2
    graphData.push({
        id: "Recovered",
        color: "hsl(130, 70%, 50%)",
        data: []
    })

    props.results.forEach(day => {
        //if (day.confirmed < 100) return null
        if (day.confirmed === 0) return null

        // confirmed
        graphData[0].data.push({ x: day.date, y: day.confirmed })
        // deaths
        graphData[1].data.push({ x: day.date, y: day.deaths })
        // deaths
        graphData[2].data.push({ x: day.date, y: day.recovered })
        //deaths.push({ x: new Date(day.date), y: day.deaths })
        //recovered.push({ x: new Date(day.date), y: day.recovered })
    })

    const currentDay = props.results[props.results.length - 1];
    const prevDay = props.results[props.results.length - 2];

    let totalCurrentActive = currentDay.confirmed - currentDay.recovered - currentDay.deaths;
    let totalPreviousActive = prevDay.confirmed - prevDay.recovered - prevDay.deaths;

    return (
        <Layout>
            <h2>{props.country}</h2>
            <div className="panel-group">
                <ComparePanel className="compare--total" title="Total Confirmed" current={currentDay.confirmed} prev={prevDay.confirmed} />
                <ComparePanel className="compare--active" title="Active Confirmed" current={totalCurrentActive} prev={totalPreviousActive} />
                <ComparePanel className="compare--recovered" title="Recovered" current={currentDay.recovered} prev={prevDay.recovered} />
                <ComparePanel className="compare--deaths" title="Deaths" current={currentDay.deaths} prev={prevDay.deaths} />
            </div>
            <div style={{ height: '500px' }}>
                <ResponsiveLine
                    margin={{ top: 20, right: 20, bottom: 60, left: 80 }}
                    data={graphData}
                    xScale={{
                        type: 'time',
                        format: '%Y-%m-%d',
                        precision: 'day',
                    }}
                    xFormat="time:%b %d"
                    yScale={{
                        type: 'linear',
                        stacked: false,

                    }}
                    // axisLeft={{
                    //     tickValues: null
                    // }}
                    axisBottom={{
                        format: '%b %m',
                    }}
                    pointSize={5}
                    pointBorderWidth={1}
                    pointBorderColor={{
                        from: 'color',
                        modifiers: [['darker', 0.3]],
                    }}
                    useMesh={true}
                    enableSlices={false}
                    // tooltip={(e) => {
                    //     console.log(e)
                    //     return (
                    //         <div>
                    //             Yo
                    //         </div>
                    //     )
                    // }}
                    legends={[
                        {
                            anchor: 'bottom',
                            direction: 'row',
                            justify: false,
                            translateX: 0,
                            translateY: 60,
                            itemsSpacing: 0,
                            itemDirection: 'left-to-right',
                            itemWidth: 100,
                            itemHeight: 20,
                            itemOpacity: 0.75,
                            symbolSize: 12,
                            symbolShape: 'circle',
                            symbolBorderColor: 'rgba(0, 0, 0, .5)',
                            effects: [
                                {
                                    on: 'hover',
                                    style: {
                                        itemBackground: 'rgba(0, 0, 0, .03)',
                                        itemOpacity: 1
                                    }
                                }
                            ]
                        }
                    ]}
                />
            </div>
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
import Layout from '../../components/layout';
import fetch from 'isomorphic-unfetch';
import { ResponsiveLine } from '@nivo/line';
import ComparePanel from '../../components/ComparePanel';

import './index.css';


const Tooltip = ({serieId, color, data, ...e}) => {
    console.log(e)
    return (
        <div className="tooltip">
            <h6 style={{ color: color }}>{serieId}</h6>
            <p className="tooltip__desc"><span>{data.xFormatted}:</span> {data.yFormatted}</p>
        </div>
    )
}

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
        id: "Currently active",
        data: []
    })

    // deaths // index 1
    graphData.push({
        id: "Deaths",
        data: []
    })

    // recovered // index 2
    graphData.push({
        id: "Recovered",
        data: []
    })

    props.results.forEach(day => {
        //if (day.confirmed < 100) return null
        if (day.confirmed === 0) return null
console.log(day.date)
        // confirmed
        graphData[0].data.push({ x: day.date, y: day.confirmed })
        // deaths
        graphData[1].data.push({ x: day.date, y: day.deaths })
        // deaths
        graphData[2].data.push({ x: day.date, y: day.recovered })
    })

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
            <div style={{ height: '500px' }}>
                <ResponsiveLine
                    margin={{ top: 40, right: 5, bottom: 60, left: 40 }}
                    data={graphData}
                    colors={['#fa6400','#6236ff', '#1cb142']}
                    xScale={{
                        type: 'time',
                        format: '%Y-%m-%d',
                        precision: 'day',
                    }}
                    colorBy={d => d.color}
                    xFormat="time: %d/%b"
                  
                    axisBottom={{
                        format: '%d/%b',
                    }}
                    pointSize={5}
                    pointBorderWidth={1}
                    pointBorderColor={{
                        from: 'color',
                        modifiers: [['darker', 0.3]],
                    }}
                    useMesh={true}
                    enableSlices={false}
                    tooltip={e => <Tooltip {...e.point} />}
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
                            // effects: [
                            //     {
                            //         on: 'hover',
                            //         style: {
                            //             itemBackground: 'rgba(0, 0, 0, .03)',
                            //             itemOpacity: 1
                            //         }
                            //     }
                            // ]
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
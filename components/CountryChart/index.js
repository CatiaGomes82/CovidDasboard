import { ResponsiveLine } from '@nivo/line';

import { figureFormatter } from '../../utils/formatter';

import './index.css';

const Tooltip = ({ serieId, color, data }) => {
    return (
        <div className="tooltip">
            <h6 style={{ color: color }}>{serieId}</h6>
            <p className="tooltip__desc"><span>{data.xFormatted}:</span> {figureFormatter(data.yFormatted)}</p>
        </div>
    )
}

const CountryChart = (props) => {

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
        if (day.confirmed < 100) return null;

        // confirmed
        graphData[0].data.push({ x: day.date, y: day.confirmed })
        // deaths
        graphData[1].data.push({ x: day.date, y: day.deaths })
        // deaths
        graphData[2].data.push({ x: day.date, y: day.recovered })
    })

    return (
        <React.Fragment>
            <h3 className="country-chart__title">Overall country data (after the first 100 confirmed cases)</h3>
            <div className="country-chart__chart" style={{ height: '500px' }}>
                <ResponsiveLine
                    margin={{ top: 20, right: 5, bottom: 60, left: 50 }}
                    data={graphData}
                    colors={['#fa6400', '#6236ff', '#1cb142']}
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
                    axisLeft={{
                        format: n => figureFormatter(n)
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
        </React.Fragment>
    )
}

export default CountryChart;
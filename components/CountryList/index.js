import { ResponsiveLine } from '@nivo/line';
import Panel from '../Panel';
import DynamicSelect from '../DynamicSelect';

import { figureFormatter } from '../../utils/formatter';

import './index.css';

const CountryList = (props) => {
    let graphData = [
        {
            id: "United Kingdom",
            color: "hsl(130, 70%, 50%)",
            data: [{
                x: 0,
                y: 10
            },
            {
                x: 1,
                y: 9.827839287073898
            }]
        }
    ];

Object.keys(props.filteredCountries).forEach((country) => {
    const countryData = props.filteredCountries[country].data;
    let countryGraphData = []
    let xDays = 0;
    countryData.forEach((item) => {
       //console.log(item)
        // countryGraphData

        if (item.confirmed >= 25) {
            countryGraphData.push({
                x: xDays,
                y: item.confirmed - item.recovered - item.deaths
            })

            xDays += 1;
        }

    })

    graphData.push({
        id: country,
        data: countryGraphData
    })
})    

console.log(props.filteredCountries)

    return (
        <Panel className="country-list">
            {/* <h3>{props.title}</h3> */}
            <div>
                <DynamicSelect
                    allCountries={props.allCountries}
                />
                <h3>Active cases per country</h3>
                <ul className="country-list__list scrollbar">
                    {props.currentData.map((country, i) => (
                        <li className="country-list__list-item" key={i}>
                            <span>{figureFormatter(country.confirmed)}</span>{country.country}
                        </li>
                    ))}
                </ul>
            </div>
            <div style={{ height: '500px' }}>
                <ResponsiveLine
                    margin={{ top: 20, right: 20, bottom: 60, left: 80 }}
                    data={graphData}
                    // xScale={{
                    //     type: 'time',
                    //     format: '%Y-%m-%d',
                    //     precision: 'day',
                    // }}
                    // xFormat="time:%b %d"
                    // yScale={{
                    //     type: 'linear',
                    //     stacked: false,

                    // }}
                    // axisBottom={{
                    //     format: '%b %m',
                    // }}
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
                // legends={[
                //     {
                //         anchor: 'bottom',
                //         direction: 'row',
                //         justify: false,
                //         translateX: 0,
                //         translateY: 60,
                //         itemsSpacing: 0,
                //         itemDirection: 'left-to-right',
                //         itemWidth: 100,
                //         itemHeight: 20,
                //         itemOpacity: 0.75,
                //         symbolSize: 12,
                //         symbolShape: 'circle',
                //         symbolBorderColor: 'rgba(0, 0, 0, .5)',
                //         effects: [
                //             {
                //                 on: 'hover',
                //                 style: {
                //                     itemBackground: 'rgba(0, 0, 0, .03)',
                //                     itemOpacity: 1
                //                 }
                //             }
                //         ]
                //     }
                // ]}
                />
            </div>
        </Panel>
    );
}

export default CountryList;
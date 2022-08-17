import { ResponsiveLine } from "@nivo/line";
import Tooltip from "../Tooltip";
import { figureFormatter } from "../../utils/formatter";
import "./country-chart.module.css";

const CountryChart = (props) => {
    let graphData = [];

    // confirmed data // index 0
    graphData.push({
        id: "Currently active",
        data: []
    });

    // deaths // index 1
    graphData.push({
        id: "Deaths",
        data: []
    });

    props.results.forEach(day => {
        if (day.confirmed < 100) { 
            return null
        };

        // confirmed
        graphData[0].data.push({ x: day.date, y: day.confirmed });
        
        // deaths
        graphData[1].data.push({ x: day.date, y: day.deaths });
    });

    return (
        <React.Fragment>
            <h3 className="country-chart__title">Overall country data (after the first 100 confirmed cases)</h3>
            <div className="country-chart__chart">
                <ResponsiveLine
                    margin={{ top: 20, right: 5, bottom: 60, left: 50 }}
                    data={graphData}
                    colors={["#fa6400", "#6236ff"]}
                    xScale={{
                        type: "time",
                        format: "%Y-%m-%d",
                        precision: "day",
                    }}
                    colorBy={d => d.color}
                    xFormat="time: %d/%b"
                    axisBottom={{
                        format: "%d/%b",
                    }}
                    axisLeft={{
                        format: n => figureFormatter(n)
                    }}
                    pointSize={5}
                    pointBorderWidth={1}
                    pointBorderColor={{
                        from: "color",
                        modifiers: [["darker", 0.3]],
                    }}
                    useMesh={true}
                    enableSlices={false}
                    tooltip={e => <Tooltip title={e.point.serieId} color={e.point.serieColor} dateFormatted={e.point.data.xFormatted} data={e.point.data.y} /> }
                    legends={[
                        {
                            anchor: "bottom",
                            direction: "row",
                            justify: false,
                            translateX: 0,
                            translateY: 60,
                            itemsSpacing: 0,
                            itemDirection: "left-to-right",
                            itemWidth: 100,
                            itemHeight: 20,
                            itemOpacity: 0.75,
                            symbolSize: 12,
                            symbolShape: "circle",
                            symbolBorderColor: "rgba(0, 0, 0, .5)"
                        }
                    ]}
                />
            </div>
        </React.Fragment>
    );
};

export default CountryChart;
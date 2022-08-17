
import { ResponsiveBar } from "@nivo/bar";
import Tooltip from "../Tooltip";
import { figureFormatter, formatDate } from "../../utils/formatter";

const DailyCasesChart = ({ results }) => {
    let graphData = [];
    let reachedMoreThan100 = false;

    results.forEach((day, i) => {
        const prevDay = results[i - 1];

        if (day.confirmed < 100 || typeof prevDay === "undefined") {
            return null
        };

        const dailyNewCases = day.confirmed - prevDay.confirmed;
        reachedMoreThan100 = dailyNewCases >= 100;

        if (reachedMoreThan100) {
            graphData.push({
                Date: day.date,
                Cases: day.confirmed - prevDay.confirmed
            });
        }
    });

    return (
        <React.Fragment>
            <h3 className="country-chart__title">Daily number of confirmed cases (after reaching more than 100 daily cases)</h3>
            <div className="country-chart__chart">
                <ResponsiveBar
                    data={graphData}
                    keys={["Cases"]}
                    indexBy="Date"
                    margin={{ top: 20, right: 5, bottom: 60, left: 50 }}
                    padding={0.2}
                    colors={["#fa6400"]}
                    axisBottom={{
                        format: (e) => formatDate(e)
                    }}
                    axisLeft={{
                        format: n => figureFormatter(n)
                    }}
                    tooltip={e => <Tooltip color={"#fa6400"} title={"Daily Cases"} dateFormatted={formatDate(e.indexValue)} data={e.value} />}
                    enableGridX={true}
                    enableLabel={false}
                    animate={true}
                />
            </div>
        </React.Fragment>
    );
};

export default DailyCasesChart;
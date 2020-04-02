
import { ResponsiveBar } from '@nivo/bar';

import { figureFormatter } from '../../utils/formatter';

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.getDate() + '/' + months[date.getMonth()];
}

const Tooltip = ({ id, indexValue, value, ...props }) => {
    return (
        <div className="tooltip">
            <h6 style={{ color: '#fa6400' }}>Daily Cases</h6>
            <p className="tooltip__desc"><span>{formatDate(indexValue)}:</span> {figureFormatter(value)}</p>
        </div>
    )
}

const DailyCasesChart = (props) => {
    let graphData = [];
    let reachedMoreThan100 = false;

    props.results.forEach((day, i) => {
        const prevDay = props.results[i - 1];
       
        if (day.confirmed < 100 || typeof prevDay === 'undefined') return null;

        const dailyNewCases = day.confirmed - prevDay.confirmed;

        if (dailyNewCases >= 100) {
            reachedMoreThan100 = true;
        }

        if (reachedMoreThan100) {
            graphData.push({
                Date: day.date,
                Cases: day.confirmed - prevDay.confirmed
            })
        }
    })

    return (
        <React.Fragment>
            <h3 className="country-chart__title">Daily number of confirmed cases (after reaching more than 100 daily cases)</h3>
            <div className="country-chart__chart" style={{ height: '500px' }}>
                <ResponsiveBar
                    data={graphData}
                    keys={['Cases']}
                    indexBy="Date"
                    margin={{ top: 20, right: 5, bottom: 60, left: 50 }}
                    padding={0.2}
                    colors={['#fa6400']}
                    axisBottom={{
                        format: (e) => formatDate(e)
                    }}
                    axisLeft={{
                        format: n => figureFormatter(n)
                    }}
                    tooltip={e => <Tooltip {...e} /> }
                    enableGridX={true}
                    enableLabel={false}
                    animate={true}
                />
            </div>
        </React.Fragment>
    )
}

export default DailyCasesChart;
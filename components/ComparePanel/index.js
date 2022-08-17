import Panel from "../Panel";
import { figureFormatter } from "../../utils/formatter";
import "./compare-panel.module.css";

const ComparePanel = ({ className, prev, current, title }) => {
    const differencePercentage = Math.round(100 - (prev * 100 / current));

    const getCharacter = (differencePercentage) => {
        if (differencePercentage === 0) {
            return (<span className="compare__character compare__character--stable">↔</span>)
        }

        if (differencePercentage > 1) {
            return (<span className="compare__character compare__character--increase">⬆</span>)
        } else {
            return (<span className="compare__character compare__character--decrease">⬇</span>)
        }
    };

    return (
        <Panel className={`compare ${className}`}>
            <h3 className="compare__title">{title}</h3>
            <p className="compare__figure">{figureFormatter(current)}</p>
            <p className="compare__difference">
                {getCharacter(differencePercentage)}
                {differencePercentage}%
            </p>
        </Panel>
    );
};

export default ComparePanel;
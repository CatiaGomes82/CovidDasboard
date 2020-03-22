import Panel from '../Panel';
import { figureFormatter } from '../../utils/formatter';
import styles from './compare-panel.module.css';

const ComparePanel = props => {
    const differencePercentage = Math.round(100 - (props.prev * 100 / props.current));

    const getCharacter = (differencePercentage) => {
        if (differencePercentage === 0) {
            return (<span className="compare__character compare__character--stable">↔</span>)
        }

        if (differencePercentage > 1) {
            return (<span className="compare__character compare__character--increase">⬆</span>)
        } else {
            return (<span className="compare__character compare__character--decrease">⬇</span>)
        }
    }

    return (
        <Panel className={`compare ` + props.className}>
            <h3 className="compare__title">{props.title}</h3>
            <p className="compare__figure">{figureFormatter(props.current)}</p>
            <p className="compare__difference">
                {getCharacter(differencePercentage)}
                {differencePercentage}%
            </p>
        </Panel>
    )
}

export default ComparePanel;
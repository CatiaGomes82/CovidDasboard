import { figureFormatter } from "../../utils/formatter";
import "./tooltip.module.css";

const Tooltip = ({ title, color, dateFormatted, data }) => {
    return (
        <div className="tooltip">
            <h6 style={{ color: color }}>{title}</h6>
            <p className="tooltip__desc"><span>{dateFormatted}:</span> {figureFormatter(data)}</p>
        </div>
    );
};

export default Tooltip;
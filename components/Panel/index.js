import './panel.module.css';

const Panel = props => {
    return (
        <div className={`panel ` + props.className}>
            {props.children}
        </div>
    )
}

export default Panel;
import "./panel.module.css";

const Panel = ({ className, children }) => {
    return (
        <div className={`panel ${className}`}>
            {children}
        </div>
    );
};

export default Panel;
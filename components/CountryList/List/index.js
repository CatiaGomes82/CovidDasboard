import Link from "next/link";
import { figureFormatter } from "../../../utils/formatter";

const List = ({ title, data, property }) => (
    <div className="country-list__group">
        <h3 className="country-list__title">{title}</h3>
        <ul className="country-list__list scrollbar">
            {(data || []).map((country, i) => (
                <li className="country-list__list-item" key={i}>
                    <span>{figureFormatter(country[property])}</span>
                    <Link href="/country/[country]" as={`/country/${country.name}`}>
                        <a>{country.name}</a>
                    </Link>
                </li>
            ))}
        </ul>
    </div>
);

export default List;
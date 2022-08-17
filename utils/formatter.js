import { months } from "../constants/settings";

export const figureFormatter = (figure) => {
    return figure.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.getDate() + "/" + months[date.getMonth()];
};

export const sortAscOrder = (a, b) => {
    return b.confirmed - a.confirmed;
};
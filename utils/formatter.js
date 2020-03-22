export const figureFormatter = (figure) => {
    return figure.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
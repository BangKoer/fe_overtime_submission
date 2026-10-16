import currency from "currency.js";

const currencyFormat = (rawValue) => {
        return currency(rawValue, {
            symbol: "Rp ",
            separator: ".",
            decimal: ",",
            precision: 0
        }).format();
    }

export default currencyFormat;
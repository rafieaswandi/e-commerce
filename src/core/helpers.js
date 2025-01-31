export const formatCurrency = (value) => {
    return value.toLocaleString("id-ID", {
        style: "currency",
        currency: "IDR",
        useGrouping: true,
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    });
};
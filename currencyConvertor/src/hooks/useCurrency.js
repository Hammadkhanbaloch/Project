import { useState, useEffect } from "react"

function useCurrency(currency) {
    const [data, setData] = useState({});
    useEffect(() => {
        fetch(`https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${currency}.json
`)
            .then((res) => {
                if (!res.ok) {
                    throw new Error(`Currency "${currency}" not found (Status: ${res.status})`);
                }
                return res.json();
            })
            .then((res) => {
                setData(res[currency]);
            })
            .catch((error) => {
                console.error("Fetch error:", error);
                setError(error.message);
                setData({});
            });
    }, [currency]);
    return data;
}
export default useCurrency;
// `https://api.frankfurter.app/latest?amount=100&from=EUR&to=USD`

import { useEffect, useState } from "react";

export default function App() {
  const [output, setOutput] = useState(1);
  const [amount, setAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState("EUR");
  const [toCurrency, setToCurrency] = useState("USD");
  const [isLoading,setIsLoading] = useState(false)

  // function handleFromCurrency(e) {
  //   console.log(fromCurrency);
  //   setFromCurrency(e);
  // }
  // function handleToCurrency(e) {
  //   console.log(toCurrency);
  //   setToCurrency(e);
  // }

  useEffect(
    function () {
      async function convertedCurrency() {
        setIsLoading(true)
        const result = await fetch(
          `https://api.frankfurter.app/latest?amount=${amount}&from=${fromCurrency}&to=${toCurrency}`
        );
        const data = await result.json();
        setOutput(data.rates[toCurrency]);
        console.log(output);
         setIsLoading(false)
      }
      if(toCurrency === fromCurrency) return setOutput(amount)
      convertedCurrency();
    },
    [amount, fromCurrency, toCurrency]
  );

  return (
    <div>
      <input
        type="text"
        value={amount}
        onChange={(e) => setAmount(Number(e.target.value))}
        disabled={isLoading}
      />
      <select
        value={fromCurrency}
        onChange={(e) => setFromCurrency(e.target.value)}
        disabled={isLoading}
      >
        <option value="USD">USD</option>
        {/* <option value="PKR">PKR</option> */}
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <select
        value={toCurrency}
        onChange={(e) => setToCurrency(e.target.value)}
        disabled={isLoading}
      >
        <option value="USD">USD</option>
        {/* <option value="PKR">PKR</option> */}
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <p>
        {isLoading ?<p>Converting...</p>: <span>
        {output} {toCurrency}
        </span>}
      </p>
    </div>
  );
}

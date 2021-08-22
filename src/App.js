import './App.css';
import {useEffect, useState} from "react";
import RateInput from "./components/RateInput/RateInput";

const LOCAL_STORAGE_NAME = 'rate-usd'

function App() {
  const [rate, setRate] = useState(0);
  const [USDInput, setUSDInput] = useState(0);
  const [ARSInput, setARSInput] = useState(0);
  useEffect(() => {
    const localStorageRate = localStorage.getItem(LOCAL_STORAGE_NAME)
    if (localStorageRate) {
      const value = parseInt(localStorageRate);
      setRate(value);
      return;
    }
    fetch('https://mercados.ambito.com//dolar/informal/variacion')
      .then(response => response.json())
      .then(data => {
        const value = parseInt(data.venta);
        setRate(value);
        localStorage.setItem(LOCAL_STORAGE_NAME, data.venta); // todo: use expiration date
      });
  }, [])
  const onARSChange = (event) => {
    const ARS = event.target.value
    setARSInput(ARS)
    setUSDInput(ARS * rate)
  }
  const onUSDChange = (event) => {
    const USD = event.target.value
    setUSDInput(USD)
    setARSInput(USD / rate)
  }
  return (
    <div className="app">
      <main>
        <h1>Conversor USD - ARS</h1>
        <h2 className="subtitle">Cotización del dólar blue: ${rate === 0 ? '' : rate}</h2>
        <div className="rate-wrapper">
          <RateInput
            onChange={onARSChange}
            value={ARSInput}
            currencyText="ARS"
          />
          <span className="equal-sign">=</span>
          <RateInput
            onChange={onUSDChange}
            value={USDInput}
            currencyText="USD"
          />
        </div>
      </main>
    </div>
  );
}

export default App;

import './App.css';
import {useEffect, useState} from "react";
import RateInput from "./components/RateInput/RateInput";
import {ReactComponent as GitHubIcon} from "./github.svg";

const LOCAL_STORAGE_NAME = 'rate-usd'
const ONE_HOUR_MILLISECONDS = 3600000
function App() {
  const [rate, setRate] = useState(0);
  const [USDInput, setUSDInput] = useState(0);
  const [ARSInput, setARSInput] = useState(0);
  useEffect(() => {
    const localStorageRate = localStorage.getItem(LOCAL_STORAGE_NAME)
    if (localStorageRate) {
      const value = JSON.parse(localStorageRate);
      const now = new Date()
      if (now.getTime() > value.expiry) {
        localStorage.removeItem(LOCAL_STORAGE_NAME)
      } else {
        setRate(value.value);
        return;
      }
    }
    fetch('https://mercados.ambito.com//dolar/informal/variacion')
      .then(response => response.json())
      .then(data => {
        const value = parseInt(data.venta);
        setRate(value);
        const now = new Date()
        const item = {
          value: value,
          expiry: now.getTime() + ONE_HOUR_MILLISECONDS,
        }
        localStorage.setItem(LOCAL_STORAGE_NAME, JSON.stringify(item))
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
      <header>
        <a
          target="_blank"
          rel="noopener noreferrer"
          className="github-link"
          href="https://github.com/daianaszwimer/dolar-argentina"
        >
          <GitHubIcon alt="GitHub Icon"/>
        </a>
      </header>
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

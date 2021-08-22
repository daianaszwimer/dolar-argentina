import "./RateInput.css"
const RateInput = ({ onChange, value, currencyText }) => (
  <div className="rate-input-wrapper">
    <input
      value={(Math.round(value * 100) / 100).toFixed(2)}
      onChange={onChange}
      type="number"
      min="0"
      className="rate-input"
    />
    <span>{currencyText}</span>
  </div>
)

export default RateInput
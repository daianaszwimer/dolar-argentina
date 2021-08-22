import "./RateInput.css"
const RateInput = ({ onChange, value, currencyText }) => (
  <div className="rate-input-wrapper">
    <input
      value={value}
      onChange={onChange}
      type="number"
    />
    <span>{currencyText}</span>
  </div>
)

export default RateInput
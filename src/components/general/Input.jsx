import './general.css'

function Input({ label, type, className, value, setValue, icon=null, inputAttributes = {} }) {
  const handleInput = (event) => {
    setValue(event.target.value)
  }

  return (
    <div className={`input-wrapper ${className || ''}`}>
      <div className="input-label-container">
        {icon && <span className="input-icon">{icon}</span>}
        {label && <label className="input-label">{label} :</label>}
      </div>
      <input
        type={type}
        value={value}
        onChange={handleInput}
        {...inputAttributes}
        className="input-field"
      />
    </div>
  )
}

export default Input

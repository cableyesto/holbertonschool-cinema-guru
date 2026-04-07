import './general.css'

function Input({ label, type, className, value, setValue, icon=null, inputAttributes = {}, lightText = true }) {
  const handleInput = (event) => {
    setValue(event.target.value)
  }

  return (
    <div className={`input-wrapper ${className || ''}`}>
      <div className="input-label-container">
        {icon && <span className="input-icon">{icon}</span>}
        {label && <label className={`input-label ${lightText ? 'light-text' : 'dark-text'}`}>{label} :</label>}
      </div>
      <input
        type={type}
        value={value}
        onChange={handleInput}
        {...inputAttributes}
        className={`input-field ${lightText ? 'light-text' : 'dark-text'}`}
      />
    </div>
  )
}

export default Input

import './general.css'

function SelectInput({ label, options = [], className = '', value, setValue }) {
  const handleSelect = (event) => {
    setValue(event.target.value)
  }

  return (
    <div className={`input-wrapper ${className}`}>
      <div className='select-input-label-container'>
        {label && <label className="input-label">{label}:</label>}
      </div>
      <select
        value={value}
        onChange={handleSelect}
        className="input-field"
      >
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  )
}

export default SelectInput

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faKey, faUser } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'
import Input from './components/general/Input'
import SelectInput from './components/general/SelectInput'
import Button from './components/general/Button'
import SearchBar from './components/general/SearchBar'

function App() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  return (
    <>
      <div className="App">
        <p>Cinema</p>
        <Input
          label="Username"
          type="text"
          value={email}
          setValue={setEmail}
          icon={<FontAwesomeIcon icon={faUser} />}
        />
        <Input
          label="Password"
          type="password"
          value={password}
          setValue={setPassword}
          icon={<FontAwesomeIcon icon={faKey} />}
        />
        <Input
          label="Min Date"
          type="number"
          value={null}
          setValue={null}
        />
        <SelectInput
          label="Sort"
          options={["Default", "Latest", "Oldest", "Highest Rated", "Lowest Rated"]}
        />
        <p>Test</p>
        <div>
          <Button
            label="Load more..."
          />
          <p>Separator</p>
          <Button
            label="Sign Up"
            icon={<FontAwesomeIcon icon={faKey} />}
          />
        </div>
        <div><p>Separator</p></div>
        <SearchBar /> 
      </div>
    </>
  )
}

export default App

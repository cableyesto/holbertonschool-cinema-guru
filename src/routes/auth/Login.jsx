import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faKey, faUser } from '@fortawesome/free-solid-svg-icons'
import Button from "../../components/general/Button"
import Input from "../../components/general/Input"
import "./auth.css";

function Login({ username, password, setUsername, setPassword }) {
  return (
    <>
      <div className='auth-body'>
        <h4>Sign in with your account</h4>
        <form className="auth-form">
          <Input
            label="Username"
            type="text"
            value={username}
            setValue={setUsername}
            icon={<FontAwesomeIcon icon={faUser} />}
          />
          <Input
            label="Password"
            type="password"
            value={password}
            setValue={setPassword}
            icon={<FontAwesomeIcon icon={faKey} />}
          />
          <div className='auth-form-button'>
            <Button
              label="Sign In"
              icon={<FontAwesomeIcon icon={faKey} />}
            />
          </div>
        </form>
      </div>
    </>
  )
}

export default Login

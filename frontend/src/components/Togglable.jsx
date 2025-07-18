import { useState } from 'react'
import Button from './Button'

const Togglable = props => {
  const [visible, setVisible] = useState(false)

  const showWhenVisible = { display: visible ? '' : 'none' }
  const hideWhenVisible = { display: visible ? 'none' : '' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  return (
    <div>
      <div style={hideWhenVisible}>
        <Button onClick={toggleVisibility}>{props.buttonLabel}</Button>
      </div>

      <div style={showWhenVisible}>
        {props.children}

        <Button onClick={toggleVisibility}>cancel</Button>
      </div>
    </div>
  )
}

export default Togglable
import { useState, forwardRef, useImperativeHandle } from 'react'
import Button from './Button'

const Togglable = forwardRef(({ children, buttonLabel, onClick }, refs) => {
  const [visible, setVisible] = useState(false)

  const showWhenVisible = { display: visible ? '' : 'none' }
  const hideWhenVisible = { display: visible ? 'none' : '' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(refs, () => {
    return {
      toggleVisibility
    }
  })

  return (
    <div>
      <div style={hideWhenVisible} onClick={onClick}>
        <Button onClick={toggleVisibility}>{buttonLabel}</Button>
      </div>

      <div style={showWhenVisible}>
        {children}

        <Button onClick={toggleVisibility} variant="cancel">cancel</Button>
      </div>
    </div>
  )
})

export default Togglable
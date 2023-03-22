import React from 'react'
import './toggle.css'

const Toggle = () => {
  return (
    <div>
      <input type='checkbox' id='check' className='toggle' />
      <label for='check'>Unit</label>
    </div>
  )
}

export default Toggle
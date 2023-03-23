import React, { useState } from 'react'
import './toggle.css'

const Toggle = ({ handleClickUnit }) => {

  return (
    <div>
      <input type='checkbox' id='check' className='toggle' onClick={handleClickUnit} value="unit" />
      <label for='check'>Unit</label>
    </div>
  )
}

export default Toggle
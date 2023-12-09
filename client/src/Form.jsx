import React from 'react'
import { useState } from 'react'
import './App.css'
function Form() {
    const [input, setInput] = useState({ secret: '', visitesAllowed: 1 })
    const [durationField, setDurationField] = useState(1)
    const setDuration = (newFruit) => {
        setDurationField(newFruit)
    }
    const handleChange = (event) => {
        setInput({ ...input, [event.target.name]: event.target.value })
    }

    console.log(durationField, input)
    return (
        <>
            <form>
                <input required type="text" name="secret" placeholder='Your secret' onChange={handleChange} />
                <input required type="number" name="name" placeholder='Limit the number of visit count' onChange={handleChange} />
                <div>
                    <label>
                        The secret is only accessble for
                    </label>
                    <input type="text" name="duration" placeholder="Duration value" onChange={handleChange} />
                    <select
                        onChange={(event) => setDuration(event.target.value)}
                        value={''}
                    >
                        <option>Select a Duratin field</option>
                        <option value={24 * 60}>Days</option>
                        <option value={60}>Hours</option>
                        <option value={1}>Minutes</option>
                    </select>

                </div>
                <button type="submit">
                    Generate Link
                </button>
            </form>
            <br />
            The secret is only accessble for {input.visitesAllowed} clicks and  destroyed in {durationField} minutes
        </>
    )
}

export default Form
import React from 'react'
import { useState } from 'react'
import Modal from "../Component/Modal";
import axios from 'axios';
import '../App.css'

function Form() {
    const [input, setInput] = useState({ secret: '', visitesAllowed: '', durationTime: '1', durationFiled: '60' })
    const [open, setOpen] = React.useState(false);
    const [response, setResponse] = useState()
    const handleClick = () => {
        setOpen(!open);
    };

    const handleChange = (event) => {
        setInput({ ...input, [event.target.name]: event.target.value })
    }

    console.log(input)
    const handleSubmit = async (event) => {
        event.preventDefault()
        console.log('submitting')
        try {
            const res = await axios.post(`${import.meta.env.VITE_APP_BASE_URL}/`, {
                secret: input.secret,
                visitesAllowed: parseInt(input.visitesAllowed),
                duration: parseInt(input.durationTime) * parseInt(input.durationFiled)
            })
            console.log(res.data.id)
            setResponse(`https://secrets-keeper.vercel.app//secret/${res.data.id}`)
            handleClick()
            setInput('')
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <input required type="text" value={input?.secret} name="secret" placeholder='Your secret' onChange={handleChange} />
                <input required type="number" value={input?.visitesAllowed} name="visitesAllowed" placeholder='Limit the number of visit count' onChange={handleChange} />
                <div>
                    <label>
                        The secret is only accessble for
                    </label>
                    <input type="text" required name="durationTime" value={input?.durationTime} placeholder="Duration value" onChange={handleChange} />
                    <select
                        onChange={(event) => {
                            setInput({ ...input, durationFiled: event.target.value })
                        }}
                        defaultValue="select duration field"
                    >
                        <option>select duration field</option>
                        <option value={1}>Minutes</option>
                        <option value={60}>Hours</option>
                        <option value={24 * 60}>Days</option>
                    </select>

                </div>
                <button type="submit" >
                    Generate Link
                </button>
            </form>
            <br />
            {input?.visitesAllowed &&
                <h2>
                    The secret is only accessble for {input?.visitesAllowed} clicks
                    <br />
                    {input?.durationTime &&
                        <>
                            And will be destroyed in {parseInt(input.durationTime) * parseInt(input.durationFiled)}  minutes
                        </>
                    }
                </h2>
            }
            {response &&
                <button type="button" onClick={handleClick}>
                    Click To see the link
                </button>
            }
            <Modal isOpen={open} onClose={handleClick} link={response} />

            {/* <button onClick={openModal}>Open Modal</button> */}
        </>
    )
}

export default Form
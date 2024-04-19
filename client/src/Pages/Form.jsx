import React from 'react'
import { useState } from 'react'
import Modal from "../Component/Modal";
import axios from 'axios';
import '../App.css'
import { Watch } from 'react-loader-spinner'

function Form() {
    const [input, setInput] = useState({ secret: '', visitesAllowed: '', durationTime: '1', durationFiled: 'hour' })
    const [open, setOpen] = React.useState(false);
    const [response, setResponse] = useState()
    const [isLoaded, setIsLoaded] = useState(false)
    const handleClick = () => {
        setOpen(!open);
    };
    const timeField = {
        minute: 1,
        hour: 60,
        day: 24 * 60
    }
    const handleChange = (event) => {
        setInput({ ...input, [event.target.name]: event.target.value })
    }

    console.log()
    const handleSubmit = async (event) => {
        event.preventDefault()
        console.log('submitting')
        setIsLoaded(true)
        try {
            const res = await axios.post(`https://secret-keeper-ht64.onrender.com/`, {
                secret: input.secret,
                visitesAllowed: parseInt(input.visitesAllowed),
                duration: parseInt(input.durationTime) * parseInt(timeField[input.durationFiled])
            })
            console.log(res.data.id)
            setResponse(`https://secrets-keeper.vercel.app/secret/${res.data.id}`)

            handleClick()
            setInput('')
        } catch (err) {
            console.log(err)
        }
        setIsLoaded(false)
    }
    if (isLoaded) return (
        <>
            <Watch
                height="80"
                width="80"
                radius="48"
                color="#4fa94d"
                ariaLabel="watch-loading"
                wrapperStyle={{}}
                wrapperClassName=""
                visible={true}
            />
        </>
    )
    console.log(isLoaded)
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
                        <option value={"hour"}>Hours</option>
                        <option value={"minute"}>Minutes</option>
                        <option value={"day"}>Days</option>
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
                            And will be destroyed in {parseInt(input.durationTime)} {input.durationFiled}
                            {parseInt(input.durationTime) > 1 ? 's' : ''}
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
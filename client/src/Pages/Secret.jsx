import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
function Secret() {
    const { id } = useParams()
    const [secret, setSecret] = useState()
    const effectRan = useRef(false)
    console.log(import.meta.env.VITE_APP_BASE_URL)
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`${import.meta.env.VITE_APP_BASE_URL}/${id}`)
                console.log(res.data)
                setSecret(res.data)
            } catch (err) {
                console.log(err.response.data.message)
                setSecret({ err: err.response.data.message })
            }
        }
        // to prevent useEffect from running on initial render
        if (!effectRan.current) {
            fetchData()
            effectRan.current = true
        }
    }, [id])
    console.log(secret)
    return (
        <div>
            {secret?.err ? <h1>
                {secret?.err}
            </h1> :
                <>
                    <h1>
                        {secret?.secret}
                    </h1>

                    <h4>
                        It is only accessble for &nbsp;
                        {secret?.remainingVisites} more visits
                    </h4>
                </>
            }


        </div>
    )
}

export default Secret
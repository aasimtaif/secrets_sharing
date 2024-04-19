import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
function Secret() {
    const { id } = useParams()
    const [secret, setSecret] = useState()
    // // 10 minutes timer

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`https://secret-keeper-ht64.onrender.com/${id}`)
                setSecret(res.data)


            } catch (err) {
                console.log(err.response.data.message)
                console.log(err)
                setSecret({ err: err.response.data.message })
            }
        }
        fetchData()
    }, [id])


    return (
        <div>
            {secret?.err ? <h1>
                {secret?.err}
            </h1> :
                <>
                    <h1>
                        {secret?.secret}
                    </h1>

                    {secret && <h4>
                        It is only accessble for &nbsp;
                        {secret?.remainingVisites} more visits
                    </h4>}
                </>
            }


        </div>
    )
}

export default Secret
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './Secret.css';

const getTimeRemaining = (validTill) => {
    const now = new Date().getTime();
    const deadline = new Date(validTill).getTime();

    const timeDiff = deadline - now;

    // Handle expired secrets gracefully
    if (timeDiff <= 0) {
        return 'Secret Expired';
    }

    const seconds = Math.floor((timeDiff / 1000) % 60);
    const minutes = Math.floor((timeDiff / (1000 * 60)) % 60);
    const hours = Math.floor((timeDiff / (1000 * 60 * 60)) % 24);
    const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));

    const formattedTime = `${days ? days + 'd ' : ''}${hours ? hours + 'h ' : ''}${minutes ? minutes + 'm ' : ''}${seconds}s`;
    return formattedTime;
};

function Secret() {
    const { id } = useParams();
    const [isLoading, setIsLoading] = useState(false); // Flag for loading state
    const [secret, setSecret] = useState(null);
    const [error, setError] = useState(null)// State for error message
    const [secretId, setSecretId] = useState(id) // State for secret id

    const fetchData = async () => {
        setIsLoading(true); // Set loading state to true
        try {
            const res = await axios.get(`https://secret-keeper-ht64.onrender.com/${id}`);
            setSecret(res.data);
        } catch (err) {
            console.error(err); // Log error for debugging
            setError(err.response?.data?.message || 'An error occurred.'); // Handle potential error messages
        } finally {
            setIsLoading(false); // Set loading state to false after fetch (success or failure)
        }
    };
    // fetchData()
    useEffect(() => {


        if (!secret && !isLoading && !error) { // Fetch only if secret is not yet fetched and no errors
            fetchData();
        }

        return () => {
            // Cleanup function (optional for potential side effects)
        };
    }, [id, secret, isLoading, error]);

    // ... rest of your component logic with error/loading state handling

    return (
        <div>
            {isLoading ? (
                <p>Loading secret...</p>
            ) : error ? (
                <p className="error">{error}</p>
            ) : (
                <>
                    {/* Display secret and timer if available */}
                    <h1>
                        {secret?.secret}
                    </h1>

                    {secret && <h4>
                        It is only accessble for &nbsp;
                        {(secret?.remainingVisites)} more visits
                    </h4>}
                    <Timer time={secret?.validTill} secret={secret} setSecret={setSecret} /> 
                </>
            )}
        </div>
    );
}

// Timer component with improved styling and error handling
function Timer({ time, setSecret }) {
    const [remainingTime, setRemainingTime] = useState(getTimeRemaining(time));

    useEffect(() => {
        const intervalId = setInterval(() => {
            const newRemainingTime = getTimeRemaining(time);
            if (newRemainingTime === 'Secret Expired') {
                setSecret({ err: 'Secret Expired' })
            }
            setRemainingTime(newRemainingTime);
        }, 1000);

        return () => clearInterval(intervalId);
    }, [time]);
    console.log(remainingTime)
    return (
        <div className="timer-container">
            {remainingTime === 'Secret Expired' ? (
                <span className="expired">{remainingTime}</span>
            ) : (
                <span>{remainingTime}</span>
            )}
        </div>
    );
}

export default Secret;

import React, { useRef, useState } from 'react';

const Modal = ({ isOpen, onClose, link }) => {
    const [copySuccess, setCopySuccess] = useState('');
    const textAreaRef = useRef(null);

    function copyToClipboard(e) {
        textAreaRef.current.select();
        document.execCommand('copy');
        // This is just personal preference.
        // I prefer to not show the whole text area selected.
        e.target.focus();
        setCopySuccess('Copied!');
    };



    if (!isOpen) return null;

    return (
        <div
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                background: "rgba(0, 0, 0, 0.5)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <div
                style={{
                    background: "white",
                    height: "20%",
                    width: "auto",
                    margin: "auto",
                    padding: "2%",
                    border: "2px solid #000",
                    borderRadius: "10px",
                    boxShadow: "2px solid black",
                    backgroundColor: "black",
                    position: "relative",
                }}
            >

                {
                    document.queryCommandSupported('copy') &&
                    <>
                        <button onClick={copyToClipboard}>Copy</button>
                        {copySuccess}
                    </>
                }
                <br />
                <form>
                    <textarea
                        ref={textAreaRef}
                        defaultValue={link}
                        rows="2" cols="50"
                        readOnly
                    />
                </form>


                <button onClick={onClose} style={{ position: "absolute", bottom: 0, margin: "auto", backgroundColor: "red" }}>Close</button>
            </div>
        </div>
    );
};

export default Modal;

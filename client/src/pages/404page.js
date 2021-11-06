import React from 'react'

function NotFoundPage(props) {
    const goHome =()=>{
        props.history.replace("/");
    }
    return (
        <div>
            404 Page Not Found
            <button className="btn btn-warning" onClick={goHome}>Go Home</button>
        </div>
    )
}

export default NotFoundPage

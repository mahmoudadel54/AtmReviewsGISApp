import React from 'react'
import { Link } from 'react-router-dom'
function WelcomePage() {
    return (
        <div>
            Welcome to Review App
            <Link to="/index">Go Main Page</Link>
           
        </div>
    )
}

export default WelcomePage

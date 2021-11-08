import React from 'react'
import { Link } from 'react-router-dom'
function WelcomePage() {
    return (
        <div className="welcome-page-container">
           <p>

            Welcome to Review App
           </p>
           &nbsp;

            <Link to="/index"> Go Main Page</Link>
           
        </div>
    )
}

export default WelcomePage

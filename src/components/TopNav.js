import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function TopNav() {

    const location = useLocation();
    
    return (
            <div className="topnav-group">
                <div className="topnav">
                    {location.pathname === "/" ? <Link className="active" to="/">Home</Link> : <Link to="/">Home</Link>}
                    {location.pathname === "/faq" ? <Link className="active" to="faq">FAQ</Link> : <Link to="faq">FAQ</Link>}
                    {location.pathname === "/register" ? <Link className="active" to="register">How to Register</Link> : <Link to="register">How to Register</Link>}
                    {location.pathname === "/governance" ? <Link className="active" to="governance">Governance Scores</Link> : <Link to="governance">Governance Scores</Link>}
                    {location.pathname === "/distribution" ? <Link className="active" to="distribution">Distributions</Link> : <Link to="distribution">Distributions</Link>}
                    {location.pathname === "/track" ? <Link className="active" to="track">Track</Link> : <Link to="track">Track</Link>}
                    {location.pathname === "/stake" ? <Link className="active" to="stake">Stake</Link> : <Link to="stake">Stake</Link>}
                </div>
            </div>

            
    );
}

export default TopNav;
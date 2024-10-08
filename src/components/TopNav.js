import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function TopNav() {

    const location = useLocation();
    
    return (
            <div className="topnav-group">
                <div className="topnav">
                    {location.pathname === "/" ? <Link className="active" to="/">Home</Link> : <Link to="/">Home</Link>}
                    {location.pathname === "/faq" ? <Link className="active" to="faq">FAQ</Link> : <Link to="faq">FAQ</Link>}
                    {location.pathname === "/register" ? <Link className="active" to="register">Register</Link> : <Link to="register">Register</Link>}
                    {location.pathname === "/membership" ? <Link className="active" to="membership">Membership</Link> : <Link to="membership">Membership</Link>}
                    {location.pathname === "/governance" ? <Link className="active" to="governance">Governance Scores</Link> : <Link to="governance">Governance Scores</Link>}
                    {location.pathname === "/distribution" ? <Link className="active" to="distribution">Distributions</Link> : <Link to="distribution">Distributions</Link>}
                    {location.pathname === "/topiclimits" ? <Link className="active" to="topiclimits">Topic Limits</Link> : <Link to="topiclimits">Topic Limits</Link>}
                    {location.pathname === "/delicious-donuts" ? <Link className="active" to="delicious-donuts">Delicious Donuts</Link> : <Link to="delicious-donuts">Delicious Donuts</Link>}
                    {location.pathname === "/track" ? <Link className="active" to="track">Track</Link> : <Link to="track">Track</Link>}
                    {location.pathname === "/liquidity" ? <Link className="active" to="liquidity">Liquidity Leaderboard</Link> : <Link to="liquidity">Liquidity Leaderboard</Link>}
                    {location.pathname === "/stake" ? <Link className="active" to="stake">Stake</Link> : <Link to="stake">Stake</Link>}
                </div>
            </div>

            
    );
}

export default TopNav;
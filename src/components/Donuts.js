import React from 'react';
import Title from '../img/title-donuts.png';
import BannerLogo from '../img/donut-banner.png';
import MembershipLogo from '../img/donut-membership.png';
import TippingLogo from '../img/donut-tipping.png';
import VotingLogo from '../img/donut-voting.png';
import UniswapLogo from '../img/donut-uniswap.png';
import HoneyswapLogo from '../img/donut-honeyswap.png';
import DonutLogo from '../img/donut-overview.png';
import BurnLogo from '../img/donut-burn.png';
import Donut01 from '../img/donut01.png';
import Donut02 from '../img/donut02.png';


class Donuts extends React.Component {

    render() {
        return (
            <div>
            <div className="content">
                <div className="content-container">
                    <div className="content-column">
                        <img src={Donut01} alt="Donuts: the original food token" className="splash-image" />
                    </div>
                    <div className="content-column">
                        <img src={Title} alt="What are donuts?" className="logo-image" />
                    
                        <p className="left-body-large">Donuts are tokens that represent community contribution & engagement 
                        at the <a href="http://reddit.com/r/ethtrader" target="_blank" rel="noreferrer">/r/ethtrader subreddit</a>.</p>
                        <p className="left-body-large">Users
                        earn Donuts simply by participating and contributing content to /r/ethtrader. Think of them as a spendable and tradeable karma, 
                        but exclusive to the /r/ethtrader subreddit.</p>
                    </div>
                </div>
             </div>

             <div className="container-middle">
                <div className="content-middle">                
                <table className="content-table">
                    <tbody>
                        <tr>
                            <th className="logo-column">
                                <img src={VotingLogo} alt="Voting Icon" className="logo-image-large" /><br />
                                <span className="caption-heading">Voting</span>
                                <p className="caption-body">Donuts increase a user's vote weight in community governance polls.</p>
                                <br />
                            </th>
                            <th className="logo-column">
                                <img src={MembershipLogo} alt="Membership Icon" className="logo-image-large" /><br />
                                <span className="caption-heading">Special Membership</span>
                                <p className="caption-body">Donuts can be used to purchase special memberships, which bring a number of aesthetic perks.</p>
                                <br />
                            </th>
                            <th className="logo-column">
                                <img src={BannerLogo} alt="Banner Icon" className="logo-image-large" /><br />
                                <span className="caption-heading">Banner Advertising</span>
                                <p className="caption-body">Donuts can be used to purchase control of the top banner, often used for advertising purposes.</p>
                                <br />
                            </th>
                            <th className="logo-column">
                                <img src={TippingLogo} alt="Tipping Icon" className="logo-image-large" /><br />
                                <span className="caption-heading">Tipping</span>
                                <p className="caption-body">Donuts can be used to tip other users for content you appreciate.</p>
                                <br />
                            </th>
                        </tr>                       
                    </tbody>
                </table>
                <br />
                
                </div>
            </div>             

            <div className="content">
                <div className="content-container">
                    <div className="content-column">
                        <p className="left-body-large">Following the ERC-20 token standard, Donuts are the first ever 
                    implementation of Reddit Community Points.  Donuts exist on both the Ethereum main net and the Gnosis chain.</p>
                    <p className="left-body-large">Donuts are distributed automatically to all users on the Gnosis chain on a monthly basis.</p>
                    </div>
                    <div className="content-column">
                        <img src={Donut02} alt="The future is fried.  With sprinkles on it." className="splash-image" />
                    </div>
                </div>
            </div>            


            <div className="container-middle">
            <div className="content-middle">
            <p className="left-body-middle">New Donuts are baked and distributed every 4 weeks to registered users, based off of 
                their contribution to the /r/ethtrader subreddit. There is a correlation between karma earned and how many Donuts 
                a user will receive, though it is not 1:1.  Donuts are also distributed for other purposes, such as liquidity incentives,
                further development of Donuts, and subreddit moderation.</p>   

                    <table className="content-middle-table">
                        <tbody>
                            <tr>
                                <th rowSpan="9"><img src={DonutLogo} className="logo-image-large" alt="Distribution" /></th>
                                <th colSpan="2" className="highlight-large">Donut Distributions</th>
                            </tr>
                            <tr>
                                <th className="distribute-header">Posts:</th>
                                <th className="distribute-body">510K Donuts per distribution</th>
                            </tr>
                            <tr>
                                <th className="distribute-header">Comments:</th>
                                <th className="distribute-body">340K Donuts per distribution</th>
                            </tr>
                            <tr>
                                <th className="distribute-header">Bonus to Posts, by Receiving Tips:</th>
                                <th className="distribute-body">340K Donuts per distribution</th>
                            </tr>
                            <tr>
                                <th className="distribute-header">Community Treasury Funds:</th>
                                <th className="distribute-body">255K Donuts per distribution</th>
                            </tr>
                            <tr>
                                <th className="distribute-header">Donut Tipping & Content Curation:</th>
                                <th className="distribute-body">170K Donuts per distribution</th>
                            </tr>                            
                            <tr>
                                <th className="distribute-header">Uniswap Liquidity Incentives:</th>
                                <th className="distribute-body">400K Donuts per distribution</th>
                            </tr>
                            <tr>
                                <th className="distribute-header">Honeyswap Liquidity Incentives:</th>
                                <th className="distribute-body">200K Donuts per distribution</th>
                            </tr>
                            <tr>
                                <th className="distribute-header">Moderation:</th>
                                <th className="distribute-body">85K Donuts per distribution</th>
                            </tr>
                            <tr className="spacer-row"><br /><br /><br /></tr>
                            <tr>
                                <th rowSpan="2"><img src={BurnLogo} className="logo-image-large" alt="Burns" /></th>
                                <th colSpan="2" className="highlight-large">Donut Burns</th>
                            </tr>
                            <tr>
                                <th colSpan="2" className="distribute-body-burn">
                                    Donuts spent on premium memberships are burned, leaving circulation and forever destroyed.
                                    <br /><br />
                                    In addition, ownership of the banner follows a <a href="https://medium.com/@simondlr/what-is-harberger-tax-where-does-the-blockchain-fit-in-1329046922c6" target="_blank" rel="noreferrer">Harberger Tax</a> system, in which the owner must pay a daily tax in order to retain ownership.  Donuts spent in this way are also burned, forever destroyed. 
                                </th>
                            </tr>
                        </tbody>
                    </table>
            </div>
            </div>
            <div className="content">
                <p className="left-body">Donuts are available to be traded on the following exchanges:</p>
                 
                <table className="content-table">
                    <tbody>
                        <tr>
                            <th className="logo-column">
                                <a href="https://app.uniswap.org/#/swap?inputCurrency=ETH&outputCurrency=0xc0f9bd5fa5698b6505f643900ffa515ea5df54a9"  target="_blank" rel="noreferrer">
                                    <img src={UniswapLogo} alt="Uniswap Icon" className="logo-image-large" />
                                </a><br />
                                <a href="https://app.uniswap.org/#/swap?inputCurrency=ETH&outputCurrency=0xc0f9bd5fa5698b6505f643900ffa515ea5df54a9"  target="_blank" rel="noreferrer">
                                    <span className="caption-heading">Uniswap</span>
                                </a>
                                <br /><br />
                            </th>
                            <th className="logo-column">
                                <a href="https://honeyswap.org/"  target="_blank" rel="noreferrer">
                                    <img src={HoneyswapLogo} alt="Honeyswap Icon" className="logo-image-large" />
                                </a><br />
                                <a href="https://honeyswap.org/"  target="_blank" rel="noreferrer">
                                    <span className="caption-heading">Honeyswap</span>
                                </a>
                                <br /><br />
                            </th>
                        </tr>
                    </tbody>
                </table>

                <br></br>
            </div>
            </div>
        );
    }


}

export default Donuts;
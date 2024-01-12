import React from 'react';
import RedditLogo from '../img/donut-reddit.png';
import OverviewLogo from '../img/donut-overview.png';
import EtherscanLogo from '../img/donut-etherscan.png';

class Links extends React.Component {


    render() {
        return (
            <div className="links">
                <table className="content-table">
                    <tbody>
                        <tr>
                            <th className="logo-column">
                                <a href="https://reddit.com/r/ethtrader"  target="_blank" rel="noreferrer">
                                    <img src={RedditLogo} alt="Reddit Icon" className="logo-image-medium" />
                                </a>
                            </th>
                            <th className="logo-column">
                                <a href="https://www.reddit.com/r/ethtrader/wiki/donuts"  target="_blank" rel="noreferrer">
                                    <img src={OverviewLogo} alt="Overview Icon" className="logo-image-medium" />
                                </a>
                            </th>
                            <th className="logo-column">
                                <a href="https://etherscan.io/token/0xc0f9bd5fa5698b6505f643900ffa515ea5df54a9"  target="_blank" rel="noreferrer">
                                    <img src={EtherscanLogo} alt="Etherscan Icon" className="logo-image-medium" />
                                </a>
                            </th>
                        </tr>
                        <tr>
                            <th className="logo-column">
                                <a href="https://reddit.com/r/ethtrader"  target="_blank" rel="noreferrer">
                                    <span className="caption-link">/r/ethtrader</span>
                                </a>
                            </th>
                            <th className="logo-column">
                                <a href="https://www.reddit.com/r/ethtrader/wiki/donuts"  target="_blank" rel="noreferrer">
                                    <span className="caption-link">Donut Overview</span>
                                </a>
                            </th>                  
                            <th className="logo-column">
                                <a href="https://etherscan.io/token/0xc0f9bd5fa5698b6505f643900ffa515ea5df54a9"  target="_blank" rel="noreferrer">
                                    <span className="caption-link">Etherscan Donut Page</span>
                                </a>
                            </th>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }


}

export default Links;
import React from 'react';
import Title from '../img/title-claim.png';

class Claim extends React.Component {

    render() {
        return (
            <div className="content">
                <img src={Title} alt="How to claim donuts" className="logo-image" />
                
                <div className="left-body">
                    <p>Donuts are distributed every 28 days in batches.  By default, users can claim their donuts on the Ethereum main net once the
                        distribution has occurred.  Users can optionally receive their donuts on the xDai sidechain instead, to avoid gas fees.
                    </p>

                    <p className="heading">If claiming on the <span className="highlight">Ethereum Main Net</span>,</p>
                    
                        <ul>
                            <li>visit this <a href="https://ipfs.io/ipfs/QmSyCgXH8UzVgQz1Liuskq34rN2nRZXWUJrpkBNWXbrTdj" target="_blank" rel="noreferrer">link</a>, connect your Metamask wallet, and click <span className="highlight">Claim</span>.</li>
                            <li>NOTE: Claiming donuts on the Ethereum Main Net incurs gas fees, which are currently very high. You can try waiting for gas fees to go down or can opt in to receive future distributions on the xDai sidechain.</li>
                        </ul>
                    
                    
                    <p className="heading">If you have signed up for <span className="highlight">xDai distributions</span>,</p>
                    
                        <ul>
                            <li>your donuts will automatically appear in your wallet on the xDai sidechain.</li>
                            <li>NOTE: Post any message in <a href="https://www.reddit.com/r/ethtrader/comments/p5ik6b/donuts_xdai_optin_thread/" target="_blank" rel="noreferrer">this thread</a> to opt in for future xDai distributions.</li>
                        </ul>
                    
                </div>
                
            </div>
        );
    }


}

export default Claim;
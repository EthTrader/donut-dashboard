import React from 'react';
import Title from '../img/title-claim.png';
import Claim01 from '../img/claim-01.png';
import Claim02 from '../img/claim-02.png';
import Claim03 from '../img/claim-03.png';
import Claim04 from '../img/claim-04.png';
import Claim05 from '../img/claim-05.png';
import Claim06 from '../img/claim-06.png';

class ClaimOld extends React.Component {

    render() {
        return (
            <div className="content">
                <img src={Title} alt="How to claim donuts" className="logo-image" />
                
                <table className="how-to-table">
                    <tbody>
                        <tr>
                            <th className="numColumn">
                            Step 1
                            </th>
                            <th className="contentColumn">
                                <p className="left-body">
                                    Visit the <a href="https://client.aragon.org/#/0x57EBE61f5f8303AD944136b293C1836B3803b4c0" target="_blank" rel="noreferrer">ethtrader Aragon DAO</a>. 
                                </p>
                            </th>
                        </tr>
                        <tr>
                            <th className="numColumn">
                            Step 2
                            </th>
                            <th className="contentColumn">
                                <p className="left-body">
                                    Click <span className="highlight">Connect Account</span> in the top right of the Aragon UI to connect your Metamask account. 
                                    <br></br>
                                    <img src={Claim01} alt="Connecting Metamask" className="howToImg"/>
                                </p>
                            </th>
                        </tr>
                        <tr>
                            <th className="numColumn">
                            Step 3
                            </th>
                            <th className="contentColumn">
                                <p className="left-body">
                                    Click <span className="highlight">Metamask</span> in the sub-menu. 
                                    <br></br>
                                    <img src={Claim02} alt="Connecting Metamask" className="howToImg"/>
                                </p>
                            </th>
                        </tr>
                        <tr>
                            <th className="numColumn">
                            Step 4
                            </th>
                            <th className="contentColumn">
                                <p className="left-body">
                                    Click <span className="highlight">AirDropDuo</span> in the left-hand navigation menu. 
                                    <br></br>
                                    <img src={Claim03} alt="Navigate to AirDropDuo" className="howToImg"/>
                                </p>
                            </th>
                        </tr>
                        <tr>
                            <th className="numColumn">
                            Step 5
                            </th>
                            <th className="contentColumn">
                                <p className="left-body">
                                    Donut batches ready to claim will have a Claim button with an amount of donuts next to them.  Click <span className="highlight">Claim</span> to select that batch. 
                                    <br></br>
                                    <b>NOTE:</b> If you have multiple donut batches to claim, you can use the <span className="highlight">Claim All</span> button to retrieve all of them in a single transaction.
                                    <br></br>
                                    <img src={Claim04} alt="Claiming Donut Batch" className="howToImg"/>
                                </p>
                            </th>
                        </tr>
                        <tr>
                            <th className="numColumn">
                            Step 6
                            </th>
                            <th className="contentColumn">
                                <p className="left-body">
                                    A right-hand window will appear.  Click <span className="highlight">Create Transaction</span> to begin claiming your donuts. 
                                    <br></br>
                                    <img src={Claim05} alt="Create the transaction" className="howToImg"/>
                                </p>
                            </th>
                        </tr>    
                        <tr>
                            <th className="numColumn">
                            Step 7
                            </th>
                            <th className="contentColumn">
                                <p className="left-body">
                                    Metamask will pop up, asking for confirmation before executing the claim.  Note the gas cost.  When ready to claim, click <span className="highlight">Confirm</span> in the Metamask window. 
                                    <br></br>
                                    <img src={Claim06} alt="Confirm transaction in Metamask" className="howToImgMetamask"/>
                                    <br></br>
                                    <b>NOTE:</b> Due to recent explosions in gas prices, the transaction fee to claim donuts may be extremely high.
                                    <br></br>
                                    /r/ethtrader is currently experimenting with distributing donuts on xDai.  Visit <a href="https://www.reddit.com/r/ethtrader/comments/ll8wwg/comment_to_receive_your_donut_distribution_on/" target="_blank" rel="noreferrer">this thread</a> to signal you would like to receive future donuts on xDai instead of main net.
                                </p>
                            </th>
                        </tr>                        
                    </tbody>
                </table>
            </div>
        );
    }


}

export default ClaimOld;
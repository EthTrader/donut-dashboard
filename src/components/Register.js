import React from 'react';
import Title from '../img/title-register.png';
import Reg01 from '../img/reg-01.png';
import Reg02 from '../img/reg-02.png';
import Reg03 from '../img/reg-03.png';
import Reg04 from '../img/reg-04.png';
import Reg05 from '../img/reg-05.png';
import Reg07 from '../img/reg-07.png';
import Reg08 from '../img/reg-08.png';
import Reg09 from '../img/reg-09.png';
import Reg10 from '../img/reg-10.png';

class Register extends React.Component {

    render() {
        return (
            <div className="content">
                <img src={Title} alt="How to Register for Donuts" className="logo-image" />
                
                <table className="how-to-table">
                    <tbody>
                        <tr>
                            <th className="numColumn">
                            Step 1
                            </th>
                            <th className="contentColumn">
                                <p className="left-body">
                                    Using a desktop or laptop computer, install the <a href="https://metamask.io/" target="_blank" rel="noreferrer">Metamask</a> extension in your browser, if you haven't already.
                                    <br></br>
                                    <b>NOTE:</b> If you already use Metamask for other purposes, it's not a bad idea to make a brand new Ethereum account just for donuts, in order to preserve your privacy.
                                </p>
                            </th>
                        </tr>
                        <tr>
                            <th className="numColumn">
                            Step 2
                            </th>
                            <th className="contentColumn">
                                <p className="left-body">
                                    Visit <a href="https://reddit.com/r/ethtrader" target="_blank" rel="noreferrer">/r/ethtrader</a>. The first post will be replaced with a registration block.
                                    <br></br>
                                    <b>NOTE:</b> You must be using the "New" Reddit interface in order to see the registration block.
                                    <br></br>
                                    <img src={Reg01} alt="Registering for donuts" className="howToImg"/>
                                </p>
                            </th>
                        </tr>
                        <tr>
                            <th className="numColumn">
                            Step 3
                            </th>
                            <th className="contentColumn">
                                <p className="left-body">
                                    On the <span className="highlight">About</span> tab, click <span className="highlight">Start</span>.
                                    <br></br>
                                    <img src={Reg02} alt="Registering for donuts" className="howToImg"/>
                                </p>
                            </th>
                        </tr>
                        <tr>
                            <th className="numColumn">
                            Step 4
                            </th>
                            <th className="contentColumn">
                                <p className="left-body">
                                    On the <span className="highlight">Metamask</span> tab, click <span className="highlight">Continue</span>.
                                    <br></br>
                                    <img src={Reg03} alt="Registering for donuts" className="howToImg"/>
                                </p>
                            </th>
                        </tr>
                        <tr>
                            <th className="numColumn">
                            Step 5
                            </th>
                            <th className="contentColumn">
                                <p className="left-body">
                                On the <span className="highlight">Wallet</span> tab, click <span className="highlight">Next</span>.
                                <br></br>
                                    <img src={Reg04} alt="Registering for donuts" className="howToImg"/>
                                </p>
                            </th>
                        </tr>
                        <tr>
                            <th className="numColumn">
                            Step 6
                            </th>
                            <th className="contentColumn">
                                <p className="left-body">
                                On the <span className="highlight">Connect</span> tab, click <span className="highlight">Connect</span>.
                                <br></br>
                                    <img src={Reg05} alt="Registering for donuts" className="howToImg"/>
                                </p>
                            </th>
                        </tr>
                        <tr>
                            <th className="numColumn">
                            Step 7
                            </th>
                            <th className="contentColumn">
                                <p className="left-body">
                                    Metamask will pop up. Click <span className="highlight">Next</span> and navigate through its prompts. 
                                    <br></br>
                                    (This step shares your account's public key with Reddit)
                                    <br></br>
                                    <img src={Reg07} alt="Registering for donuts" className="howToImgMetamask"/>
                                </p>
                            </th>
                        </tr>
                        <tr>
                            <th className="numColumn">
                            Step 8
                            </th>
                            <th className="contentColumn">
                                <p className="left-body">
                                On the <span className="highlight">Verify</span> tab, check the box and click <span className="highlight">Verify</span> in Metamask.
                                <br></br>
                                    <img src={Reg08} alt="Registering for donuts" className="howToImg"/>
                                </p>
                            </th>
                        </tr>
                        <tr>
                            <th className="numColumn">
                            Step 9
                            </th>
                            <th className="contentColumn">
                                <p className="left-body">
                                Metamask will pop up again. Click <span className="highlight">Sign</span>. 
                                <br></br>
                                (This step signs a message with your account's private key, proving that you own the public key shared in step #7) 
                                <br></br>
                                <img src={Reg09} alt="Registering for donuts" className="howToImgMetamask"/>
                                </p>
                            </th>
                        </tr>
                        <tr>
                            <th className="numColumn">
                            Step 10
                            </th>
                            <th className="contentColumn">
                                <p className="left-body">
                                Success!
                                <br></br>
                                Once successfully registered, a donut icon will appear after your name whenever you post with your donut amount. (which is probably zero, starting out)
                                <br></br>
                                <img src={Reg10} alt="Registering for donuts" className="howToImg"/>
                                </p>
                            </th>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }


}

export default Register;
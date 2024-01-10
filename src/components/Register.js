import React from 'react';
import Title from '../img/title-register.png';

class Register extends React.Component {

    render() {
        return (
            <div className="content">
                    <img src={Title} alt="How to Register for Donuts" className="logo-image" />
                    <p className="left-body">Simply respond to any thread in /r/ethtrader with a message like the following:</p>
                    <p className="code">!register 0x12345678901234567890123456789012345678901</p>
                    <p className="left-body">Replace the above address with your own and any earned DONUTs will be automatically sent to that address in the next distribution on Gnosis Chain.</p>
                    <p className="left-body">Remember that this process is publicly viewable by all and that other users will be able to see the Ethereum address tied to your Reddit account.  It is probably best to create a brand new Ethereum address just for DONUTs!</p>
            </div>
        );
    }


}

export default Register;
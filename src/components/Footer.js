import React from 'react';

class Footer extends React.Component {


    render() {
        return (
            <div>
                <p className="footer-text">Price information provided by CoinGecko API.</p>                
                <p className="footer-text">Burrito price assumed as $11.00 USD, for a steak burrito from Chipotle.</p>
            </div>
        );
    }


}

export default Footer;
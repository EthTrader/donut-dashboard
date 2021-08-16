import React from 'react';

class Footer extends React.Component {


    render() {
        return (
            <div>
                <p className="footer-text">Price information provided by CoinGecko API.</p>                
                <p className="footer-text">Burrito price assumed as $7.50 USD, for a steak burrito from Chipotle.</p>
                <p className="footer-text">Lamborghini price assumed as $467,617 USD, MSRP for a Aventador S Roadster.</p>
            </div>
        );
    }


}

export default Footer;
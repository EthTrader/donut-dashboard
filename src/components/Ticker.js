import React from 'react';
import getDonutStats from '../services/coingecko-service';
import DownArrow from '../img/down-arrow.svg';
import UpArrow from '../img/up-arrow.svg';
import USD from '../img/logo-usd.png';
import ETH from '../img/logo-eth.png';
import BURRITO from '../img/logo-burrito.png';
//import LAMBO from '../img/logo-lambo.png';

class Ticker extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
            donutUSD: 0,
            donutETH: 0,
            usdDonut: 0,
            ethDonut: 0,
            usd24hr: 0,
            eth24hr: 0,
            usdVolume: 0,
            ethVolume: 0,
            usdMarketCap: 0,
            ethMarketCap: 0
        }

        this.formatNumber = this.formatNumber.bind(this);
    }

    async componentDidMount() {
        let donutStats = await getDonutStats();

        this.setState({
             donutUSD: donutStats.donutUSD,
             donutETH: donutStats.donutETH,
             donutBURRITO: ((donutStats?.donutUSD ?? 0) / 11).toFixed(8),
             donutLAMBO: ((donutStats?.donutUSD ?? 0) / 467617).toFixed(8),
             usdDonut: donutStats.usdDonut,
             ethDonut: donutStats.ethDonut,
             burritoDonut: donutStats.usdDonut * 11,
             lamboDonut: donutStats.usdDonut * 467617,
             usd24hr: donutStats.usd24hr,
             eth24hr: donutStats.eth24hr, 
             usdVolume: donutStats.usdVolume, 
             ethVolume: donutStats.ethVolume, 
             usdMarketCap: donutStats.usdMarketCap, 
             ethMarketCap: donutStats.ethMarketCap,
             isLoading: false
        });
    }
        
    formatNumber(num) {
        return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    }        

    render() {
        return (
            <div>
                {this.state.isLoading ? <p>Loading Donut Price Information...</p> :
                <div className="tcontainer"><div className="ticker-wrap"><div className="ticker-move">
                    <div className="ticker-item">
                        <img src={USD} alt="USD" className="ticker-logo" /> 
                        &nbsp;
                        ${this.state.donutUSD} <b>USD</b> 
                        &nbsp;
                        {this.state.usd24hr >= 0 ? <img src={UpArrow} alt="Up arrow" className="green-arrow" /> : <img src={DownArrow} alt="Down arrow" className="red-arrow" />} 
                        {this.state.usd24hr >= 0 ? <span className="upArrow">+{this.state.usd24hr.toFixed(2)}%</span> : <span className="downArrow">{this.state.usd24hr.toFixed(2)}%</span>} 
                        &nbsp;
                        (1 <b>USD</b> = {this.formatNumber(Math.ceil(this.state.usdDonut))} <b>DONUT</b>)
                    </div>
                    <div className="ticker-item">
                        <img src={ETH} alt="ETH" className="ticker-logo" />
                        &nbsp;
                        {this.state.donutETH} <b>ETH</b>
                        &nbsp;
                        {this.state.eth24hr >= 0 ? <img src={UpArrow} alt="Up arrow" className="green-arrow" /> : <img src={DownArrow} alt="Down arrow" className="red-arrow" />}
                        {this.state.eth24hr >= 0 ? <span className="upArrow">+{this.state.eth24hr.toFixed(2)}%</span> : <span className="downArrow">{this.state.eth24hr.toFixed(2)}%</span>}                
                        &nbsp;
                        (1 <b>ETH</b> = {this.formatNumber(Math.ceil(this.state.ethDonut))} <b>DONUT</b>)
                    </div>
                    <div className="ticker-item">
                        <img src={BURRITO} alt="burrito" className="ticker-logo" />
                        &nbsp;
                        {this.state.donutBURRITO} <b>Burrito</b>
                        &nbsp;
                        {this.state.usd24hr >= 0 ? <img src={UpArrow} alt="Up arrow" className="green-arrow" /> : <img src={DownArrow} alt="Down arrow" className="red-arrow" />}
                        {this.state.usd24hr >= 0 ? <span className="upArrow">+{this.state.usd24hr.toFixed(2)}%</span> : <span className="downArrow">{this.state.usd24hr.toFixed(2)}%</span>}                
                        &nbsp;
                        (1 <b>Burrito</b> = {this.formatNumber(Math.ceil(this.state.burritoDonut))} <b>DONUT</b>)
                    </div>
                    <div className="ticker-item">
                        <b>Marketcap:</b>
                        &nbsp;
                        ${this.formatNumber(Math.ceil(this.state.usdMarketCap))} <b>USD</b>
                        &nbsp;
                        ({this.formatNumber(Math.ceil(this.state.ethMarketCap))} <b>ETH</b>)
                    </div>
                    <div className="ticker-item">
                        <b>24hr volume:</b>
                        &nbsp;
                        ${this.formatNumber(Math.ceil(this.state.usdVolume))} <b>USD</b>
                        &nbsp;
                        ({this.formatNumber(Math.ceil(this.state.ethVolume))} <b>ETH</b>)
                    </div>
              </div></div></div>
                }
            </div>
        );
    }
}

export default Ticker;
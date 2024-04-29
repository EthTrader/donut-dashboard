import React from 'react';
import Title from '../img/title-liquidity.png';
import axios from 'axios';

let liquidity;

class Liquidity extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            filter: "",
            liquidity: []
        }

        this.handleFilterChange = this.handleFilterChange.bind(this);
    }

    async componentDidMount() { 
        let result = await axios.get("https://raw.githubusercontent.com/mattg1981/donut-bot-output/main/liquidity/liquidity_leaders.json");
        
        // Add an index field onto each object to keep track of rank order
        let indexAddedResult = result.data.map((obj, index) => ({ ...obj, index: index + 1 }));
        // Add an address field onto each object for the link
        indexAddedResult = indexAddedResult.map((obj) => ({ ...obj, address: "https://arbiscan.io/address/" + obj.owner }));

        liquidity = indexAddedResult;

        this.setState({ 
            liquidity: indexAddedResult
        });
    }

    async handleFilterChange(event) {        
        let filter = event.target.value;
        
        // When filtering, remove anonymous users from the list
        let filteredLiquidity = liquidity.filter(obj => obj.user !== null);
        // Then filter on the user search string
        filteredLiquidity = filteredLiquidity.filter(item => item.user.toLowerCase().includes(filter.toLowerCase()));
        // If user deletes their entry and has no input, restore the anonymous users
        if (!filter) {
            filteredLiquidity = liquidity;
        }  
        this.setState({
            filter: filter,
            liquidity: filteredLiquidity,
        });
    }

    render() {
        return (
            <div className="content">
                <img src={Title} alt="Liquidity Leaderboard" className="logo-image" />
                <br />
                <p className="left-body">The liquidity leaderboard shows the top liquidity providers in the DONUT-ETH Sushiswap pool on Arbitrum One.  Liquidity providers 
                on Uniswap (Ethereum Main Net) are not currently shown.  Sushiswap offers concentrated liquidity, allowing users to specify a price range where their liquidity
                should be used.  Because of this, users with smaller asset deposits may show higher in the rankings if they have a tight liquidity range.  They will also fall
                off the list if the price of DONUT goes outside their liquidity range.</p>
                <br />
                                
                <input type="text" className="filter-box" value={this.state.filter} onChange={this.handleFilterChange} placeholder="Username filter"/>                                   
                
                <table className="donut-table">
                    <thead>
                        <tr>
                            <th className="donut-header">
                                Rank
                            </th>
                            <th className="donut-header">
                                Username
                            </th>
                            <th className="donut-header">
                                Percent of Pool
                            </th>
                            <th className="donut-header">
                                Donuts in Pool
                            </th>
                            <th className="donut-header">
                                Ether in Pool
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr></tr>
                        <tr></tr>
                    {this.state.liquidity.map((row) => {
                            return (<tr key={row.id}>
                                <th className="contentColumn">
                                    {parseInt(row.index).toLocaleString()}
                                </th>
                                <th className="contentColumn pinkText">
                                    <a href={row.address} target="_blank" rel="noreferrer" className="pinkText">
                                        {row.user ? row.user : <div className="darkPinkText">Anonymous</div>}
                                    </a>
                                </th>
                                <th className="contentColumn">
                                    {row.percent_of_pool.toFixed(2) + "%"}
                                </th>
                                <th className="contentColumn">
                                    {row.donut_in_lp.toFixed(0)}
                                </th>
                                <th className="contentColumn">
                                    {row.eth_in_lp.toFixed(3)}
                                </th>
                            </tr>)
                        })}
                        
                    </tbody>
                </table>
            </div>
        );
    }


}

export default Liquidity;
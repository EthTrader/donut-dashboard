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
        // Add an 
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
                <p className="left-body">The liquidity leaderboard shows the top liquidity providers in the DONUT-ETH Sushiswap pool on Arbitrum One.  NOTE: Liquidity providers 
                on Uniswap (Ethereum Main Net) are not currently shown.</p>
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
                                    {(Math.round((row.percent_of_pool) * 100) / 100).toFixed(2) + "%"}
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
import React from 'react';
import Title from '../img/title-governance.png';
import axios from 'axios';

let governance;

class Governance extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            filter: "",
            governance: []
        }

        this.handleFilterChange = this.handleFilterChange.bind(this);
    }

    async componentDidMount() { 
        let result = await axios.get("https://raw.githubusercontent.com/EthTrader/donut.distribution/main/docs/users.json");
        governance = result.data;
    
        // Sort the output array
        governance.sort(function (a,b) {
            return b.weight - a.weight;
        });
        
        this.setState({ 
            governance: governance
        });
    }

    async handleFilterChange(event) {        
        let filter = event.target.value;
        
        let filteredGovernance = governance.filter(item => item.username.toLowerCase().includes(filter.toLowerCase()));  
        this.setState({
            filter: filter,
            governance: filteredGovernance,
        });
    }

    render() {
        return (
            <div className="content">
                <img src={Title} alt="Governance Scores" className="logo-image" />
                <br />
                <p className="left-body">Governance scores are calculated by taking the lesser value of DONUT and CONTRIB tokens held by each user.  DONUTs held on both Ethereum main net and the Gnosis network are counted in this score,
                as well as DONUTs held in liquidity pools and staking contracts.  Unclaimed DONUTs and CONTRIB are also considered in this score.</p>    
                <p className="left-body">Governance scores currently affect tip weight bonuses.</p>
                <br />
                                
                <input type="text" className="filter-box" value={this.state.filter} onChange={this.handleFilterChange} placeholder="Username filter"/>                                   
                
                <table className="donut-table">
                    <thead>
                        <tr>
                            <th className="donut-header">
                                Username
                            </th>
                            <th className="donut-header">
                                Governance Score
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr></tr>
                        <tr></tr>
                    {this.state.governance.map((row) => {
                            return (<tr key={row.username}>
                                <th className="contentColumn">
                                    {row.username}
                                </th>
                                <th className="contentColumn">
                                    {parseInt(row.weight).toLocaleString()}
                                </th>
                            </tr>)
                        })}
                        
                    </tbody>
                </table>
            </div>
        );
    }


}

export default Governance;
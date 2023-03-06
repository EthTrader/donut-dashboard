import React from 'react';
import Title from '../img/title-distributions.png';
import axios from 'axios';

class Distribution extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            distribution: [],
            unfilteredDistribution: [],
            filter: ""
        }

        this.handleFilterChange = this.handleFilterChange.bind(this);
    }

    async componentDidMount() { 

        let result = await axios.get("https://raw.githubusercontent.com/EthTrader/donut.distribution/main/docs/distributionSummary.json");
        let full_distribution = result.data;
        let label = full_distribution.label.replace('round_','');

        let distribution = full_distribution.summary;   
        let distributionKeys = Object.keys(distribution);

        let newDistribution = [];
        for (let i = 0; i < distributionKeys.length; i++) {
            newDistribution.push(distribution[distributionKeys[i]]);
        }

        // Sort the output array by donuts earned
        newDistribution.sort(function (a,b) {
            return b.donut - a.donut;
        });

        this.setState({ 
            distribution: newDistribution,
            unfilteredDistribution: newDistribution,
            label: label
        });
    }

    async handleFilterChange(event) {        
        let filter = event.target.value;

        let distribution = this.state.unfilteredDistribution;
        
        let filteredDistribution = distribution.filter(item => item.username.toLowerCase().includes(filter.toLowerCase()));  
        this.setState({
            filter: filter,
            distribution: filteredDistribution,
        });
    }

    render() {
        return (
            <div className="content">
                <img src={Title} alt="Fresh Donuts" className="logo-image" />
                <br />
                <div className="">Distribution Information for Round #{this.state.label}</div>
                <br /><br />

                <input type="text" className="filter-box" value={this.state.filter} onChange={this.handleFilterChange} placeholder="Username filter"/>                
                
                <table className="donut-table">
                    <thead>
                        <tr>
                            <th className="donut-header">
                                Username
                            </th>
                            <th className="donut-header">
                                Total Donuts Received
                            </th>
                            <th className="donut-header">
                                Donuts from Posts &amp; Karma
                            </th>
                            <th className="donut-header">
                                Donuts from Receiving Tips
                            </th>
                            <th className="donut-header">
                                Donuts from Tipping Others
                            </th>
                            <th className="donut-header">
                                Pay to Post Fees
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr></tr>
                        <tr></tr>
                    {this.state.distribution.map((row) => {
                            return (<tr key={row.username}>
                                <th className="contentColumn">
                                    {row.username}
                                </th>
                                <th className="contentColumn">
                                    {parseInt(row.donut).toLocaleString()}
                                </th>
                                <th className="contentColumn upArrow">
                                    +{parseInt(row.data.fromKarma).toLocaleString()}
                                </th>
                                <th className="contentColumn upArrow">
                                    +{parseInt(row.data.fromTipsRecd).toLocaleString()}
                                </th>
                                <th className="contentColumn upArrow">
                                    +{parseInt(row.data.fromTipsGiven).toLocaleString()}
                                </th>
                                <th className="contentColumn downArrow">
                                    -{parseInt(row.data.pay2PostFee).toLocaleString()}
                                </th>
                            </tr>)
                        })}
                        
                    </tbody>
                </table>
            </div>
        );
    }


}

export default Distribution;
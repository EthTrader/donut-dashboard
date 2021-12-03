import React from 'react';
import Title from '../img/title-distributions.png';
import full_distribution from '../distribution/most_recent.json';

class Distribution extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            distribution: [],
            filter: ""
        }

        this.handleFilterChange = this.handleFilterChange.bind(this);
    }

    async componentDidMount() { 
        let distribution = full_distribution.awards;     
        // Sort the output array
        distribution.sort(function (a,b) {
            return b.amount0 - a.amount0;
        });
        
        this.setState({ 
            distribution: distribution
        });
    }

    async handleFilterChange(event) {        
        let filter = event.target.value;

        let distribution = full_distribution.awards;
        
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
                <i>Distribution #104: November 2021</i>
                <br /><br />

                <input type="text" className="filter-box" value={this.state.filter} onChange={this.handleFilterChange} placeholder="Username filter"/>                
                
                <table className="donut-table">
                    <thead>
                        <tr>
                            <th className="donut-header">
                                Username
                            </th>
                            <th className="donut-header">
                                Donuts Received
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
                                    {parseInt(row.amount0/1e18.toFixed(0)).toLocaleString()}
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
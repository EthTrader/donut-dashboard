import React from 'react';
import Title from '../img/title-distributions.png';
import full_distribution from '../distribution/most_recent.json';

class Distribution extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            distribution: []
        }
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

    render() {
        return (
            <div className="content">
                <img src={Title} alt="Fresh Donuts" className="logo-image" />
                <br></br>
                <i>Distribution #102: September 2021</i>
                <br></br>
                
                
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
                                    {(row.amount0/1e18).toFixed(0)}
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
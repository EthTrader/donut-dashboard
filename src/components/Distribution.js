import React from 'react';
import Title from '../img/title-distributions.png';
import distribution from '../distribution/most_recent.json';

class Distribution extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            distribution: []
        }
    }

    async componentDidMount() {        
        this.setState({ 
            distribution: distribution
        });
    }

    render() {
        return (
            <div className="content">
                <img src={Title} alt="Fresh Donuts" className="logo-image" />
                <br></br>
                <i>The most recent distribution occurred on August 11th, 2021.</i>
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
                            <th className="donut-header">
                                Contributor / Moderator
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr></tr>
                        <tr></tr>
                    {this.state.distribution.map((row) => {
                            return (<tr key={row.username + row.contributor_type}>
                                <th className="contentColumn">
                                    {row.username}
                                </th>
                                <th className="contentColumn">
                                    {row.points.toFixed(0)}
                                </th>
                                <th className="contentColumn">
                                    {row.contributor_type === "moderator" ? <span className="moderator">{row.contributor_type}</span> : <span>{row.contributor_type}</span> }
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
import React from 'react';
import Title from '../img/title-distributions.png';
import axios from 'axios';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons'

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
                                <br /> 
                                <Tippy content={<span style={{ color: '#fe6ddb' }}>The number of Donuts earned from posts and comments, as calculated by Reddit.<br /><br /> Comedy and Media posts are additionally reduced in value.</span>}>
                                    <FontAwesomeIcon icon={faCircleInfo} />
                                </Tippy>
                            </th>
                            <th className="donut-header">
                                Donuts from Receiving Tips
                                <br />
                                <Tippy content={<span style={{ color: '#fe6ddb' }}>The number of Donuts earned from receiving tips on posts.<br /><br /> In addition to the tips themselves, tips are used as a "super-upvote" and result in bonus Donuts for the receiver. The higher governance score the tipper has, the more Donuts are earned by the recipient.</span>}>
                                    <FontAwesomeIcon icon={faCircleInfo} />
                                </Tippy>
                            </th>
                            <th className="donut-header">
                                Donuts from Tipping Others
                                <br />
                                <Tippy content={<span style={{ color: '#fe6ddb' }}>The number of Donuts earned from giving tips to others.<br /><br /> Tipping posts helps curate content and Donuts are paid out to tippers for their effort.</span>}>
                                    <FontAwesomeIcon icon={faCircleInfo} />
                                </Tippy>
                            </th>
                            <th className="donut-header">
                                Voter Bonus
                                <br />
                                <Tippy content={<span style={{ color: '#fe6ddb' }}>The number of Donuts earned from voting in governance polls.</span>}>
                                    <FontAwesomeIcon icon={faCircleInfo} />
                                </Tippy>
                            </th>
                            <th className="donut-header">
                                Pay to Post Fees
                                <br />
                                <Tippy content={<span style={{ color: '#fe6ddb' }}>The number of Donuts deducted for making posts.<br /><br /> In an effort to reduce spam, each post made carries a flat donut "fee" that is deducted from monthly donut distributions.</span>}>
                                    <FontAwesomeIcon icon={faCircleInfo} />
                                </Tippy>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr></tr>
                        <tr></tr>
                    {this.state.distribution.map((row) => {
                            return (<tr key={row.username}>
                                <th className="contentColumn pinkText">
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
                                <th className="contentColumn upArrow">
                                    +{parseInt(row.data.voterBonus).toLocaleString()}
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
import React from 'react';
import Title from '../img/title-distributions.png';
import axios from 'axios';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons'
import {
    Accordion,
    AccordionItem,
    AccordionItemHeading,
    AccordionItemButton,
    AccordionItemPanel,
} from 'react-accessible-accordion';

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
        let label = full_distribution.label.replace('round_', '');

        let distribution = full_distribution.summary;
        let distributionKeys = Object.keys(distribution);

        let newDistribution = [];
        for (let i = 0; i < distributionKeys.length; i++) {
            newDistribution.push(distribution[distributionKeys[i]]);
        }

        // Sort the output array by donuts earned
        newDistribution.sort(function (a, b) {
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
                <br /><br />

                <Accordion allowZeroExpanded>
                    <AccordionItem>
                        <AccordionItemHeading>
                            <AccordionItemButton>
                                Donut Distribution Details
                            </AccordionItemButton>
                        </AccordionItemHeading>
                        <AccordionItemPanel>
                            <p className="left-body-middle">New Donuts are baked and distributed every 4 weeks to registered users, based off of
                                their contribution to the /r/ethtrader subreddit. There is a correlation between karma earned and how many Donuts
                                a user will receive, though it is not 1:1.  Donuts are also distributed for other purposes, such as liquidity incentives,
                                further development of Donuts, and subreddit moderation.  Donuts rewarded for posts and comments are sent directly to user
                                wallets on Arbitrum.</p>

                            <table className="content-middle-table">
                                <tbody>
                                    <tr>
                                        <th className="distribute-header">Posts:</th>
                                        <th className="distribute-body">510K Donuts per distribution</th>
                                    </tr>
                                    <tr>
                                        <th className="distribute-header">Comments:</th>
                                        <th className="distribute-body">340K Donuts per distribution</th>
                                    </tr>
                                    <tr>
                                        <th className="distribute-header">Community Treasury Funds:</th>
                                        <th className="distribute-body">255K Donuts per distribution</th>
                                    </tr>
                                    <tr>
                                        <th className="distribute-header">Uniswap Liquidity Incentives:</th>
                                        <th className="distribute-body">400K Donuts per distribution</th>
                                    </tr>
                                    <tr>
                                        <th className="distribute-header">Sushiswap Liquidity Incentives:</th>
                                        <th className="distribute-body">150K Donuts per distribution</th>
                                    </tr>
                                    <tr>
                                        <th className="distribute-header">Moderation:</th>
                                        <th className="distribute-body">85K Donuts per distribution</th>
                                    </tr>
                                    <tr className="spacer-row"><br /><br /><br /></tr>
                                </tbody>
                            </table>
                        </AccordionItemPanel>
                    </AccordionItem>
                </Accordion>



                <br /><br />
                <div className="">Distribution Information for Round #{this.state.label}</div>
                <br />

                <input type="text" className="filter-box" value={this.state.filter} onChange={this.handleFilterChange} placeholder="Username filter" />

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
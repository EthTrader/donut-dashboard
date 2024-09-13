import React from 'react';
import Title from '../img/title-distributions.png';
import axios from 'axios';
import {
    Accordion,
    AccordionItem,
    AccordionItemHeading,
    AccordionItemButton,
    AccordionItemPanel,
} from 'react-accessible-accordion';

class TopicLimits extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            lastUpdate: "",
            topicLimits: []
        }
    }

    async componentDidMount() {

        let result = await axios.get("https://raw.githubusercontent.com/EthTrader/topic-limiting/main/topic_limits.json");

        console.log(result);

        let lastUpdate = new Date(result.data.last_update * 1000);

        console.log(lastUpdate);

        console.log(result.data.data);

        this.setState({
            lastUpdate: lastUpdate.toString(),
            topicLimits: result.data.data            
        });
    }

    render() {
        return (
            <div className="content">
                <img src={Title} alt="Topic Limits" className="logo-image" />
                <br /><br />

                <Accordion allowZeroExpanded>
                    <AccordionItem>
                        <AccordionItemHeading>
                            <AccordionItemButton>
                                What are topic limits?
                            </AccordionItemButton>
                        </AccordionItemHeading>
                        <AccordionItemPanel>
                            <p className="left-body-middle">In an effort to reduce overcrowding on the subreddit, topic limits restrict the number of posts that can be active 
                            at the same time on the same topic.</p>
                        </AccordionItemPanel>
                    </AccordionItem>
                </Accordion>

                <br /><br />

                <p className="footer-text">Last Updated: {this.state.lastUpdate}</p>

                <table className="donut-table">
                    <thead>
                        <tr>
                            <th className="donut-header">
                                Topic
                            </th>
                            <th className="donut-header">
                                Current Posts
                            </th>
                            <th className="donut-header">
                                Maximum Limit
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr></tr>
                        <tr></tr>
                    {this.state.topicLimits.map((row) => {
                            return (<tr key={row.topic}>
                                <th className="contentColumn pinkText">
                                    {row.display_name}
                                </th>
                                <th className="contentColumn">
                                    {row.current}
                                </th>
                                <th className="contentColumn">
                                    {row.limit}
                                </th>
                            </tr>)
                        })}
                        
                    </tbody>
                </table>

            </div>
        );
    }


}

export default TopicLimits;
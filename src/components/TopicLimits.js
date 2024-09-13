import React from 'react';
import Title from '../img/title-distributions.png';
import axios from 'axios';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons'
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
                                What is the topic limiter?
                            </AccordionItemButton>
                        </AccordionItemHeading>
                        <AccordionItemPanel>
                            <p className="left-body-middle">The topic limiter is a feature designed to improve content organization on r/EthTrader, by automatically limiting the number of posts about specific topics.

                                The limiter works by detecting and removing posts that exceed the allowed limit. This helps reduce duplicate content, spam, and creates a more diverse and engaging feed for all users..</p>
                        </AccordionItemPanel>
                    </AccordionItem>
                </Accordion>

                <br /><br />

                <p className="footer-text">Last Updated: {this.state.lastUpdate}</p>

                <div className="membership-card">

                    <table className="topic-table">
                        <thead>
                            <tr>
                                <th className="donut-header topicText">
                                    Topic
                                </th>
                                <th className="donut-header topicText">
                                    Current Posts
                                </th>
                                <th className="donut-header topicText">
                                    Maximum Limit
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr></tr>
                            <tr></tr>
                            {this.state.topicLimits.map((row) => {
                                let rowClass = row.current >= row.limit ? "topic-row-full" : "";
                                if (row.current + 1 === row.limit) {
                                    rowClass = "topic-row-almost-full";
                                }

                                return (<tr key={row.display_name} className={rowClass}>
                                    <th className="contentColumn pinkText topicText">
                                        {row.display_name}
                                    </th>
                                    <th className="contentColumn topicText">
                                        {row.current}
                                        {
                                            row.current >= row.limit ?
                                            <span className="exclamation pinkText"><Tippy content={<span style={{ color: '#fe6ddb' }}>This topic has reached the maximum limit.</span>}>
                                                <FontAwesomeIcon icon={faCircleExclamation} />
                                            </Tippy></span> :
                                            <span />
                                        }                                        
                                    </th>
                                    <th className="contentColumn topicText">
                                        {row.limit}
                                    </th>
                                </tr>)
                            })}

                        </tbody>
                    </table>
                </div>

            </div>
        );
    }


}

export default TopicLimits;
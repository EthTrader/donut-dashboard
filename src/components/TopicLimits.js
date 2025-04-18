import React from 'react';
import Title from '../img/title-topiclimits.png';
import tlAirdrop from '../img/tl-airdrop.png';
import tlBridge from '../img/tl-bridge.png';
import tlChainlink from '../img/tl-chainlink.png';
import tlDonut from '../img/tl-donut.png';
import tlDeFi from '../img/tl-defi.png';
import tlETF from '../img/tl-etf.png';
import tlHands from '../img/tl-hands.png';
import tlInfluencer from '../img/tl-influencer.png';
import tlLayerTwo from '../img/tl-layertwo.png';
import tlMacroeconomics from '../img/tl-macroeconomics.png';
import tlMemecoins from '../img/tl-memecoins.png';
import tlNFT from '../img/tl-nft.png';
import tlPolitics from '../img/tl-politics.png';
import tlExchanges from '../img/tl-exchanges.png';
import tlRegulation from '../img/tl-regulation.png';
import tlSEC from '../img/tl-sec.png';
import tlStake from '../img/tl-stake.png';
import tlStables from '../img/tl-stable.png';
import tlWallet from '../img/tl-wallet.png';
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

        let lastUpdate = new Date(result.data.last_update * 1000);

        //result.data.data.sort((a, b) => b.current - a.current);


        result.data.data.sort((a, b) => {
            // First, check if `current` is equal to `limit`
            if (a.current === a.limit && b.current !== b.limit) {
            return -1; 
            } else if (a.current !== a.limit && b.current === b.limit) {
            return 1; 
            }
        
            // Secondarily, sort by `current` in descending order
            return b.current - a.current;
        });

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

                                The limiter works by detecting and removing posts that exceed the allowed limit. This helps reduce duplicate content, spam, and creates a more diverse and engaging feed for all users.
                                <br /><br />
                                For more details and FAQ about the topic limiter, see <a href="https://www.reddit.com/r/ethtrader/comments/1fyb8rv/rethtrader_automated_topic_limiter_topics_allowed/" target="_blank" rel="noreferrer">this post</a>.
                                </p>
                        </AccordionItemPanel>
                    </AccordionItem>
                </Accordion>

                <br /><br />

                <p className="footer-text">Last Updated: {this.state.lastUpdate}</p>

                <div className="membership-card topic-card">

                    <table className="topic-table">
                        <colgroup>
                            <col style={{ width: '20%' }} />
                            <col style={{ width: '40%' }} />
                            <col style={{ width: '20%' }} />
                            <col style={{ width: '20%' }} />
                        </colgroup>

                        <thead>
                            <tr>
                                <th></th>
                                <th className="topic-header topicText">
                                    Topic
                                </th>
                                <th className="topic-header topicText">
                                    Current Posts
                                </th>
                                <th className="topic-header topicText">
                                    Limit
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr></tr>
                            <tr></tr>
                            {this.state.topicLimits.map((row) => {
                                let rowClass = row.current >= row.limit ? "topic-row-full" : "";
                                if (row.current >= 1 && row.current < row.limit) {
                                    rowClass = "topic-row-almost-full";
                                }

                                return (<tr key={row.display_name} className={rowClass}>
                                    <th>
                                        { row.display_name === 'Airdrops' ? <img src={tlAirdrop} alt="Airdrops" className="topic-image" /> : <span />}
                                        { row.display_name === 'Bridges' ? <img src={tlBridge} alt="Bridges" className="topic-image" /> : <span />}                                        
                                        { row.display_name === 'Chainlink' ? <img src={tlChainlink} alt="Chainlink" className="topic-image topic-image-small" /> : <span />}                                        
                                        { row.display_name === 'EthTrader' ? <img src={tlDonut} alt="Donut" className="topic-image topic-image-small" /> : <span />}
                                        { row.display_name === 'ETF' ? <img src={tlETF} alt="ETF" className="topic-image" /> : <span />}
                                        { row.display_name === 'ETH Trading' ? <img src={tlExchanges} alt="ETH Trading" className="topic-image" /> : <span />}
                                        { row.display_name === 'DeFi' ? <img src={tlDeFi} alt="DeFi" className="topic-image" /> : <span />}
                                        { row.display_name === 'Influencers' ? <img src={tlInfluencer} alt="Influencers" className="topic-image" /> : <span />}
                                        { row.display_name === 'Side Chains/Layer 2\'s' ? <img src={tlLayerTwo} alt="LayerTwo" className="topic-image topic-image-large" /> : <span />}
                                        { row.display_name === 'Macroeconomics' ? <img src={tlMacroeconomics} alt="Macroeconomics" className="topic-image" /> : <span />}
                                        { row.display_name === 'Meme Coins' ? <img src={tlMemecoins} alt="Memecoins" className="topic-image" /> : <span />}
                                        { row.display_name === 'NFT' ? <img src={tlNFT} alt="NFT" className="topic-image topic-image-small" /> : <span />}
                                        { row.display_name === 'Politics' ? <img src={tlPolitics} alt="Politics" className="topic-image" /> : <span />}
                                        { row.display_name === 'Exchanges' ? <img src={tlHands} alt="Exchanges" className="topic-image" /> : <span />}
                                        { row.display_name === 'Regulation' ? <img src={tlRegulation} alt="Regulation" className="topic-image" /> : <span />}
                                        { row.display_name === 'SEC' ? <img src={tlSEC} alt="SEC" className="topic-image" /> : <span />}
                                        { row.display_name === 'Staking/Restaking' ? <img src={tlStake} alt="Stake" className="topic-image" /> : <span />}
                                        { row.display_name === 'Stables' ? <img src={tlStables} alt="Stables" className="topic-image" /> : <span />}    
                                        { row.display_name === 'Wallets' ? <img src={tlWallet} alt="Wallet" className="topic-image" /> : <span />}                                                                                                                                                                                                                                                                                                                                
                                    </th>
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
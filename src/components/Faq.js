import React from 'react';
import Title from '../img/title-faq.png';
import Donut03 from '../img/donut-03.png';
import Donut04 from '../img/donut-04.png';
import Donut05 from '../img/donut-05.png';
import Donut06 from '../img/donut-06.png';
import Donut07 from '../img/donut-07.png';


class Faq extends React.Component {

    render() {
        return (
            <div className="content">
                <img src={Title} alt="Frequently Asked Questions" className="logo-image" />
                <br></br>
                <img src={Donut03} alt="Flying donuts" className="splash-image" />
                
                <p className="faq-title">General Questions</p>

                <div className="faq-odd">
                    <p className="faq-q">Q: What are donuts?</p>

                    <p className="faq-a">A: Donuts are tokens that represent community contribution & engagement on the <a href="https://reddit.com/r/ethtrader" target="_blank" rel="noreferrer">r/ethtrader subreddit</a>. Donuts follow the ERC-20 standard and are the first ever implementation of Reddit Community Points. An easy way to think of them is a spendable and tradeable Karma, but exclusive to the ethtrader subreddit.  Donuts are on the Ethereum main net and Gnosis chain.</p>
                </div>
                <div className="faq-even">
                    <p className="faq-q">Q: What are donuts used for?</p>

                    <p className="faq-a">A: Donuts can be used for additional vote weight in community polls, tipping other users, and even purchasing the top banner (which can be used for advertising).</p>
                </div>
                <div className="faq-odd">
                    <p className="faq-q">Q: How do I register for donuts?</p>

                    <p className="faq-a">A: See instructions on <a href="/#/register">this page</a>.</p>
                </div>
                <div className="faq-even">
                    <p className="faq-q">Q: How can I tip other users with donuts?</p>

                    <p className="faq-a">A: When viewing a post on /r/ethtrader, click the donut icon next to a user's name and it will take you to <a href="https://www.donut.finance/tip/" target="_blank" rel="noreferrer">donut.finance</a>.  Connect your Metamask account to this site, enter the amount you would like to tip, and submit.  Note that tipping uses donuts on the Gnosis sidechain, not the main net, in order to get around high gas fees.</p>
                </div>

                <img src={Donut04} alt="Flying donuts" className="splash-image" />

                <p className="faq-title">Claiming Donuts</p>

                <div className="faq-even">
                    <p className="faq-q">Q: How do I claim my donuts?</p>

                    <p className="faq-a">A: Donuts are automatically deposited into your account on the Gnosis chain every month.  You don't have to manually claim or pay any gas costs to acquire them!</p>
                </div>

                <img src={Donut05} alt="Flying donuts" className="splash-image" />

                <p className="faq-title">Donut Tokenomics</p>

                <div className="faq-odd">
                    <p className="faq-q">Q: How does karma earned relate to donuts earned?</p>

                    <p className="faq-a">A: Upvotes help users earn more donuts, but it is not a 1:1 relationship.  The donuts earned by an individual at the end of the month depends on the total karma earned by all users.  Additionally, posts flaired Comedy and Media earn 10% as many donuts as other posts, per community vote.  Recieving tips and giving tips also earn users bonus Donuts.</p>  
                </div>
                <div className="faq-even">
                    <p className="faq-q">Q: How often are new donuts minted and distributed?</p>

                    <p className="faq-a">A: A fresh batch of donuts is baked every 4 weeks.</p>
                </div>
                <div className="faq-odd">
                    <p className="faq-q">Q: How many new donuts are minted in each batch?</p>

                    <p className="faq-a">A: 1.7 million donuts are created in each batch.  An additional 600K donuts are awarded to those that provide trading liquidity on Uniswap (main net) and Honeyswap (Gnosis chain).</p>
                </div>
                <div className="faq-even">
                    <p className="faq-q">Q: How many donuts are in circulation?</p>

                    <p className="faq-a">A: The number of donuts in circulation varies depending on issuance & burn.  Up-to-date statistics can be viewed on the <a href="https://etherscan.io/token/0xc0f9bd5fa5698b6505f643900ffa515ea5df54a9" target="_blank" rel="noreferrer">etherscan donut page</a>.</p>
                </div>
                <div className="faq-odd">
                    <p className="faq-q">Q: Do any donuts ever leave circulation?</p>

                    <p className="faq-a">A: Donuts spent on banner purchases are burned.</p>
                </div>                

                <img src={Donut06} alt="Flying donuts" className="splash-image" />

                <p className="faq-title">Banner</p>

                <div className="faq-even">
                    <p className="faq-q">Q: What is the cost to own the banner?</p>

                    <p className="faq-a">A: Currently the cost is 13,000 DONUT per day that the banner is owned.</p>
                </div>

                <div className="faq-odd">
                    <p className="faq-q">Q: How do I purchase the banner?</p>

                    <p className="faq-a">A: Contact the /r/ethtrader mod team via modmail.  The mod team will work with you to get the banner uploaded and displayed correctly.</p>
                </div>

                <div className="faq-even">
                    <p className="faq-q">Q: What types of content are appropriate for the banner?</p>

                    <p className="faq-a">A: Generally, any type of Ethereum-based project is a good fit for the /r/ethtrader banner.  Advertisements may be removed at moderator discretion if they are not appropriate for the subreddit (example: an ad for a rival Layer 1 blockchain).  Explicit images are not allowed.</p>
                </div>

                <img src={Donut07} alt="Flying donuts" className="splash-image" />
                
                <p className="faq-title">Miscellaneous</p>

                <div className="faq-even">
                    <p className="faq-q">Q: Where can I buy and sell donuts?</p>

                    <p className="faq-a">A: Uniswap on Ethereum main net or Honeyswap on Gnosis Chain both have trading liquidity for donuts.</p>
                </div>
                <div className="faq-odd">
                    <p className="faq-q">Q: How can I add donuts to my token list in Metamask?</p>

                    <p className="faq-a">A: You can visit the <a href="/#/track">Track Donuts</a> page and click the buttons to add.<br /><br />
                    DONUTs can also be manually added to most cryptocurrency wallets by using the contract address:<br /><br /> 
                    Ethereum main net: <span className="highlight">0xc0f9bd5fa5698b6505f643900ffa515ea5df54a9</span><br /><br />
                    Gnosis Chain: <span className="highlight">0x524B969793a64a602342d89BC2789D43a016B13A</span></p>
                </div>
                <div className="faq-even">
                    <p className="faq-q">Q: What is CONTRIB?</p>

                    <p className="faq-a">A: Whenever a user earns donuts, they earn an equal amount of CONTRIB. CONTRIB is a separate token and is non-transferrable. It essentially shows life-time earnings, even if a user has sold their donuts. It can also be used to potentially restrict some actions to users that earned their donuts, rather than purchased them.</p>
                </div>                
                <div className="faq-odd">
                    <p className="faq-q">Q: What is a governance score?</p>

                    <p className="faq-a">A: Governance scores measure an individual's vote weight in polls.  Governance scores are calculated by taking the lesser value of DONUT and CONTRIB tokens held by each user.  DONUTs held on both Ethereum main net and the Gnosis network are counted in this score,
                as well as DONUTs held in liquidity pools and staking contracts.</p>
                </div>
                <div className="faq-even">
                    <p className="faq-q">Q: How long have donuts been around?</p>

                    <p className="faq-a">A: Since 2018, though they weren't ERC-20 tokens to start. They started out as simply numbers stored on Reddit's servers. Donuts transitioned to be decentralized in late 2019 & early 2020.</p>
                </div>

            </div>
        );
    }


}

export default Faq;
import React from 'react';
import Title from '../img/title-donuts.png';
import BannerLogo from '../img/donut-banner.png';
import TippingLogo from '../img/donut-tipping.png';
import VotingLogo from '../img/donut-voting.png';

import Slideshow from './Slideshow.js'
import Proposals from './Proposals.js'
import PostOfTheWeek from './PostOfTheWeek.js'
import {exchanges} from '../data.js'


class Exchange extends React.Component {
  render() {
    return (
      <th className="logo-column">
        <a href={this.props.link}  target="_blank" rel="noreferrer" style={{width: 100}}>
          <div className="exchange-listing">
            {this.props.icon}
          </div>
        </a><br />
        <a href={this.props.link}  target="_blank" rel="noreferrer">
          <span className="caption-heading">{this.props.label}</span>
        </a>
        <br/>
        <small style={{opacity: 0.5}}>{this.props.network}</small>
        <br /><br />
      </th>
    )
  }
}

class Donuts extends React.Component {
    render() {
        return (
            <div>
            <div className="content">
                <div className="content-container">
                    <Slideshow />
                </div>
                <div className="content-container">

                    <img src={Title} alt="What are donuts?" className="logo-image" /><br />
                    <p className="left-body-large">Donuts are tokens that represent community contribution & engagement 
                        at the <a href="http://reddit.com/r/ethtrader" target="_blank" rel="noreferrer">/r/ethtrader subreddit</a>.  Users
                        earn Donuts simply by participating and contributing content to /r/ethtrader. Think of them as a spendable and tradeable karma, 
                        but exclusive to the /r/ethtrader subreddit.  </p>
                    <p className="left-body-large">Following the ERC-20 token standard, Donuts are the first ever 
                    implementation of Reddit Community Points.  Donuts exist on both the Ethereum main net and the Gnosis chain.  Donuts are distributed automatically to all users on the Gnosis chain on a monthly basis.</p>
                </div>
             </div>

             <div className="container-middle">
                <div className="content-middle">                
                <table className="content-table">
                    <tbody>
                        <tr>
                            <th className="logo-column">
                                <img src={VotingLogo} alt="Voting Icon" className="logo-image-large" /><br />
                                <span className="caption-heading">Voting</span>
                                <p className="caption-body">Donuts increase a user's vote weight in community governance polls.</p>
                                <br />
                            </th>
                            <th className="logo-column">
                                <img src={BannerLogo} alt="Banner Icon" className="logo-image-large" /><br />
                                <span className="caption-heading">Banner Advertising</span>
                                <p className="caption-body">Donuts can be used to purchase control of the top banner, often used for advertising purposes.</p>
                                <br />
                            </th>
                            <th className="logo-column">
                                <img src={TippingLogo} alt="Tipping Icon" className="logo-image-large" /><br />
                                <span className="caption-heading">Tipping</span>
                                <p className="caption-body">Donuts can be used to tip other users for content you appreciate.</p>
                                <br />
                            </th>
                        </tr>                       
                    </tbody>
                </table>
                <br />
                
                </div>
            </div>    

            <PostOfTheWeek></PostOfTheWeek>

            <div className="container-middle">
                <Proposals></Proposals>           
            </div> 

            <div className="content">
                <p className="center-body">Donuts are available to be traded on the following exchanges:</p>
                <table className="content-table">
                    <tbody>
                        <tr>
                            {exchanges.map((e) =>
                              <Exchange key={e.link} link={e.link} icon={e.icon} label={e.name} network={e.network}/>
                            )}
                        </tr>
                    </tbody>
                </table>

                <br></br>
            </div>
            </div>
        );
    }


}

export default Donuts;

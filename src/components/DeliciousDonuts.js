import React from 'react';
import axios from 'axios';
import Snowfall from 'react-snowfall'
import Popup from 'reactjs-popup';
import { ethers } from 'ethers';

import Loading from '../img/loading.gif';
import Title from '../img/title-deliciousdonuts.png';
import AllOurDonut from '../img/allourdonut.png';

import deliciousDonutsABI from '../abi/deliciousDonutsABI.json'

import DD01 from '../img/nft/01-SunshineDonut.png';
import DD02 from '../img/nft/02-GlazedPinkDonut.png';
import DD03 from '../img/nft/03-SapphireDonut.png';
import DD04 from '../img/nft/04-RoyalDonut.png';
import DD05 from '../img/nft/05-GoldenDonut.png';
import DD06 from '../img/nft/06-FloweryDonut.png';
import DD07 from '../img/nft/07-BismuthDonut.png';
import DD08 from '../img/nft/08-FiligreeDonut.png';
import DD09 from '../img/nft/09-RetroDonut.png';
import DD10 from '../img/nft/10-DroolingDonut.png';
import DD11 from '../img/nft/11-SnowglobeDonut.png';
import DD12 from '../img/nft/12-BreakInCaseOfEmergencyDonut.png';
import DD13 from '../img/nft/13-DonutTree.png';
import DD14 from '../img/nft/14-CathedralOfTheDonut.png';
import DD15 from '../img/nft/15-DoomsdayDeviceDonut.png';
import DD16 from '../img/nft/16-KanagawaDonut.png';
import DD17 from '../img/nft/17-PostApocalypticDonut.png';
import DD18 from '../img/nft/18-ZombieDonut.png';
import DD19 from '../img/nft/19-LochNessDonut.png';
import DD20 from '../img/nft/20-StainedGlassDonut.png';

class DeliciousDonuts extends React.Component {

    constructor(props) {
        super(props);
  
        this.state = {
            isMetamaskConnected: false,
  
            provider: "",
            signer: "",
            currentAddress: "",
            network: 0,
  
            deliciousDonutsContractAddress: "0x22f634c230a1Fa703867Bb2aced11a86e126B893",
            
            userDeliciousDonuts: [],
  
            isLoading: true
        }
  
        this.run = this.run.bind(this);      
        this.getDonutList = this.getDonutList.bind(this);
        this.eventListeners = this.eventListeners.bind(this);
      }
      
      async run() {
  
        this.setState({
          isLoading: false
        });
      }

      // --
      // Function to get user's list of NFTs, using smart contract and IPFS
      // --
      async getDonutList() {
        // Delicious Donuts only works on Gnosis Chain
        if (this.state.network !== 100) {
            let deliciousDonutsList = [];
            // Update state
            this.setState({
                userDeliciousDonuts: deliciousDonutsList
            });
            return;
        }
        
        // Create donut contract instance
        let nftContract = new ethers.Contract(this.state.deliciousDonutsContractAddress, deliciousDonutsABI, this.state.signer);

        // Get user's NFT count
        let nftCount = await nftContract.balanceOf(this.state.currentAddress);

        // Convert result from BigNumber format to a readable number
        nftCount = ethers.utils.formatUnits(nftCount, 0);

        console.log("nftCount: ", nftCount);

        // Loop through and get the tokenID for each NFT the user owns.
        let nftURIList = [];
        for (let i=0; i < nftCount; i++) {
            let tokenId = await nftContract.tokenOfOwnerByIndex(this.state.currentAddress, i);
            let tokenURI = await nftContract.tokenURI(tokenId);
            nftURIList.push(tokenURI);
        }

        console.log("nftURIList: ", nftURIList);

        // Loop through and get the deliciousDonutID from the metadata on IPFS for each NFT the user owns.
        let deliciousDonutsList = [];
        
        for (let i=0; i < nftURIList.length; i++) {           
            let metadataResult = await axios.get(nftURIList[i]);
            console.log("metadataResult: ", metadataResult);
            let deliciousDonutID = metadataResult.data.attributes[0].value;
            deliciousDonutsList.push(deliciousDonutID);
        }

        // Remove duplicates from the list
        deliciousDonutsList = [...new Set(deliciousDonutsList)];

        // Update state
        this.setState({
            userDeliciousDonuts: deliciousDonutsList
        });
      }
  
      // --
      // Runs on startup
      // --
      async componentDidMount() {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        if (typeof window.ethereum !== 'undefined') {       
          let provider = new ethers.providers.Web3Provider(window.ethereum, "any");
          let signer = await provider.getSigner();
          let network = await provider.getNetwork();
          let currentAddress = await signer.getAddress();
  
          this.setState({
              provider: provider,
              signer: signer,
              network: network.chainId,
              currentAddress: currentAddress
          });
          await this.getDonutList();
          this.eventListeners();
          this.run();
        }
      }
  
      // Event Listeners
      async eventListeners() {
        window.ethereum.on('accountsChanged', (accounts) => {
          this.setState({
            currentAddress: accounts[0]
          });
          this.getDonutList();
        });
  
        window.ethereum.on('chainChanged', (network) => {
          this.setState({
            network: parseInt(network)
          });
          this.getDonutList();
        });
      }

    render() {

        let render = 
        <div>
            <div className="content-container">
                <div className="delicious-donuts-column">
                    { this.state.userDeliciousDonuts.includes(1) 
                        ? <img src={DD01} alt="Sunshine Donut" className="delicious-donut-image-yes" /> 
                        : <img src={DD01} alt="Sunshine Donut" className="delicious-donut-image-no" /> } <br />
                    <span className="text-delicious-donut-caption">Sunshine Donut</span><br />
                    <span className="text-rarity-common">COMMON</span><br />
                    { this.state.userDeliciousDonuts.includes(1) 
                        ? <span className="text-collected">Collected</span> 
                        : <span className="text-not-collected">Not Yet Collected</span> } <br />
                </div>
                <div className="delicious-donuts-column">
                    { this.state.userDeliciousDonuts.includes(2) 
                        ? <img src={DD02} alt="Glazed Pink Donut" className="delicious-donut-image-yes" />
                        : <img src={DD02} alt="Glazed Pink Donut" className="delicious-donut-image-no" /> } <br />
                    <span className="text-delicious-donut-caption">Glazed Pink Donut</span><br />
                    <span className="text-rarity-common">COMMON</span><br />
                    { this.state.userDeliciousDonuts.includes(2) 
                        ? <span className="text-collected">Collected</span> 
                        : <span className="text-not-collected">Not Yet Collected</span> } <br />
                </div>
                <div className="delicious-donuts-column">
                    { this.state.userDeliciousDonuts.includes(3) 
                        ? <img src={DD03} alt="Sapphire Donut" className="delicious-donut-image-yes" /> 
                        : <img src={DD03} alt="Sapphire Donut" className="delicious-donut-image-no" /> } <br />
                    <span className="text-delicious-donut-caption">Sapphire Donut</span><br />
                    <span className="text-rarity-common">COMMON</span><br />
                    { this.state.userDeliciousDonuts.includes(3) 
                        ? <span className="text-collected">Collected</span> 
                        : <span className="text-not-collected">Not Yet Collected</span> } <br />
                </div>
                <div className="delicious-donuts-column">
                    { this.state.userDeliciousDonuts.includes(4) 
                        ? <img src={DD04} alt="Royal Donut" className="delicious-donut-image-yes" /> 
                        : <img src={DD04} alt="Royal Donut" className="delicious-donut-image-no" /> } <br />
                    <span className="text-delicious-donut-caption">Royal Donut</span><br />
                    <span className="text-rarity-common">COMMON</span><br />
                    { this.state.userDeliciousDonuts.includes(4) 
                        ? <span className="text-collected">Collected</span> 
                        : <span className="text-not-collected">Not Yet Collected</span> } <br />
                </div>
                <div className="delicious-donuts-column">
                    { this.state.userDeliciousDonuts.includes(5) 
                        ? <img src={DD05} alt="Golden Donut" className="delicious-donut-image-yes" /> 
                        : <img src={DD05} alt="Golden Donut" className="delicious-donut-image-no" /> } <br />
                    <span className="text-delicious-donut-caption">Golden Donut</span><br />
                    <span className="text-rarity-common">COMMON</span><br />
                    { this.state.userDeliciousDonuts.includes(5) 
                        ? <span className="text-collected">Collected</span> 
                        : <span className="text-not-collected">Not Yet Collected</span> } <br />
                </div>
            </div>

            <br />
            <div className="content-container">
                <div className="delicious-donuts-column">
                    { this.state.userDeliciousDonuts.includes(6) 
                        ? <img src={DD06} alt="Flowery Donut" className="delicious-donut-image-yes" /> 
                        : <img src={DD06} alt="Flowery Donut" className="delicious-donut-image-no" /> } <br />
                    <span className="text-delicious-donut-caption">Flowery Donut</span><br />
                    <span className="text-rarity-common">COMMON</span><br />
                    { this.state.userDeliciousDonuts.includes(6) 
                        ? <span className="text-collected">Collected</span> 
                        : <span className="text-not-collected">Not Yet Collected</span> } <br />
                </div>
                <div className="delicious-donuts-column">
                    { this.state.userDeliciousDonuts.includes(7) 
                        ? <img src={DD07} alt="Bismuth Donut" className="delicious-donut-image-yes" />
                        : <img src={DD07} alt="Bismuth Donut" className="delicious-donut-image-no" /> } <br />
                    <span className="text-delicious-donut-caption">Bismuth Donut</span><br />
                    <span className="text-rarity-common">COMMON</span><br />
                    { this.state.userDeliciousDonuts.includes(7) 
                        ? <span className="text-collected">Collected</span> 
                        : <span className="text-not-collected">Not Yet Collected</span> } <br />
                </div>
                <div className="delicious-donuts-column">
                    { this.state.userDeliciousDonuts.includes(8) 
                        ? <img src={DD08} alt="Filigree Donut" className="delicious-donut-image-yes" /> 
                        : <img src={DD08} alt="Filigree Donut" className="delicious-donut-image-no" /> } <br />
                    <span className="text-delicious-donut-caption">Filigree Donut</span><br />
                    <span className="text-rarity-common">COMMON</span><br />
                    { this.state.userDeliciousDonuts.includes(8) 
                        ? <span className="text-collected">Collected</span> 
                        : <span className="text-not-collected">Not Yet Collected</span> } <br />
                </div>
                <div className="delicious-donuts-column">
                    { this.state.userDeliciousDonuts.includes(9) 
                        ? <img src={DD09} alt="Retro Donut" className="delicious-donut-image-yes" /> 
                        : <img src={DD09} alt="Retro Donut" className="delicious-donut-image-no" /> } <br />
                    <span className="text-delicious-donut-caption">Retro Donut</span><br />
                    <span className="text-rarity-common">COMMON</span><br />
                    { this.state.userDeliciousDonuts.includes(9) 
                        ? <span className="text-collected">Collected</span> 
                        : <span className="text-not-collected">Not Yet Collected</span> } <br />
                </div>
                <div className="delicious-donuts-column">
                    { this.state.userDeliciousDonuts.includes(10) 
                        ? <img src={DD10} alt="Drooling Donut" className="delicious-donut-image-yes" /> 
                        : <img src={DD10} alt="Drooling Donut" className="delicious-donut-image-no" /> } <br />
                    <span className="text-delicious-donut-caption">Drooling Donut</span><br />
                    <span className="text-rarity-common">COMMON</span><br />
                    { this.state.userDeliciousDonuts.includes(10) 
                        ? <span className="text-collected">Collected</span> 
                        : <span className="text-not-collected">Not Yet Collected</span> } <br />
                </div>
            </div>

            <br />
            <div className="content-container">
                <div className="delicious-donuts-column">
                    { this.state.userDeliciousDonuts.includes(11) 
                        ? <img src={DD11} alt="Snowglobe Donut" className="delicious-donut-image-yes" /> 
                        : <img src={DD11} alt="Snowglobe Donut" className="delicious-donut-image-no" /> } <br />
                    <span className="text-delicious-donut-caption">Snowglobe Donut</span><br />
                    <span className="text-rarity-common">COMMON</span><br />
                    { this.state.userDeliciousDonuts.includes(11) 
                        ? <span className="text-collected">Collected</span> 
                        : <span className="text-not-collected">Not Yet Collected</span> } <br />
                </div>
                <div className="delicious-donuts-column">
                    { this.state.userDeliciousDonuts.includes(12) 
                        ? <img src={DD12} alt="Bottled Donut" className="delicious-donut-image-yes" />
                        : <img src={DD12} alt="Bottled Donut" className="delicious-donut-image-no" /> } <br />
                    <span className="text-delicious-donut-caption">Bottled Donut</span><br />
                    <span className="text-rarity-uncommon">UNCOMMON</span><br />
                    { this.state.userDeliciousDonuts.includes(12) 
                        ? <span className="text-collected">Collected</span> 
                        : <span className="text-not-collected">Not Yet Collected</span> } <br />
                </div>
                <div className="delicious-donuts-column">
                    { this.state.userDeliciousDonuts.includes(13) 
                        ? <img src={DD13} alt="Donut Tree" className="delicious-donut-image-yes" /> 
                        : <img src={DD13} alt="Donut Tree" className="delicious-donut-image-no" /> } <br />
                    <span className="text-delicious-donut-caption">Donut Tree</span><br />
                    <span className="text-rarity-uncommon">UNCOMMON</span><br />
                    { this.state.userDeliciousDonuts.includes(13) 
                        ? <span className="text-collected">Collected</span> 
                        : <span className="text-not-collected">Not Yet Collected</span> } <br />
                </div>
                <div className="delicious-donuts-column">
                    { this.state.userDeliciousDonuts.includes(14) 
                        ? <img src={DD14} alt="Cathedral of the Donut" className="delicious-donut-image-yes" /> 
                        : <img src={DD14} alt="Cathedral of the Donut" className="delicious-donut-image-no" /> } <br />
                    <span className="text-delicious-donut-caption">Cathedral of the Donut</span><br />
                    <span className="text-rarity-uncommon">UNCOMMON</span><br />
                    { this.state.userDeliciousDonuts.includes(14) 
                        ? <span className="text-collected">Collected</span> 
                        : <span className="text-not-collected">Not Yet Collected</span> } <br />
                </div>
                <div className="delicious-donuts-column">
                    { this.state.userDeliciousDonuts.includes(15) 
                        ? <img src={DD15} alt="Doomsday Device Donut" className="delicious-donut-image-yes" /> 
                        : <img src={DD15} alt="Doomsday Device Donut" className="delicious-donut-image-no" /> } <br />
                    <span className="text-delicious-donut-caption">Doomsday Device Blueprint Donut</span><br />
                    <span className="text-rarity-uncommon">UNCOMMON</span><br />
                    { this.state.userDeliciousDonuts.includes(15) 
                        ? <span className="text-collected">Collected</span> 
                        : <span className="text-not-collected">Not Yet Collected</span> } <br />
                </div>
            </div>

            <br />
            <div className="content-container">
                <div className="delicious-donuts-column">
                    { this.state.userDeliciousDonuts.includes(16) 
                        ? <img src={DD16} alt="Kanagawa Donut" className="delicious-donut-image-yes" /> 
                        : <img src={DD16} alt="Kanagawa Donut" className="delicious-donut-image-no" /> } <br />
                    <span className="text-delicious-donut-caption">Kanagawa Donut</span><br />
                    <span className="text-rarity-uncommon">UNCOMMON</span><br />
                    { this.state.userDeliciousDonuts.includes(16) 
                        ? <span className="text-collected">Collected</span> 
                        : <span className="text-not-collected">Not Yet Collected</span> } <br />
                </div>
                <div className="delicious-donuts-column">
                    { this.state.userDeliciousDonuts.includes(17) 
                        ? <img src={DD17} alt="Post-Apocalyptic Donut" className="delicious-donut-image-yes" />
                        : <img src={DD17} alt="Post-Apocalyptic Donut" className="delicious-donut-image-no" /> } <br />
                    <span className="text-delicious-donut-caption">Post-Apocalyptic Donut</span><br />
                    <span className="text-rarity-uncommon">UNCOMMON</span><br />
                    { this.state.userDeliciousDonuts.includes(17) 
                        ? <span className="text-collected">Collected</span> 
                        : <span className="text-not-collected">Not Yet Collected</span> } <br />
                </div>
                <div className="delicious-donuts-column">
                    { this.state.userDeliciousDonuts.includes(18) 
                        ? <img src={DD18} alt="Zombie Donut" className="delicious-donut-image-yes" /> 
                        : <img src={DD18} alt="Zombie Donut" className="delicious-donut-image-no" /> } <br />
                    <span className="text-delicious-donut-caption">Zombie Donut</span><br />
                    <span className="text-rarity-rare">RARE</span><br />
                    { this.state.userDeliciousDonuts.includes(18) 
                        ? <span className="text-collected">Collected</span> 
                        : <span className="text-not-collected">Not Yet Collected</span> } <br />
                </div>
                <div className="delicious-donuts-column">
                    { this.state.userDeliciousDonuts.includes(19) 
                        ? <img src={DD19} alt="Loch Ness Donut" className="delicious-donut-image-yes" /> 
                        : <img src={DD19} alt="Loch Ness Donut" className="delicious-donut-image-no" /> } <br />
                    <span className="text-delicious-donut-caption">Loch Ness Donut</span><br />
                    <span className="text-rarity-rare">RARE</span><br />
                    { this.state.userDeliciousDonuts.includes(19) 
                        ? <span className="text-collected">Collected</span> 
                        : <span className="text-not-collected">Not Yet Collected</span> } <br />
                </div>
                <div className="delicious-donuts-column">
                    { this.state.userDeliciousDonuts.includes(20) 
                        ? <img src={DD20} alt="Stained Glass Donut" className="delicious-donut-image-yes" /> 
                        : <img src={DD20} alt="Stained Glass Donut" className="delicious-donut-image-no" /> } <br />
                    <span className="text-delicious-donut-caption">Stained Glass Donut</span><br />
                    <span className="text-rarity-rare">RARE</span><br />
                    { this.state.userDeliciousDonuts.includes(20) 
                        ? <span className="text-collected">Collected</span> 
                        : <span className="text-not-collected">Not Yet Collected</span> } <br />
                </div>
            </div>
        </div>
        ;

        let popUp = <Popup
            open={ true }
            modal nested>
            {close => (
            <div className="modal">
                <div className="pop-up-content">
                    <img src={AllOurDonut} alt="All our donut are belong to you!" /><br /><br />  
                    Congratulations! You've collected all 20 Delicious Donuts!<br />  
                </div>
                <div className="pop-up-actions">
                    <button className="pop-up-btn" onClick={() => { close(); }}>Close</button>
                </div>
            </div>
            )}
        </Popup>;

        return (
            <div className="content">
                { this.state.userDeliciousDonuts.length === 20 ? <Snowfall snowflakeCount={200} color="#fe6dda" style={{ height: '200vh' }} /> : <span />}
                { this.state.userDeliciousDonuts.length === 20 ? popUp : <span />}

                <img src={Title} alt="Delicious Donuts" className="logo-image" /><br /><br />    
      
                <p className="left-body">Delicious Donuts are a collection of 20 semi-fungible-pastries on the Gnosis Chain. Delicious Donuts were issued to DONUT holders in September 2022, celebrating the Ethereum Merge.</p>    
            
                <div className="network-account">
                { this.state.signer !== "" ? <span></span> : <span>NOT CONNECTED</span>}
                { this.state.network === 1 ? <span>ETHEREUM</span> : <span></span> }
                { this.state.network === 100 ? <span>GNOSIS</span> : <span></span> }
                { this.state.network !== 1 && this.state.network !== 100 ? <span>Unsupported Network</span> : <span></span> }
                &nbsp;|
                { this.state.signer !== "" ? <span> {this.state.currentAddress.substring(0,6)}...{this.state.currentAddress.substring(38,42)}</span> : <span></span>}
                </div>
                <br />
                { this.state.network !== 100 ? <span className="text-rarity-common">DELICIOUS DONUTS ONLY AVAILABLE ON GNOSIS CHAIN</span> : <span></span> }
                <br /><br />

                { this.state.isLoading ? <img src={Loading} alt="Loading" /> : render }
            </div>
        );
    }


}

export default DeliciousDonuts;
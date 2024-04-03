import React from 'react';
import { ethers } from 'ethers';
import Loading from '../img/loading.gif';
import Title from '../img/title-track.png';
import DonutTrack from '../img/donut-track.png';

class Track extends React.Component {

    constructor(props) {
      super(props);

      this.state = {
          isMetamaskConnected: false,

          provider: "",
          signer: "",
          currentAddress: "",
          network: 0,

          mainNetDonutTokenAddress: "0xc0f9bd5fa5698b6505f643900ffa515ea5df54a9",
          arbitrumOneDonutTokenAddress: "0xF42e2B8bc2aF8B110b65be98dB1321B1ab8D44f5",
          xdaiDonutTokenAddress: "0x524B969793a64a602342d89BC2789D43a016B13A",

          isLoading: true
      }

      this.run = this.run.bind(this);      
      this.addDonutsMainNet = this.addDonutsMainNet.bind(this);
      this.addDonutsArbitrumOne = this.addDonutsArbitrumOne.bind(this);
      this.addDonutsXDai = this.addDonutsXDai.bind(this);
      
      this.eventListeners = this.eventListeners.bind(this);
      this.connectWallet = this.connectWallet.bind(this);
      this.setWallet = this.setWallet.bind(this);

      //window.ethereum.enable().then(provider = new ethers.providers.Web3Provider(window.ethereum)).then(init).then(run).then();    
    }
    
    async run() {

      this.setState({
        isLoading: false
      });
    }
    
    async addDonutsMainNet() {
      await window.ethereum.request({
        method: 'wallet_watchAsset',
        params: {
          type: 'ERC20', 
          options: {
            address: this.state.mainNetDonutTokenAddress, 
            symbol: "DONUT", 
            decimals: 18, 
            image: "https://donut-dashboard.com/static/media/donut-logo.b1e2b1be.png", 
          },
        },
      });
    }

    async addDonutsArbitrumOne() {
      await window.ethereum.request({
          method: 'wallet_watchAsset',
          params: {
            type: 'ERC20', 
            options: {
              address: this.state.arbitrumOneDonutTokenAddress, 
              symbol: "DONUT", 
              decimals: 18, 
              image: "https://donut-dashboard.com/static/media/donut-logo.b1e2b1be.png", 
            },
          },
        });
    }    

    async addDonutsXDai() {
      await window.ethereum.request({
          method: 'wallet_watchAsset',
          params: {
            type: 'ERC20', 
            options: {
              address: this.state.xdaiDonutTokenAddress, 
              symbol: "DONUT", 
              decimals: 18, 
              image: "https://donut-dashboard.com/static/media/donut-logo.b1e2b1be.png", 
            },
          },
        });
    }

    async addXDaiNetwork() {
      try {
        await window.ethereum.request({
          method: 'wallet_addEthereumChain',
          params: [{
            chainId: '0x64',
            chainName: 'Gnosis',
            nativeCurrency: {
                name: 'XDAI',
                symbol: 'XDAI',
                decimals: 18
            },
            rpcUrls: ['https://rpc.gnosischain.com/'],
            blockExplorerUrls: ['https://gnosisscan.io']
            }]
        });
      }
      catch(e){
        console.log(e);
      };        
    }


      // Connect web3 wallet when user presses connect button
      async connectWallet() {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        await this.setWallet();
      }

      // Sets wallet variables in states
      async setWallet() {
        if (typeof window.ethereum !== 'undefined') {       
            let provider = new ethers.providers.Web3Provider(window.ethereum, "any");
            try {    
                let signer = await provider.getSigner();
                let network = await provider.getNetwork();
                let currentAddress = await signer.getAddress();
        
                this.setState({
                    provider: provider,
                    signer: signer,
                    network: network.chainId,
                    currentAddress: currentAddress
                });
                this.eventListeners();
                this.run();
            }
            catch (e) {}
          }
      }    

    async componentDidMount() {
      if (typeof window.ethereum !== 'undefined') {       
        this.setWallet();
      }
    }

    // Event Listeners
    async eventListeners() {
      window.ethereum.on('accountsChanged', (accounts) => {
        // Connecting 
        if (accounts.length > 0) {
          this.setState({
              currentAddress: accounts[0]
          });
        }
        // Disconnecting
        else {
          this.setState({
              isLoading: true,
              provider: "",
              signer: "",
              network: 0,
              currentAddress: ""
          });
        }
      });

      window.ethereum.on('chainChanged', (network) => {
        this.setState({
          network: parseInt(network)
        });
      });
    }

    render() {

        let render = 
              <div className="content">

                  { this.state.network===1 ? <div className="content-center"><button className="btn-main-net" id="mainNetButton" onClick={this.addDonutsMainNet}>TRACK DONUTS<br />(Ethereum Main Net)</button></div> 
                        : <div className="content-center"><button className="btn-disable-track" id="mainNetButton">TRACK DONUTS<br />(Ethereum Main Net)</button></div> }
                  { this.state.network===42161 ? <div className="content-center"><button className="btn-arbitrum-one" id="arbitrumOneButton" onClick={this.addDonutsArbitrumOne}>TRACK DONUTS<br />(Arbitrum One)</button></div> 
                        : <div className="content-center"><button className="btn-disable-track" id="mainNetButton">TRACK DONUTS<br />(Arbitrum One)</button></div> }                        
                  { this.state.network===100 ? <div className="content-center"><button className="btn-xdai" id="xdaiButton" onClick={this.addDonutsXDai}>TRACK DONUTS<br />(Gnosis Chain)</button></div> 
                    :  <div className="content-center"><button className="btn-disable-track" id="xdaiButton">TRACK DONUTS<br />(Gnosis Chain)</button></div>}                        
                </div>;

        return (
            <div className="content">
                {/* <img src={DonutTrack} alt="Donut detective" className="splash-image" /> */}
                <img src={Title} alt="Tracking Donuts" className="logo-image" /><br /><br />    
            
                <p className="left-body">Want to track donuts in your browser wallet?  Connect your wallet to this site and click the below buttons to keep tabs on your donut stack:</p>    
                
                <div className="network-account">
                { this.state.signer !== "" ? <span></span> : <span>NOT CONNECTED</span>}
                { this.state.network === 1 ? <span>ETHEREUM</span> : <span></span> }
                { this.state.network === 42161 ? <span>ARBITRUM ONE</span> : <span></span>}
                { this.state.network === 100 ? <span>GNOSIS</span> : <span></span> }
                { this.state.network !== 1 && this.state.network !== 42161 && this.state.network !== 100 && this.state.signer !== "" ? <span>Unsupported Network</span> : <span></span> }
                { this.state.signer !== "" ? <span>&nbsp;| {this.state.currentAddress.substring(0,6)}...{this.state.currentAddress.substring(38,42)}</span> : <span></span>}
                </div>
                <br /><br />

                { this.state.signer === "" ? <div className="content-center"><button className="pop-up-btn" id="connectWalletButton" onClick={this.connectWallet}>Connect Wallet</button></div> : <span></span> }
                { this.state.isLoading ? <img src={Loading} alt="Loading" /> : render }

            </div>
        );
    }


}

export default Track;
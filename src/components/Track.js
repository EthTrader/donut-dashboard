import React from 'react';
import { ethers } from 'ethers';
import Loading from '../img/loading.gif';
import Title from '../img/title-track.png';

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
          xdaiDonutTokenAddress: "0x524B969793a64a602342d89BC2789D43a016B13A",

          isLoading: true
      }

      this.run = this.run.bind(this);      
      this.addDonutsMainNet = this.addDonutsMainNet.bind(this);
      this.addDonutsXDai = this.addDonutsXDai.bind(this);
      this.addXDaiNetwork = this.addXDaiNetwork.bind(this);
      this.eventListeners = this.eventListeners.bind(this);

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
            chainName: 'xDAI Chain',
            nativeCurrency: {
                name: 'xDAI',
                symbol: 'xDAI',
                decimals: 18
            },
            rpcUrls: ['https://rpc.xdaichain.com'],
            blockExplorerUrls: ['https://blockscout.com/poa/mainnet/']
            }]
        });
      }
      catch(e){
        console.log(e);
      };        
    }

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

                  <div className="content-center"><button className="btn-xdai-network" id="xdaiButton" onClick={this.addXDaiNetwork}>Add xDai Network to Metamask</button></div> 
                  { this.state.network===1 ? <div className="content-center"><button className="btn-main-net" id="mainNetButton" onClick={this.addDonutsMainNet}>Track Donuts in Metamask<br />(Ethereum Main Net)</button></div> 
                        : <div className="content-center"><button className="btn-disable-track" id="mainNetButton">Track Donuts in Metamask<br />(Ethereum Main Net)</button></div> }
                  { this.state.network===100 ? <div className="content-center"><button className="btn-xdai" id="xdaiButton" onClick={this.addDonutsXDai}>Track Donuts in Metamask<br />(XDai)</button></div> 
                    :  <div className="content-center"><button className="btn-disable-track" id="xdaiButton">Track Donuts in Metamask<br />(XDai)</button></div>}                        
                </div>;

        return (
            <div className="content">
                <img src={Title} alt="Tracking Donuts" className="logo-image" /><br /><br />    
            
                <p className="left-body">Want to track donuts in your Metamask wallet or need to add the xDai network?  Connect your Metamask account to this site and click the below buttons:</p>    
                
                <div className="network-account">
                  { this.state.signer !== "" ? <span></span> : <span>NOT CONNECTED</span>}
                  { this.state.network === 1 ? <span>ETHEREUM</span> : <span></span> }
                  { this.state.network === 100 ? <span>XDAI</span> : <span></span> }
                  { this.state.signer !== "" ? <span>&nbsp;| {this.state.currentAddress.substring(0,6)}...{this.state.currentAddress.substring(38,42)}</span> : <span></span>}
                </div><br /><br />

                { this.state.isLoading ? <img src={Loading} alt="Loading" /> : render }

            </div>
        );
    }


}

export default Track;
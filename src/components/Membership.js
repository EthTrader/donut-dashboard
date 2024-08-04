import React from 'react';
import { ethers } from 'ethers';
import Loading from '../img/loading.gif';
import Title from '../img/title-track.png';
import membershipABI from '../abi/membershipABI.json'
import erc20ABI from '../abi/erc20ABI.json'

class Membership extends React.Component {

    constructor(props) {
      super(props);

      this.state = {
          isMetamaskConnected: false,

          provider: "",
          signer: "",
          currentAddress: "",
          network: 0,

          donutTokenAddress: "",
          membershipContractAddress: "",

          donutBalance: 0,
          isSeasonActive: false,

          donutSpendingIsApproved: false,
          membershipsOwned: 0,
          validationError: "",

          isLoading: true
      }

      this.run = this.run.bind(this);      
      this.addDonutsArbitrumOne = this.addDonutsArbitrumOne.bind(this);
      
      this.eventListeners = this.eventListeners.bind(this);
      this.connectWallet = this.connectWallet.bind(this);
      this.setWallet = this.setWallet.bind(this);
      this.getMembershipData = this.getMembershipData.bind(this);
      this.buttonApproveSpending = this.buttonApproveSpending.bind(this);
      this.buttonPurchaseMembership = this.buttonPurchaseMembership.bind(this);
    }
    
    async run() {
        await this.getMembershipData();

        this.setState({
            isLoading: false
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

    async getMembershipData() {
        let donutTokenAddress;
        let membershipContractAddress;
        
        // Arbitrum One
        if (this.state.network === 42161) {
            donutTokenAddress = "0xF42e2B8bc2aF8B110b65be98dB1321B1ab8D44f5";
            // membershipContractAddress = ;
        }
        // Arbitrum Sepolia Testnet
        if (this.state.network === 421614) {
            donutTokenAddress = "0xb1D4538B4571d411F07960EF2838Ce337FE1E80E";
            membershipContractAddress = "0x5bd6b58d952d895926626c45a5bf0350d7b64ebb";
        }
        else {
            return;
        }

        let donutTokenContract = new ethers.Contract(donutTokenAddress, erc20ABI, this.state.signer);
        let membershipContract = new ethers.Contract(membershipContractAddress, membershipABI, this.state.signer);

        let isSeasonActive = await membershipContract.isSeasonActive();
        console.log("isSeasonActive:", isSeasonActive);

        let membershipPrice = await membershipContract.getMintPriceInDonut();
        console.log("membershipPrice:", membershipPrice.toNumber());

        let membershipsOwned = await membershipContract.balanceOf(this.state.currentAddress);
        console.log("membershipsOwned:", membershipsOwned.toNumber());

        let donutSpendingIsApproved = false;
        let allowance = await donutTokenContract.allowance(this.state.currentAddress, membershipContractAddress);
        console.log("allowance:", allowance);
        if(allowance.gte("0x7fffffffffffffffffffffffffffffff")) {
            donutSpendingIsApproved = true;
        }
        console.log("donutSpendingIsApproved:", donutSpendingIsApproved);

        let donutBalance = await donutTokenContract.balanceOf(this.state.currentAddress);
        donutBalance = donutBalance / 1_000_000_000_000_000_000;
        console.log("donutBalance:", donutBalance);

        this.setState({
            donutTokenContract: donutTokenContract,
            membershipContract: membershipContract,
            donutTokenAddress: donutTokenAddress,
            membershipContractAddress: membershipContractAddress,
            donutSpendingIsApproved: donutSpendingIsApproved,
            donutBalance: donutBalance,
            isSeasonActive: isSeasonActive,
            membershipPrice: membershipPrice.toNumber(),
            membershipsOwned: membershipsOwned.toNumber(),
            loading: false
          });
    }

    // async checkAllowance() {
    //     if(this.state.isApproved) return;
    //     const allowance = await this.state.uniDonutTokenContract.allowance(this.state.currentAddress, this.state.stakingContractAddress);
    //     //is approved?
    //     if(allowance.gte("0x7fffffffffffffffffffffffffffffff")) {
    //       this.setState({
    //         isApproved: true
    //       });
    //     }
    //   }

    async buttonApproveSpending() {
        let transactionResponse = await this.state.donutTokenContract.approve(this.state.membershipContractAddress, "0xffffffffffffffffffffffffffffffffffffffff");
        transactionResponse.wait(1).then(this.refresh);
    }

    async buttonPurchaseMembership() {
        // User must have enough funds
        let error;
        if (this.state.donutBalance < this.state.membershipPrice) error = "Not enough DONUT in wallet to cover membership price.";
        // Season must be active
        if (!this.state.isSeasonActive) error = "Membership minting is not currently active.";
        // Spending approval must be in place
        if (!this.state.donutSpendingIsApproved) error = "DONUT spending needs to be approved in wallet.";

        if (error) {
            this.setState({
                validationError: error
            });
            return;
        }

        console.log(this.state.membershipContract);
        let transactionResponse = await this.state.membershipContract.safeMint(this.state.currentAddress);
        this.setState({
            isLoading: true
        });
        transactionResponse.wait(1).then(this.refresh);
        this.setState({
            isLoading: false
        });
    }

    render() {

        <button className="btn-active" id="stakeButton" onClick={this.stake}>Stake LP Tokens</button>
        
        let render;

        if (this.state.network === 42161 || this.state.network === 421614) {
            render = 
                <div>
                <div className="content-center">Your DONUT Balance: {this.state.donutBalance}</div>
                <div className="content-center">Is DONUT spending approved: {this.state.donutSpendingIsApproved.toString()}</div>
                <div className="content-center">Is Season Active: {this.state.isSeasonActive.toString()}</div>
                <div className="content-center">Membership Price: {this.state.membershipPrice}</div>
                <div className="content-center">Memberships Owned: {this.state.membershipsOwned}</div>
                <div className="content-center">
                    { this.state.donutSpendingIsApproved ? 
                    <button className="btn-active" id="purchaseButton" onClick={this.buttonPurchaseMembership}>Purchase Membership</button> :
                    <button className="btn-active" id="approveButton" onClick={this.buttonApproveSpending}>Approve Donut Spending</button>
                    }
                </div>
                { this.state.validationError ? <span>{this.state.validationError}</span> : <span></span>}
                </div>
        }
        else {
            render = <p>Memberships are only available for purchase on Arbitrum One.</p>
        }

        return (
            <div className="content">
                {/* <img src={DonutTrack} alt="Donut detective" className="splash-image" /> */}
                <img src={Title} alt="Membership" className="logo-image" /><br /><br />    
            
                <p className="left-body">Memberships are only available for purchase on Arbitrum One.</p>    
                
                <div className="network-account">
                { this.state.signer !== "" ? <span></span> : <span>NOT CONNECTED</span>}
                { this.state.network === 42161 ? <span>ARBITRUM ONE</span> : <span></span>}
                { this.state.network === 421614 ? <span>ARBITRUM SEPOLIA</span> : <span></span>}
                { this.state.network !== 42161 && this.state.network !== 421614 && this.state.signer !== "" ? <span>Unsupported Network</span> : <span></span> }
                { this.state.signer !== "" ? <span>&nbsp;| {this.state.currentAddress.substring(0,6)}...{this.state.currentAddress.substring(38,42)}</span> : <span></span>}
                </div>
                <br /><br />

                { this.state.signer === "" ? <div className="content-center"><button className="pop-up-btn" id="connectWalletButton" onClick={this.connectWallet}>Connect Wallet</button></div> : <span></span> }
                { this.state.isLoading ? <img src={Loading} alt="Loading" /> : render }

            </div>
        );
    }


}

export default Membership;
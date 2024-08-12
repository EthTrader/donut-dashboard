import React from 'react';
import { ethers } from 'ethers';
import Loading from '../img/loading.gif';
import Title from '../img/title-track.png';
import MembershipNFTSeason01 from '../img/membership-nft-season-01.png';
import membershipABI from '../abi/membershipABI.json'
import erc20ABI from '../abi/erc20ABI.json'
import {
    Accordion,
    AccordionItem,
    AccordionItemHeading,
    AccordionItemButton,
    AccordionItemPanel,
  } from 'react-accessible-accordion';
import Snackbar from 'awesome-snackbar';  
import Snowfall from 'react-snowfall';

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
          addressToPurchaseFor: "",

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
      this.membershipPurchasedCelebration = this.membershipPurchasedCelebration.bind(this);
      this.handleInputChange = this.handleInputChange.bind(this);
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

        let membershipPrice = await membershipContract.getMintPriceInDonut();

        let membershipsOwned = await membershipContract.balanceOf(this.state.currentAddress);

        let donutSpendingIsApproved = false;
        let allowance = await donutTokenContract.allowance(this.state.currentAddress, membershipContractAddress);

        if(allowance.gte("0x7fffffffffffffffffffffffffffffff")) {
            donutSpendingIsApproved = true;
        }

        let donutBalance = await donutTokenContract.balanceOf(this.state.currentAddress);
        donutBalance = donutBalance / 1_000_000_000_000_000_000;

        let addressToPurchaseFor;
        if (!this.state.addressToPurchaseFor) {
            addressToPurchaseFor = this.state.currentAddress;
        }

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
            addressToPurchaseFor: addressToPurchaseFor,
            isLoading: false
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
        this.setState({
            isLoading: true
        });
        await transactionResponse.wait();
        this.getMembershipData();
    }

    async buttonPurchaseMembership() {
        // User must have enough funds
        let error;
        if (this.state.donutBalance < this.state.membershipPrice) error = "Not enough DONUT in wallet to cover membership price.";
        // Season must be active
        if (!this.state.isSeasonActive) error = "Membership minting is not currently active.";
        // Spending approval must be in place
        if (!this.state.donutSpendingIsApproved) error = "DONUT spending needs to be approved in wallet.";
        // Must have valid Ethereum Address (42 chars)
        if (this.state.addressToPurchaseFor.length !== 42) error = "Invalid Ethereum address entered.";
        // Must have valid Ethereum Address (Stars with 0x)
        if (this.state.addressToPurchaseFor.substring(0,2) !== "0x") error = "Invalid Ethereum address entered.";        

        if (error) {
            this.setState({
                validationError: error
            });
            return;
        }

        let transactionResponse = await this.state.membershipContract.safeMint(this.state.addressToPurchaseFor);
        this.setState({
            isLoading: true
        });
        try {
            await transactionResponse.wait();
            this.getMembershipData();
            this.membershipPurchasedCelebration();
        }
        catch (e) {
            console.log(e);
        }
    }

    async membershipPurchasedCelebration(amount) {
        new Snackbar(("<b>Membership successfully purchased!</b><br /> You have attained the rank of Donuteer."), {
          iconSrc: 'donut-logo.png',
          actionText: 'Close',
          timeout: 9000,
          position: 'top-right',
          style: {
            container: [
                ['border', 'solid'],
                ['border-image-slice', '1'],
                ['border-image-source', 'linear-gradient(to right, #68c47c 0%, #6191c6  51%, #68c47c  100%)'],
                ['border-width', '3px'],
                ['border-radius', '5px']
            ],
            message: [
                ['color', 'white'],
            ],
            bold: [
                ['font-weight', 'bold'],
            ],
            actionButton: [
                ['color', '#fe6dda'],
            ],
          }
        });  
      }    

    async handleInputChange(event) {    
        let addressToPurchaseFor = event.target.value;
        
        this.setState({
            addressToPurchaseFor: addressToPurchaseFor
        });
    }

    render() {

        <button className="btn-active" id="stakeButton" onClick={this.stake}>Stake LP Tokens</button>
        
        let render;

        if (this.state.network === 42161 || this.state.network === 421614) {
            render = 
            <div>
                { this.state.membershipsOwned > 0 ? <Snowfall snowflakeCount={300} color="#fe6dda" style={{ height: '200vh' }} /> : <span />}
                <div className="membership-card">
                    <img src={MembershipNFTSeason01} alt="Membership NFT, Season 1" className="membership-nft-image" />
                    {
                        this.state.membershipsOwned > 1 ?
                        <div className="content-center"><span className="membership-label">Membership Status:</span> <span className="text-collected">ACTIVE</span></div> :
                        <div className="content-center"><span className="membership-label">Membership Status:</span> <span className="text-not-collected">INACTIVE</span></div>
                    }
                    <br />

                    <div className="content-center"><span className="membership-label">Membership Price:</span> {this.state.membershipPrice} DONUT</div>
                    <div className="content-center"><span className="darkPinkText boldText">Your Balance:</span><span className="grayText"> {this.state.donutBalance} DONUT</span></div>
                    <br />
                    {
                        this.state.membershipsOwned === 1 ?
                        <div className="content-center"><span className="membership-label">YOU CURRENTLY OWN {this.state.membershipsOwned} MEMBERSHIP.</span></div> :
                        <div></div>
                    }                    
                    {
                        this.state.membershipsOwned > 1 ?
                        <div className="content-center"><span className="membership-label">YOU CURRENTLY OWN {this.state.membershipsOwned} MEMBERSHIPS.</span></div> :
                        <div></div>
                    }                                                  

                    <br />

                    <div className="content-center">
                        { this.state.donutSpendingIsApproved ? 
                        <div>
                            <div className="content-center"><span className="orangeText">Purchase Membership for:</span></div>
                            <div className="content-center"><input type="text" className="purchase-box" defaultValue={this.state.addressToPurchaseFor} onChange={this.handleInputChange} placeholder="Enter Address to Purchase For"/></div>
                            <button className="btn-active" id="purchaseButton" onClick={this.buttonPurchaseMembership}>Purchase Membership</button>
                        </div>      :
                        <button className="btn-active" id="approveButton" onClick={this.buttonApproveSpending}>Approve Donut Spending</button>
                        }
                    </div>
                    { this.state.validationError ? <span className="errorText">{this.state.validationError}</span> : <span></span>}
                </div>
            </div>
        }

        return (
            <div className="content">
                <img src={Title} alt="Membership" className="logo-image" /><br /><br />    
            
                <Accordion allowZeroExpanded>
                  <AccordionItem>
                      <AccordionItemHeading>
                          <AccordionItemButton>
                              What are /r/ethtrader memberships?
                          </AccordionItemButton>
                      </AccordionItemHeading>
                      <AccordionItemPanel>
                        <p className="left-body">r/EthTrader Special Memberships have returned! Special Memberships are now fully independent of Reddit, managed directly by the r/EthTrader mod team.</p>
                        <p className="left-body">These memberships offer a range of exclusive perks to subscribers, and are represented by mintable NFTs.</p>
                        <p className="left-body">Special Memberships are available as seasonal subscriptions, each represented by a unique, tradable "card". Unlike traditional monthly subscriptions, seasons last for 2 months, each with its own distinct NFT that you need to mint (purchase).</p>
                        <p className="left-body">As a subscriber, you'll have access to several privileges within the subreddit, such as customizable user flairs and the ability to post GIFs. By subscribing, you actively contribute to DONUT tokenomics. Donuts used for membership subscriptions are burned, reducing the circulating supply and supporting the overall value of DONUT.</p>
                        <p className="left-body">Memberships are only available for purchase on Arbitrum One.</p>
                      </AccordionItemPanel>
                  </AccordionItem>                 
              </Accordion>  
              <br></br>
                
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
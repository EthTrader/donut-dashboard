import React from 'react';
import { ethers } from 'ethers';
import Loading from '../img/loading.gif';
import Title from '../img/title-membership.png';
import MembershipNFT from '../img/membership-nft-season-02.png';
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
import CountdownTimer from './CountdownTimer';

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
            membershipContractAddress = "0xd0C2bB20c1fa8447B38756F16dD041b0C05f88B6";
        }
        // Arbitrum Sepolia Testnet
        else if (this.state.network === 421614) {
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

        if(allowance.gte(membershipPrice)) {
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

    async buttonApproveSpending() {
        let transactionResponse = await this.state.donutTokenContract.approve(this.state.membershipContractAddress, this.state.membershipPrice.toString() + "000000000000000000");
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
        new Snackbar(("<b>Membership successfully purchased!</b>"), {
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
        let addressToPurchaseFor
        if (event.target.value) {
            addressToPurchaseFor = event.target.value;
        }
        
        this.setState({
            addressToPurchaseFor: addressToPurchaseFor
        });
    }

    render() {
        
        let render;

        if (this.state.network === 42161 || this.state.network === 421614) {
            render = 
            <div>
                { this.state.membershipsOwned > 0 ? <Snowfall snowflakeCount={300} color="#fe6dda" style={{ height: '200vh' }} /> : <span />}
                <div className="membership-card">
                    <img src={MembershipNFT} alt="Membership NFT, Season 3" className="membership-nft-image" />
                    <br />
                    {
                        this.state.membershipsOwned >= 1 ?
                        <div className="content-center"><span className="membership-label">Membership Status:</span> <span className="text-collected">ACTIVE</span></div> :
                        <div className="content-center"><span className="membership-label">Membership Status:</span> <span className="text-not-collected">INACTIVE</span></div>
                    }
                    <br />

                    <div className="content-center"><span className="membership-label">Membership Price:</span> {this.state.membershipPrice} DONUT</div>
                    <div className="content-center"><span className="darkPinkText boldText">Your Balance:</span><span className="grayText"> {Math.floor(this.state.donutBalance)} DONUT</span></div>
                    <br />
                    {
                        this.state.membershipsOwned === 1 ?
                        <div className="content-center"><span className="membership-label">YOU CURRENTLY OWN</span><span className="whiteText boldText"> {this.state.membershipsOwned} MEMBERSHIP.</span></div> :
                        <div></div>
                    }                    
                    {
                        this.state.membershipsOwned > 1 ?
                        <div className="content-center"><span className="membership-label">YOU CURRENTLY OWN</span><span className="whiteText boldText"> {this.state.membershipsOwned} MEMBERSHIPS.</span></div> :
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
                            About r/EthTrader Special Memberships
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
              <Accordion allowZeroExpanded>
                  <AccordionItem>
                      <AccordionItemHeading>
                          <AccordionItemButton>
                              Frequently Asked Questions
                          </AccordionItemButton>
                      </AccordionItemHeading>
                      <AccordionItemPanel>
                        <p className="left-body faq-q">What are r/EthTrader Special Memberships?</p>
                        <p className="left-body faq-a">Special Memberships are seasonal subscriptions represented by unique, tradable NFT "cards" that offer different perks to subscribers within the r/EthTrader subreddit. Each season lasts for 2 months and has its own card (NFT).</p>
                        <hr />

                        <p className="left-body faq-q">How do I purchase a Special Membership?</p>
                        <p className="left-body faq-a">You can purchase a Special Membership by minting the NFT on the Donut Dashboard.</p>
                        <hr />

                        <p className="left-body faq-q">How much does a subscription cost?</p>
                        <p className="left-body faq-a">The cost is pegged to USD, it is $10 worth of DONUT.</p>
                        <hr />

                        <p className="left-body faq-q">What perks do subscribers receive?</p>
                        <p className="left-body faq-a">Subscribers have access to several perks, including customizable user flairs and the ability to post GIFs. Additionally, a golden donut will appear in your user flair.</p>
                        <hr />

                        <p className="left-body faq-q">How do seasons work?</p>
                        <p className="left-body faq-a">Seasons last for 2 months and have a fixed expiration date for all members, regardless of when you subscribe. As the season progresses, the membership price will gradually reduce.</p>
                        <hr />

                        <p className="left-body faq-q">Can I stack my subscriptions?</p>
                        <p className="left-body faq-a">No, subscriptions do not stack. If you buy multiple memberships, the duration will remain the same, corresponding to the current season.</p>
                        <hr />

                        <p className="left-body faq-q">What happens when the season ends?</p>
                        <p className="left-body faq-a">At the end of each season, the associated NFT will "expire". As such, you will need to mint a new NFT for the upcoming season to maintain your membership perks.</p>
                        <hr />

                        <p className="left-body faq-q">How do I unlock the subreddit perks?</p>
                        <p className="left-body faq-a">The entire process is automated. Once you mint the NFT, your perks will unlock within a few minutes. To customize your user flair, you can use the !flair command, followed by your desired flair description. Example: !flair my customized flair</p>                     
                        <hr />

                        <p className="left-body faq-q">What happens if I transfer my membership card?</p>
                        <p className="left-body faq-a">If you sell or transfer your NFT, the associated perks will automatically end.</p>                     
                        <hr />

                        <p className="left-body faq-q">Can I gift memberships?</p>
                        <p className="left-body faq-a">Yes, season passes can be gifted to other users.</p>                     
                        <hr />

                        <p className="left-body faq-q">Can I still keep my old membership card?</p>
                        <p className="left-body faq-a">Yes, previously minted membership cards (NFTs) are yours to keep, even after they expire. They serve as a collectible record of your participation in past seasons.</p>                     
                        <hr />

                        <p className="left-body faq-q">Does the wallet used to hold the membership NFT need to be the same as the one registered in the subreddit?</p>
                        <p className="left-body faq-a">Yes, the wallet used to hold the membership card must be the same wallet registered in the subreddit, to ensure you have access to all the associated perks.</p>                                                                                                                                                                      
                        <hr />
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

                <CountdownTimer />
                <br /><br />

                { this.state.signer === "" ? <div className="content-center"><button className="pop-up-btn" id="connectWalletButton" onClick={this.connectWallet}>Connect Wallet</button></div> : <span></span> }
                { this.state.isLoading ? <img src={Loading} alt="Loading" /> : render }

            </div>
        );
    }


}

export default Membership;
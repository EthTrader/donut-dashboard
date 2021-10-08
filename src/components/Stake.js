import React from 'react';
import { ethers, utils } from 'ethers';
import SteakLogo from '../img/donut-steak.png';
import Loading from '../img/loading.gif';
import Title from '../img/title-stake.png';
import { GrowlScene, growl } from '@crystallize/react-growl';

class Stake extends React.Component {

    constructor(props) {
      super(props);

      const erc20Abi = [
        // Read-Only Functions
        "function totalSupply() public view returns (uint256)",
        "function balanceOf(address owner) view returns (uint256)",
        "function decimals() view returns (uint8)",
        "function symbol() view returns (string)",
        "function allowance(address owner, address spender) view returns (uint)",
        // Authenticated Functions
        "function transfer(address to, uint amount) returns (boolean)",
        "function approve(address _spender, uint256 _amount) returns (bool success)",
        // Events
        "event Transfer(address indexed from, address indexed to, uint amount)"];

      const uniTokenAbi = erc20Abi.concat(
      ["function getReserves() public view returns (uint112 _reserve0, uint112 _reserve1, uint32 _blockTimestampLast)"]);

      const stakingContractAbi = [
        "function balanceOf(address account) public view returns (uint256)",
        "function totalSupply() public view returns (uint256)",
        "function rewardRate() public view returns (uint256)",
        "function lastTimeRewardApplicable() public view returns (uint64)",
        "function rewardPerToken() public view returns (uint128)",
        "function earned(address account) view returns (uint128)",
        "function stake(uint128 amount)",
        "function withdraw()",
        "function exit()",
        "function getReward()",
        "event RewardPaid(address indexed user, uint256 reward)"];

      this.state = {
          isMetamaskConnected: false,
          xdaiDonutBalance: 0,

          provider: "",
          signer: "",
          currentAddress: "",

          xdaiBalance: "",
          donutBalance: "",
          uniDonutBalance: "",
          uniDonutBalanceBigNum: "",
          totalStaked: "",
          stakedByUser: "",
          claimableByUser: "",
          
          totalUniDonutSupply: "",
          donutsInUniswap: "",

          dailyRoi: 0,
          yearlyRoi: 0,
          estimatedDailyDonuts: 0,

          isApproved: false,
          
          donutTokenAddress: "",
          uniDonutTokenAddress: "",
          stakingContractAddress: "",

          uniTokenAbi: uniTokenAbi,
          stakingContractAbi: stakingContractAbi,
          erc20Abi: erc20Abi,
           
          donutTokenContract: "",
          uniDonutTokenContract: "",
          stakingContract: "",

          userXdaiStaked: 0,
          userDonutStaked: 0,

          stakedFraction: 0,
          stakedByUserFraction: 0,
          heldByUserFraction: 0,

          totalXdaiStaked: 0,
          totalDonutStaked: 0,

          isLoading: true
      }

      this.run = this.run.bind(this);
      this.refresh = this.refresh.bind(this);
      this.getBalances = this.getBalances.bind(this);
      this.getNetwork = this.getNetwork.bind(this);
      this.checkAllowance = this.checkAllowance.bind(this);
      this.approveUniDonut = this.approveUniDonut.bind(this);
      this.stake = this.stake.bind(this);
      this.withdraw = this.withdraw.bind(this);
      this.claimDonuts = this.claimDonuts.bind(this);
      this.exit = this.exit.bind(this);
      this.rewardPaid = this.rewardPaid.bind(this);
      this.eventListeners = this.eventListeners.bind(this);
    }
    
    async run() {
      this.setState({
        isLoading: false
      });
    }

    async refresh() {
      await this.getBalances();

      this.setState({
        isLoading: false
      });
    }
    
    async getBalances() {
      let xdaiBalance = await this.state.signer.getBalance();
      xdaiBalance = parseFloat(ethers.utils.formatEther(xdaiBalance)).toFixed(2);

      let donutBalance = await this.state.donutTokenContract.balanceOf(this.state.currentAddress);
      donutBalance = (donutBalance/1e18).toFixed(2);

      let uniDonutBalance = await this.state.uniDonutTokenContract.balanceOf(this.state.currentAddress);
      let uniDonutBalanceBigNum = uniDonutBalance;
      uniDonutBalance = (uniDonutBalance/1e18).toFixed(2);

      let totalStaked = await this.state.stakingContract.totalSupply();
      totalStaked = (totalStaked/1e18).toFixed(3);

      let stakedByUser = await this.state.stakingContract.balanceOf(this.state.currentAddress);
      stakedByUser = (stakedByUser/1e18).toFixed(3);

      let claimableByUser = await this.state.stakingContract.earned(this.state.currentAddress);
      claimableByUser = (claimableByUser/1e18).toFixed(3);

      let totalUniDonutSupply = await this.state.uniDonutTokenContract.totalSupply();
      totalUniDonutSupply = (totalUniDonutSupply/1e18).toFixed(3);
      
      //On main net, the pair is ETH-DONUT.  On xdai, the pair is DONUT-XDAI.  Order of tokens matters here for assigning values.
      let donutsInUniswap, wxdaiInUniswap;
      if (this.state.network === 1) {
        [wxdaiInUniswap, donutsInUniswap] = await this.state.uniDonutTokenContract.getReserves();  
      }
      if (this.state.network === 100) {
        [donutsInUniswap, wxdaiInUniswap] = await this.state.uniDonutTokenContract.getReserves();  
      }
      let stakedFraction = totalStaked/totalUniDonutSupply;

      wxdaiInUniswap = (wxdaiInUniswap/1e18).toFixed(0);
      donutsInUniswap = (donutsInUniswap/1e18).toFixed(0);
      
      const effectiveStakedDonuts = stakedFraction*donutsInUniswap*2;

      const rewardPerDayInDonuts = 24*60*60*(await this.state.stakingContract.rewardRate())/1e18;
      let dailyRoi = rewardPerDayInDonuts/effectiveStakedDonuts;
      let yearlyRoi = dailyRoi*365;

      dailyRoi = (dailyRoi*100).toFixed(3);
      yearlyRoi = (yearlyRoi*100).toFixed(3);

      let stakedByUserFraction = stakedByUser/totalStaked;
      let heldByUserFraction = stakedByUser/totalUniDonutSupply;
      const estimatedDailyDonuts = (stakedByUserFraction*rewardPerDayInDonuts).toFixed(3);      

      let userDonutStaked = (donutsInUniswap*stakedByUserFraction*stakedFraction).toFixed(0);
      let userXdaiStaked = (wxdaiInUniswap*stakedByUserFraction*stakedFraction).toFixed(2);

      let totalDonutStaked = (donutsInUniswap*stakedFraction).toFixed(0);
      let totalXdaiStaked = (wxdaiInUniswap*stakedFraction).toFixed(2);

      stakedFraction = (stakedFraction*100).toFixed(3);
      stakedByUserFraction = (stakedByUserFraction*100).toFixed(3);
      heldByUserFraction = (heldByUserFraction*100).toFixed(3);

      this.setState({
        xdaiBalance: xdaiBalance,
        donutBalance: donutBalance,
        uniDonutBalance: uniDonutBalance,
        uniDonutBalanceBigNum: uniDonutBalanceBigNum,
        totalStaked: totalStaked,
        stakedByUser: stakedByUser,
        claimableByUser: claimableByUser,
        totalUniDonutSupply: totalUniDonutSupply,
        dailyRoi: dailyRoi,
        yearlyRoi: yearlyRoi,
        estimatedDailyDonuts: estimatedDailyDonuts,
        userDonutStaked: userDonutStaked,
        userXdaiStaked: userXdaiStaked,
        stakedFraction: stakedFraction,
        stakedByUserFraction: stakedByUserFraction,
        heldByUserFraction: heldByUserFraction,
        totalXdaiStaked: totalXdaiStaked,
        totalDonutStaked: totalDonutStaked,
        isLoading: false
      });
    }

    async getNetwork() {
      let provider = new ethers.providers.Web3Provider(window.ethereum, "any");
      let signer = await provider.getSigner();
      let currentAddress = await signer.getAddress();
      let network = await (await provider.getNetwork()).chainId;

      let donutTokenAddress;
      let uniDonutTokenAddress;
      let stakingContractAddress;  

      //Main Net Addresses
      if (network === 1) {
        donutTokenAddress = "0xC0F9bD5Fa5698B6505F643900FFA515Ea5dF54A9";
        uniDonutTokenAddress = "0x718Dd8B743ea19d71BDb4Cb48BB984b73a65cE06";
        stakingContractAddress = "0x813fd5A7B6f6d792Bf9c03BBF02Ec3F08C9f98B2";  
      }
      
      //Xdai Addresses
      if (network === 100) {
        donutTokenAddress = "0x524B969793a64a602342d89BC2789D43a016B13A";
        uniDonutTokenAddress = "0x077240a400b1740C8cD6f73DEa37DA1F703D8c00";
        stakingContractAddress = "0x84b427415A23bFB57Eb94a0dB6a818EB63E2429D";
      }

      // Create contract objects from address and ABI
      let donutTokenContract = new ethers.Contract(donutTokenAddress, this.state.erc20Abi, signer);
      let uniDonutTokenContract = new ethers.Contract(uniDonutTokenAddress, this.state.uniTokenAbi, signer);
      let stakingContract = new ethers.Contract(stakingContractAddress, this.state.stakingContractAbi, signer);

      this.setState({
        signer: signer,
        provider: provider,
        currentAddress: currentAddress,
        network: network,

        donutTokenContract: donutTokenContract,
        uniDonutTokenContract: uniDonutTokenContract,
        stakingContract: stakingContract,

        donutTokenAddress: donutTokenAddress,          
        uniDonutTokenAddress: uniDonutTokenAddress,
        stakingContractAddress: stakingContractAddress,        
      });
    }
    
    async checkAllowance() {
      if(this.state.isApproved) return;
      const allowance = await this.state.uniDonutTokenContract.allowance(this.state.currentAddress, this.state.stakingContractAddress);
      //is approved?
      if(allowance.gte("0x7fffffffffffffffffffffffffffffff")) {
        this.setState({
          isApproved: true
        });
      }
    }
    
    async approveUniDonut() {
      let transactionResponse = await this.state.uniDonutTokenContract.approve(this.state.stakingContractAddress, "0xffffffffffffffffffffffffffffffffffffffff");
      transactionResponse.wait(1).then(this.refresh);
    }
    
    async stake() {
      let transactionResponse = await this.state.stakingContract.stake(this.state.uniDonutBalanceBigNum);
      this.setState({
        isLoading: true
      });
      transactionResponse.wait(1).then(this.refresh);
    }
    
    async withdraw() {
      let transactionResponse = await this.state.stakingContract.withdraw();
      this.setState({
        isLoading: true
      });
      transactionResponse.wait(1).then(this.refresh);
    }
    
    async claimDonuts() {
      let transactionResponse = await this.state.stakingContract.getReward();
      this.setState({
        isLoading: true
      });
      transactionResponse.wait(1).then(this.refresh);
    }
    
    async exit() {
      let transactionResponse = await this.state.stakingContract.exit();
      this.setState({
        isLoading: true
      });
      transactionResponse.wait(1).then(this.refresh);
    } 

    async componentDidMount() {
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      if (typeof window.ethereum !== 'undefined') {
        
        await this.getNetwork();

        if (this.state.network === 1 || this.state.network === 100) {
          await this.getBalances();
          await this.checkAllowance();
          this.eventListeners();
        }
      }

      this.run();
    }

    async eventListeners() {
      //Event listener for user changing metamask account
      window.ethereum.on('accountsChanged', (accounts) => {
        this.setState({
          currentAddress: accounts[0],
          isLoading: true
        });
        if (this.state.network === 1 || this.state.network === 100) {
          this.getBalances();
          this.checkAllowance();
        }
      });

      //Event listener for user changing metamask network
      window.ethereum.on('chainChanged', (network) => {
        this.setState({
          network: parseInt(network),
          isLoading: true
        });
        if (this.state.network === 1 || this.state.network === 100) {
          this.getNetwork();
          this.getBalances();
          this.checkAllowance();
        }
      });

      //Event listener for RewardPaid
      this.state.stakingContract.on('RewardPaid', (sender, donuts, event) => {
        let amount = (donuts/1e18).toFixed(3);
        if (sender === this.state.currentAddress) {
          this.rewardPaid(amount);
        }
      });
    }

    async rewardPaid(amount) {
      const myGrowl = await growl({
        title: "Donuts successfully claimed!",
        message: amount + ' donuts harvested, fresh from the bakery.',
        timeout: 9000
    });
    }

    render() {

        let render = 
              <div className="content">          
                  <div className="content-center">
                    { this.state.isApproved ? <p></p> : 
                    <button className="btn-active" id="approveButton" onClick={this.approveUniDonut}>Approve LP Token Spending</button>}
                  </div>
                  <div className="content-center">
                    { this.state.isApproved && this.state.uniDonutBalance > 0 ? <button className="btn-active" id="stakeButton" onClick={this.stake}>Stake LP Tokens</button>
                    : <p></p> }
                  </div>

                  { this.state.isApproved ? 
                  <table className="harvest-table">
                  <tbody>
                    <tr>
                    <th>{ this.state.isApproved && this.state.claimableByUser > 0 ? <div><span className="stake-header">READY TO HARVEST</span><br /> <span className="harvest-number">{this.state.claimableByUser}</span>DONUTS</div> : <span></span>}</th>
                    <th>{ this.state.isApproved && this.state.claimableByUser > 0 ? <div className="content-center"><button className="btn-harvest" id="harvestButton" onClick={this.claimDonuts}>Harvest Donuts</button></div> : <span></span> }</th>
                    <th>{ this.state.stakedByUser > 0 && this.state.claimableByUser < 0.001 ? <p>You are currently staking, but don't have any donuts to harvest yet.  Return to this page later!</p> : <span></span> }</th>
                    <th>{ this.state.isApproved && this.state.stakedByUser > 0 ? <div className="content-center"><button className="btn-withdraw" id="withdrawButton" onClick={this.withdraw}>Withdraw Staked LP Tokens</button></div> : <span></span> }</th>
                    </tr>
                  </tbody>
                  </table>
                  : <p></p>
                  }

                  <br /><br />

                  <table className="staking-table">
                  <thead>
                    <tr>
                    <th>
                      <span className="stake-header">24HR RETURN</span><br />
                      <span className="rate-number">{this.state.dailyRoi}%</span>
                    </th>
                    <th>
                      <span className="stake-header">ANNUAL RETURN</span><br />
                      <span className="rate-number">{this.state.yearlyRoi}%</span>
                    </th>
                    </tr>
                  </thead>
                  </table>

                  <br /><br />

                  <table className="staking-table">
                  <thead>
                    <tr>
                    <th>
                      <span className="stake-header">% OF LIQUIDITY STAKED</span><br />
                      <span className="rate-number">{this.state.stakedFraction}%</span>
                    </th>
                    <th>
                      <span className="stake-header">TOTAL STAKING DEPOSITS</span><br />
                      <span className="staking-number">{this.state.totalStaked}</span> { this.state.network===1 && <span>(ETH-DONUT)</span> }{ this.state.network===100 && <span>(DONUT-XDAI)</span> } LP<br />
                      (<span className="staking-number">{this.state.totalDonutStaked}</span> DONUT<br />
                      <span className="staking-number">{this.state.totalXdaiStaked}</span> { this.state.network===1 && <span>ETH</span> }{ this.state.network===100 && <span>XDAI</span> })
                    </th>
                    </tr>
                  </thead>
                  </table>

                  <br /><br />

                  { this.state.isApproved && this.state.stakedByUser > 0 ?
                  <table className="rate-table">
                  <thead>
                    <tr>
                    <span className="stake-your-info-header">YOUR ESTIMATED DONUTS/DAY</span><br />
                    <span className="rate-number">{this.state.estimatedDailyDonuts}</span>
                    </tr>
                  </thead>
                  </table> : <p></p>  
                  }

                  { this.state.isApproved && this.state.stakedByUser > 0 ? <div><br /><br /></div> : <p></p> }

                  { this.state.isApproved && this.state.stakedByUser > 0 ?
                  <table className="rate-table">
                  <thead>
                    <tr>
                    <th className="three-col">
                      <span className="stake-your-info-header">YOUR STAKING DEPOSITS</span><br />
                      <span className="staking-number">{this.state.stakedByUser}</span> { this.state.network===1 && <span>(ETH-DONUT)</span> }{ this.state.network===100 && <span>(DONUT-XDAI)</span> } LP<br />
                      (<span className="staking-number">{this.state.userDonutStaked}</span> DONUT<br />
                      <span className="staking-number">{this.state.userXdaiStaked}</span> { this.state.network===1 && <span>ETH</span> }{ this.state.network===100 && <span>XDAI</span> })
                    </th>
                    <th className="three-col">
                      <span className="stake-your-info-header">YOUR % OWNERSHIP OF LIQUIDITY POOL</span><br />
                      <span className="rate-number">{this.state.heldByUserFraction}%</span>
                    </th>
                    <th className="three-col">
                      <span className="stake-your-info-header">YOUR % OWNERSHIP OF STAKED DONUTS</span><br />
                      <span className="rate-number">{this.state.stakedByUserFraction}%</span>
                    </th>
                    </tr>
                  </thead>
                  </table> : <p></p>
                  }

                  <br />

                  <p><i>* All rates listed above are not fixed and will change in real-time as market conditions change.</i></p>
                </div>;

        return (
            <div className="content">
              <GrowlScene />
              <img src={Title} alt="Staking Donuts" className="logo-image" />                
              
              <br /><br />
              <img src={SteakLogo} alt="Steak Logo" className="logo-image-medium" />

              <p className="left-body">Additional donuts are granted to those that provide donut trading liquidity via Uniswap v2 on the Ethereum main net 
                  or Honeyswap on the XDai sidechain.  Staking rewards are earned in real-time.</p>

              <p className="left-body">To participate in donut liquidity staking, first provide liquidity on the <a target="_blank" rel="noreferrer" 
                  href="https://app.uniswap.org/#/pool/v2">Uniswap v2 ETH-DONUT</a> pair or <a target="_blank" rel="noreferrer" 
                  href="https://app.honeyswap.org/#/pool">Honeyswap DONUT-XDAI</a> pair.  Once you provide liquidity, your account will be credited with 
                  liquidity tokens.  Add those tokens to the staking contract using the interface below and you will immediately start earning donuts!</p>

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

export default Stake;
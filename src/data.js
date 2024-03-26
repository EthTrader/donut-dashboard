import UniswapLogo from './img/donut-uniswap.png';
import SushiswapLogo from './img/donut-sushiswap.png';
import HoneyswapLogo from './img/donut-honeyswap.png';

//import SushiIcon from './img/icons/sushiswap.jsx'

const LegacyIcon = (img_path) => {
  return <img src={img_path} alt="Icon" className="logo-image-large" />
}

export const exchanges = [
  {
    name: 'Uniswap',
    network: 'Ethereum Mainnet',
    link: 'https://app.uniswap.org/#/swap?inputCurrency=ETH&outputCurrency=0xc0f9bd5fa5698b6505f643900ffa515ea5df54a9&chain=mainnet',
    icon: LegacyIcon(UniswapLogo),
  },
  {
    name: 'SushiSwap',
    network: 'Arbitrum One',
    link: 'https://www.sushi.com/swap?chainId=42161&token0=NATIVE&token1=0xF42e2B8bc2aF8B110b65be98dB1321B1ab8D44f5',
    icon: LegacyIcon(SushiswapLogo)
  },
  {
    name: 'Honeyswap',
    network: 'Gnosis',
    link: 'https://app.honeyswap.org/%23/#/swap?inputCurrency=XDAI&outputCurrency=0x524b969793a64a602342d89bc2789d43a016b13a',
    icon: LegacyIcon(HoneyswapLogo)
  }
]

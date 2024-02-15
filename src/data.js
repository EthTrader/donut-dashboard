import UniswapLogo from './img/donut-uniswap.png';
import HoneyswapLogo from './img/donut-honeyswap.png';
import DonutLogo from './img/donut-overview.png';

export const exchanges = [
  {
    name: 'Uniswap',
    network: 'ETH Mainnet',
    link: 'https://app.uniswap.org/#/swap?inputCurrency=ETH&outputCurrency=0xc0f9bd5fa5698b6505f643900ffa515ea5df54a9&chain=mainnet',
    icon: UniswapLogo,
  },
  {
    name: 'Uniswap',
    network: 'ARB One',
    link: 'https://app.uniswap.org/#/swap?inputCurrency=ETH&outputCurrency=0xf42e2b8bc2af8b110b65be98db1321b1ab8d44f5&chain=arbitrum',
    icon: UniswapLogo,
  },
  {
    name: 'SushiSwap',
    network: 'ARB One',
    link: 'https://www.sushi.com/swap?chainId=42161&token0=NATIVE&token1=0xF42e2B8bc2aF8B110b65be98dB1321B1ab8D44f5',
    icon: DonutLogo
  },
  {
    name: 'Honeyswap',
    network: 'Gnosis',
    link: 'https://app.honeyswap.org/%23/#/swap?inputCurrency=XDAI&outputCurrency=0x524b969793a64a602342d89bc2789d43a016b13a',
    icon: HoneyswapLogo
  }
]

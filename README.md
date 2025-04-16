# Donut Dashboard

Information dashboard for /r/ethtrader donuts.

- Displays current price, marketcap, trading volumes, and 24 hr movement
- General donut information
- Frequently asked questions about donuts
- Instructions on how to register for donuts to start earning
- Stats on the most recent donut distribution
- Delicous Donut NFT UI
- Tracking donuts in Metamask
- Staking donut liquidity tokens

To run locally:
- Clone the repo
- `npm i`
- `npm run start`
- Open a browser and navigate to localhost:3000

This project is deployed using Fleek on IPFS.  It will build and deploy automatically upon `git push`

A hidden .env file is needed for email functionality on the Contact page.

# New membership season update process:
1. In Membership.js: Update with new contract address
1. In Membership.js: Update display text to new season
1. In Membership.js: Change NFT image file to new season's PNG
1. In CountdownTimer.js: Calculate end-of-membership time in unix timestamp form and update (value is found in the contract itself)
1. In CountdownTimer.js: Update display text to new season 
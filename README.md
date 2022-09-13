# Donut Dashboard

Information dashboard for /r/ethtrader donuts.

- Displays current price, marketcap, trading volumes, and 24 hr movement
- General donut information
- Frequently asked questions about donuts
- Instructions on how to register for donuts to start earning
- Instructions on how to claim donuts
- "Leaderboards" of past donut distributions
- Tracking donuts in Metamask
- Staking donut liquidity tokens

To run locally:
- `npm run start`
- Open a browser and navigate to localhost:3000

Monthly updates to pull in new distribution data:
1. Pull in the most recent output **distribution** proofs JSON file from the donut.distribution project
1. Replace /distribution/most_recent.json with the new JSON file
1. Update /components/distribution.js to have new month and distribution number

Monthly updates to pull in new governance data:
(NOTE: the users.json file is only available after the distribution is completed)
1. Pull in the most recent output **user** JSON file from the donut.distribution project (note, user output file is generated as part of distribution process)
1. Replace /governance/most_recent.json with the new JSON file
1. Commit changes and push to start a redeploy of the site

This project is deployed using Fleek on IPFS.  It will build and deploy automatically upon `git push`


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

To update the most recent donut distribution:
1. Convert the spreadsheet from /user/CommunityPoints from a CSV to a JSON file
1. Replace /distribution/most_recent.json with the new JSON file
1. `git push` the repo.

This project is deployed using Fleek on IPFS.  It will build and deploy automatically upon `git push`


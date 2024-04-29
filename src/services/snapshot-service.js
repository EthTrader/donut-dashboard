import axios from 'axios';

async function getProposals() {

    try {
        const endpoint = `https://hub.snapshot.org/graphql?query=query Proposals { proposals( first: 3, skip: 0, where: { space_in: ["ethtraderdao.eth"] }, orderBy: "created", orderDirection: desc ) { id title body choices start end state author scores link } }`;
        let response = await axios.get(endpoint);

        let proposals = response.data.data.proposals;

        return proposals;
    } catch (error) {
    console.error(error);
    }
}


export default getProposals;
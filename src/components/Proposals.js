import React from 'react';
import getProposals from '../services/snapshot-service';

class Proposals extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            proposals: []
        }
    }

    async componentDidMount() { 
        
        let proposals = await getProposals();

        // Clean up data for presentation
        proposals.forEach(function(proposal) {
            // Convert unix timestamps to YYYY-MM-DD
            const date = new Date(proposal.start * 1000);
      
            // Get the year, month, and day from the date object
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0'); // Adding 1 because months are zero-indexed
            const day = String(date.getDate()).padStart(2, '0');
        
            // Concatenate the year, month, and day with "-" as the separator
            const formattedDate = `${year}-${month}-${day}`;
            proposal.date = formattedDate;

            // Remove [Governance Poll] from titles  
            proposal.title = proposal.title.replace('[Governance Poll]','');
          });

        this.setState({ 
            proposals: proposals
        });
    }

    render() {
        return (
            <div className="content">
                <h1 className="highlight-large">Recent Governance Proposals</h1>
                <br />
                <div className="card-container">
                    {this.state.proposals.map((proposal) => {
                            return (
                                <a href={proposal.link} target="_blank" rel="noreferrer" className="pinkText"  key={ proposal.id }>
                                    <div className="card">
                                        <div className="title">{ proposal.title }</div> <br />
                                        <span className="status orangeText">{ proposal.state }</span> 
                                        <span className="creation-date orangeText">{ proposal.date }</span> <br />
                                        <div className="description lightPinkText">{ proposal.body }</div>

                                    </div>
                                </a>
                            )
                        })}
                </div>        
            </div>
        );
    }


}

export default Proposals;
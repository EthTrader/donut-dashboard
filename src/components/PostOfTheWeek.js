import React from 'react';
import axios from 'axios';
import Donut1 from '../img/donut-gold.png';
import Donut2 from '../img/donut-silver.png';
import Donut3 from '../img/donut-bronze.png';
import Donut4 from '../img/donut-fourth.png';
import DonutLogo from '../img/donut-logo.png';
import Placeholder from '../img/placeholder.png';

class PostOfTheWeek extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            posts: [],
            colors: ['#361B2E', '#311629', '#2C1124', '#270C1F'],
        }

        this.handleError = this.handleError.bind(this);
    }

    async componentDidMount() { 
        
        let result = await axios.get("https://raw.githubusercontent.com/mattg1981/donut-bot-output/main/posts/potd_current.json");
        let posts = result.data.winners;
        posts.sort((a, b) => a.rank - b.rank);
        
        // Get avatars of winning authors
        for await (const winner of posts) {
            let user = winner.post.author;
            let profileURL = "https://api.reddit.com/user/" + user + "/about";
            let profile = await axios.get(profileURL);
    
            let avatar = profile.data.data.snoovatar_img;
            console.log(avatar);
            if (!avatar) {
                avatar = profile.data.data.subreddit.icon_img;
                let avatarArray = avatar.split("?");
                avatar = avatarArray[0];
            }
            winner.post.avatar = avatar;
        }

        // Get pictures from winning posts
        for await (const winner of posts) {
            let post = winner.post.post_id;
            post = post.replace(/^t3_/, '');

            let postURL = "https://www.reddit.com/r/ethtrader/comments/" + post + ".json";            
            let postDetails = await axios.get(postURL);
    
            let postImage = postDetails.data[0].data.children[0].data.thumbnail;
            winner.post.postImage = postImage;
        }

        this.setState({ 
            posts: posts,
        });        
    }

    async handleError(index) {
        let posts = this.state.posts;
        posts[index].post.postImage = Placeholder;

        this.setState({
          posts: posts
        });
    };

    render() {
        return (
            <div className="content">
                <h1 className="highlight-large">Top Posts of the Week</h1>
                <br />
                    {this.state.posts.map((post, index) => {
                        return (
                            <a href={post.post.url} target="_blank" rel="noreferrer" className="post" key={ post.rank } style={{ backgroundColor: this.state.colors[index % this.state.colors.length] }}>
                                <div className="post-img">
                                    { post.rank === 1 && <img src={Donut1} className="spin" alt="Golden Donut"></img> }
                                    { post.rank === 2 && <img src={Donut2} className="spin" alt="Silver Donut"></img> }
                                    { post.rank === 3 && <img src={Donut3} className="spin" alt="Bronze Donut"></img> }
                                    { post.rank === 4 && <img src={Donut4} className="spin" alt="Fourth Donut"></img> }
                                </div>
                                <div className="post-rank">
                                        <span className={ post.rank === 1 ? "post-rank-text post-rank-1" :
                                                 post.rank === 2 ? "post-rank-text post-rank-2" :
                                                 post.rank === 3 ? "post-rank-text post-rank-3" :
                                                 post.rank === 4 ? "post-rank-text post-rank-4" : "post-rank"
                                                }>            
                                                #{ post.rank }
                                        </span>
                                </div> <br />
                                <div className="post-right">
                                    <div className="post-title">{ post.post.title }</div>
                                    <div className="post-right-content">
                                        <div className="post-avatar">
                                            <img src={post.post.avatar} alt="Avatar" className="post-actual-image"></img>
                                        </div>                                    
                                        <div className="post-text">
                                            <div className="author pinkText">{ post.post.author }</div>
                                            <div className="darkPinkText">{ post.post.created_date }</div>
                                            <div className="lightPinkText">{ post.nominations } Nominations</div>
                                            <div>{ post.post.reddit_upvotes } Reddit Upvotes</div>
                                            <div>{ post.post.tips } Tips Received ({ Math.ceil(post.post.tips_amount) } <img className="small-donut" src={DonutLogo} alt="Donut Logo"></img>)</div>
                                        </div>
                                        <div className="post-image">
                                            <img src={post.post.postImage} alt="Post" className="post-actual-image"
                                                onError={() => this.handleError(index) }></img>
                                        </div>    
                                    </div>
                                </div>
                            </a>
                        )
                    })}
            </div>        
        );
    }


}

export default PostOfTheWeek;
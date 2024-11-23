import React from 'react';
import emailjs from 'emailjs-com';

class Contact extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            contactPublicKey: process.env.REACT_APP_CONTACT_PUBLIC_KEY,
            contactServiceID: process.env.REACT_APP_CONTACT_SERVICE_ID,
            contactTemplateID: process.env.REACT_APP_CONTACT_TEMPLATE_ID,
            email: '',
            message: ''
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async componentDidMount() { 
        
    }

    async handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    };

    async handleSubmit(e) {
        e.preventDefault(); // Prevents default refresh by the browser

        emailjs.init({
            publicKey: this.state.contactPublicKey,
            blockHeadless: true,
            blockList: {
              // Block the suspended emails
              list: ['foo@emailjs.com', 'bar@emailjs.com'],
              // The variable contains the email address
              watchVariable: 'userEmail',
            },
            limitRate: {
              // Set the limit rate for the application
              id: 'app',
              // Allow 1 request per 10s
              throttle: 10000,
            },
          });        

        const { email, message } = this.state;

        emailjs.send(
            this.state.contactServiceID,     
            this.state.contactTemplateID,    
            { email, message },              
            this.state.contactPublicKey
          )
          .then((response) => {
            console.log('Contact Us Form Success: ', response.status, response.text);
            alert('Email sent successfully!');
          })
          .catch((error) => {
            console.log('Contact Us Form Failure: ', error);
            alert('Failed to send email. Please try again.');
          });
      };

    render() {
        return (
            <div className="content">
                <p className="left-body">Send a message to the /r/ethtrader moderator team using the below form:</p>
                <br />                                
                
                <form className="contact-form-text" onSubmit={this.handleSubmit}>
                    <label>
                        <p>Your Email:</p>
                        <input className="contact-form-input" type="email" name="email" value={this.state.email} onChange={this.handleChange} required />
                    </label>
                    <br /><br />
                    <label>
                        <p>Message:</p>
                        <textarea className="contact-form-msg-input" name="message" value={this.state.message} onChange={this.handleChange} required />
                    </label>
                    <br />
                    <button className="btn-active" type="submit">Send</button>
                </form>
            </div>
        );
    }

}

export default Contact;
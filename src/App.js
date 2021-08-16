import DonutLogo from './img/donut-logo.png';
import EthtraderDonutsLogo from './img/ethtraderdonuts.png';
import Ticker from './components/Ticker'
import { HashRouter, Switch, Route } from 'react-router-dom';
import Links from './components/Links'
import TopNav from './components/TopNav'
import Donuts from './components/Donuts';
import Register from './components/Register';
import Faq from './components/Faq';
import Distribution from './components/Distribution'
import Claim from './components/Claim'
import Footer from './components/Footer'
import Stake from './components/Stake'
import Track from './components/Track'
import './App.css';

function App() {
  return (
    <div className="App">
      <HashRouter>
        <TopNav></TopNav>
        <header className="header-style">
          <Ticker></Ticker>
          <div className="inline-block">
            <img src={DonutLogo} className="App-logo" alt="logo" />   
          </div>        
          <div className="inline-block">
            <img src={EthtraderDonutsLogo} className="donut-dashboard-logo" alt="Donuts Logo" />        
          </div>
        </header>

        <div className="body-style">
          <div className="container">
            <Switch>
              <Route exact path="/"><Donuts></Donuts></Route>
              <Route path="/faq"><Faq></Faq></Route>
              <Route path="/register"><Register></Register></Route>
              <Route path="/claim"><Claim></Claim></Route>
              <Route path="/distribution"><Distribution></Distribution></Route>
              <Route path="/track"><Track></Track></Route>
              <Route path="/stake"><Stake></Stake></Route>
            </Switch>
          </div>
          <div className="links-container">
            <Links></Links>
          </div>
          <Footer></Footer>
        </div>
      </HashRouter>
    </div>
  );
}

export default App;

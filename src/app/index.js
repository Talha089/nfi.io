import EventBus from "eventing-bus";
import { connect } from 'react-redux';
import React, { Component } from 'react';
import Error from '@material-ui/icons/Error';
import { createBrowserHistory } from "history";
import { ToastContainer, toast } from 'react-toastify';
import CheckCircle from '@material-ui/icons/CheckCircle';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import { web3 } from "../store/web3";

import './index.css';
import '../static/css/style.css';

import 'jquery/dist/jquery.min.js';
import 'bootstrap/dist/js/bootstrap.min.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import "react-toastify/dist/ReactToastify.css";

const hist = createBrowserHistory();
class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      address: '',
    };
  };

  componentDidMount() {
    this.checkEthereum();
    EventBus.on('info', (e) => toast.info(() => <div> <Error /> {e}</div>));
    EventBus.on('error', (e) => toast.error(() => <div> <Error /> {e}</div>));
    EventBus.on('success', (e) => toast.success(() => <div> <CheckCircle /> {e}</div>));
  };

  checkEthereum = async () => {
    if (typeof window.ethereum !== "undefined") {

      window.ethereum.on("accountsChanged", accounts => {
        console.log("********accounts::", accounts);
        this.setState({ address: '' });
        EventBus.publish("info", "Account has been changed");
      });

      window.ethereum.on("networkChanged", netId => {
        console.log("********netId::", netId);
        this.setState({ address: '' });
        EventBus.publish("info", "Network has been changed");
      });
    }
  };

  connectWallet = async () => {
    if (typeof window.ethereum === 'undefined') {
      EventBus.publish('error', `Please Install Metamask!!!`);
      return;
    }
    let address = (await web3.currentProvider.enable())[0];
    this.setState({ address });
  };

  copiedAddress = () => EventBus.publish('info', `Address Copied!!!`);

  render() {

    let { address } = this.state;

    return (
      <>
        <ToastContainer closeOnClick position="bottom-left" />
        <div className="connect-btn">
          {address == '' || address == null || address == undefined
            ? <button className="metamask-btn" onClick={this.connectWallet}>
              CONNECT METAMASK
            </button>
            : <CopyToClipboard text={address}>
              <button className="metamask-btn" onClick={this.copiedAddress}>
                {address && address.substring(0, 7) + '.....' + address.substring(35, address.length)}
              </button>
            </CopyToClipboard>
          }
        </div>

      </>
    );
  }
}

const mapDispatchToProps = {
};

const mapStateToProps = ({ Auth }) => {
  let { } = Auth;
  return {}
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
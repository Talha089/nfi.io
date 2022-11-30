
/* -- set app title --*/
const AppTitle = 'FRONTEND CONNECT METAMASK';

/* -- set app mode -- */
const AppMode = ['production'];

let networkId = '', message = '', explorer = '', ApiUrl = '';

switch (AppMode[0]) {
  case 'development':
    networkId = 4;
    explorer = 'https://rinkeby.etherscan.io';
    message = 'Please switch your network to Rinkeby testnet';
    break;
  case 'production':
    networkId = 1;
    explorer = 'https://etherscan.io';
    message = 'Please switch your network to Ethereum Mainnet';
    break;
  case 'testing':
    networkId = 4;
    explorer = 'https://rinkeby.etherscan.io';
    message = 'Please switch your network to Rinkeby testnet';
    break;
  default:
    networkId = 4;
    explorer = 'https://rinkeby.etherscan.io';
    message = 'Please switch your network to Rinkeby testnet';
}

export { AppTitle, networkId, message, explorer, ApiUrl};
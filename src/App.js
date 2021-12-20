import './App.css';
import { useState } from 'react';
import { ethers } from 'ethers'
import SurfToken from './artifacts/contracts/SurfToken.sol/SurfToken.json'

const tokenAddress = "0x163cb0822162a3E89D2CfB006F732f8Ac155691C"

function App() {
  const [userAccount, setUserAccount] = useState()
  const [amount, setAmount] = useState()

  async function requestAccount() {
    await window.ethereum.request({ method: 'eth_requestAccounts' });
  }

  async function getBalance() {
    if (typeof window.ethereum !== 'undefined') {
      const [account] = await window.ethereum.request({ method: 'eth_requestAccounts' })
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(tokenAddress, SurfToken.abi, provider)
      const balance = await contract.balanceNow(account);
      console.log("Balance: ", balance.toString());
    }
  }

  async function mintCoins() {
    if (typeof window.ethereum !== 'undefined') {
      await requestAccount()
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(tokenAddress, SurfToken.abi, signer);
      const transaction = await contract.mint(userAccount, amount, {gasLimit: 300000});
      await transaction.wait();
      console.log(`${amount} Coins successfully sent to ${userAccount}`);
    }
  }

  async function sendCoins() {
    if (typeof window.ethereum !== 'undefined') {
      await requestAccount()
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(tokenAddress, SurfToken.abi, signer);
      const transaction = await contract.transferNow(userAccount, amount);
      await transaction.wait();
      console.log(`${amount} Coins successfully sent to ${userAccount}`);
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <button onClick={getBalance}>Get Balance</button>
        <button onClick={mintCoins}>Mint Coins</button>
        <input onChange={e => setUserAccount(e.target.value)} placeholder="Account ID" />
        <input onChange={e => setAmount(e.target.value)} placeholder="Amount" />
      </header>
    </div>
  );
}

export default App;
'use client'

import Link from 'next/link';
import { usePathname } from 'next/navigation'
import { useEffect, useContext, useState } from 'react';
import { DataContext } from '@/app/context/DataProvider';

import { toast } from 'react-toastify';
import { ethers } from 'ethers';

export default function Navbar() {

  const { address, setAddress, isConnected, setIsConnected, provider, setProvider } = useContext(DataContext);

  const [scrollPosition, setScrollPosition] = useState(0);
  const [visible, setVisible] = useState(false);

  const handleScroll = () => {
    const position = window.pageYOffset;
    setScrollPosition(position);
    setVisible((position > scrollPosition));
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrollPosition]);


  const pathname = usePathname();

  const formatAddress = (address) => {
    return address.slice(0, 4) + '...' + address.slice(-4);
  }

  const connectWallet = () => {
    ethereum.request({ method: 'eth_requestAccounts' })
    .then(handleAccountsChanged)
    .catch((err) => {
      if (err.code === 4001) {
        // EIP-1193 userRejectedRequest error
        console.log('Please connect to MetaMask.');
        toast.error('Please connect to Metamask', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          });
      } else {
        console.error(err);
      }
    });
  }

  const handleAccountsChanged = (accounts) => {
    if (accounts.length === 0) {
      // MetaMask is locked or the user has not connected any accounts
      console.log('Please connect to MetaMask.');
    } else if (accounts[0] !== address) {
      setAddress(accounts[0]);
      setIsConnected(true);
      setProvider(new ethers.providers.Web3Provider(window.ethereum));
    }
  }

  const disconnectWallet = () => {
    setAddress('');
    setIsConnected(false);
  }

  useEffect(() => {
    if (window.ethereum) {
      connectWallet();
    }
  }, []);

  return (
    <div className={`navbar ${visible ? 'bg-base-100 bg-opacity-60' : ''} transition duration-500 ease-in-out sticky top-0 z-50`}>
      <div className="navbar-start">
        <ul className="menu menu-horizontal px-1">
          {isConnected &&
          <li><Link href="/tickets"><span className={pathname === '/tickets' ? 'font-extrabold' : ''}>My Tickets</span></Link></li>
          }
          <li><Link href="/events"><span className={pathname === '/events' ? 'font-extrabold' : ''}>Events</span></Link></li>
          <li className='pointer-events-none'><Link href="/marketplace"><span className='text-gray-500'>Marketplace</span></Link><div className="badge badge-xs">Coming Soon</div></li>
        </ul>
      </div>
      <div className="navbar-center">
        <Link href="/" className="btn btn-ghost normal-case text-2xl">Fantickets</Link>
      </div>
      <div className="navbar-end">
        {isConnected ? (
        <div className="dropdown dropdown-end">
          <button tabIndex={0} className="btn btn-outline"> {formatAddress(address)} </button>
          <ul tabIndex={0} className="p-2 shadow menu dropdown-content bg-base-100 rounded-box w-52">
            <li><a onClick={disconnectWallet}>Disconnect</a></li>
          </ul>
        </div>
        ) : (
        <a className="btn btn-outline" onClick={connectWallet}>
          Connect Wallet
        </a>
        )}
      </div>
    </div>
  )
}
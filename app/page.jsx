'use client'

import Image from 'next/image'
import { DM_Sans } from 'next/font/google'
import styles from './page.module.css'
import { useState, useEffect } from 'react'

import Navbar from './components/Navbar'
import Link from 'next/link'

const dm_sans = DM_Sans({ weight: '400', subsets: ['latin'] })

export default function Home() {

  const [textArray, setTextArray] = useState(['Concerts', 'Museums', 'Exhibitions', 'Festivals', 'Events'])

  const [text, setText] = useState('Concerts')
  const [index, setIndex] = useState(1)

  const changeText = () => {
    if (index < textArray.length) {
      setText(textArray[index])
      setIndex(index + 1)
    }
  }

  useEffect(() => {
    const interval = setInterval(() => {
      changeText()
    }, 1200)
    return () => clearInterval(interval)
  }, [index])

  return (
    <main className="mesh" style={{ fontFamily: dm_sans }}>
      <Navbar />
      <div className="hero h-screen pb-20">
        <div className="hero-content text-center">
          <div className="max-w-5xl">
            <h1 className="text-8xl font-bold text-white">The Decentralized <span className="text-accent">{text}</span> Platform</h1>
            <Link className="btn btn-lg btn-secondary mt-10" href="/events">Explore Events</Link>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center h-1/3">
        <h1 className="text-6xl font-bold my-8">Why choose <span className="text-secondary">Fantickets</span>?</h1>
        <div className="flex flex-col w-3/4 lg:flex-row">
          <div className="flex flex-col w-full lg:w-1/3">
            <div className="flex flex-col items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 text-secondary" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M10 2a8 8 0 100 16 8 8 0 000-16zm0 14a6 6 0 110-12 6 6 0 010 12z" clipRule="evenodd" />
              </svg>
              <h1 className="text-4xl font-bold text-center">Fast</h1>
            </div>
          </div>
          <div className="flex flex-col w-full lg:w-1/3">
            <div className="flex flex-col items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 text-secondary" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M10 2a8 8 0 100 16 8 8 0 000-16zm0 14a6 6 0 110-12 6 6 0 010 12z" clipRule="evenodd" />
              </svg>
              <h1 className="text-4xl font-bold text-center">Secure</h1>
            </div>
          </div>
          <div className="flex flex-col w-full lg:w-1/3">
            <div className="flex flex-col items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 text-secondary" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M10 2a8 8 0 100 16 8 8 0 000-16zm0 14a6 6 0 110-12 6 6 0 010 12z" clipRule="evenodd" />
              </svg>
              <h1 className="text-4xl font-bold text-center">Reliable</h1>
            </div>
          </div>
          <div className="flex flex-col w-full lg:w-1/3">
            <div className="flex flex-col items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 text-secondary" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M10 2a8 8 0 100 16 8 8 0 000-16zm0 14a6 6 0 110-12 6 6 0 010 12z" clipRule="evenodd" />
              </svg>
              <h1 className="text-4xl font-bold text-center">Easy to use</h1>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

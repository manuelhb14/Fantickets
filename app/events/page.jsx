'use client'
import Navbar from '../components/Navbar'
import { useState, useContext, useEffect } from 'react'
import Link from 'next/link';
import Carousel from '../components/Carousel';
import { ethers } from 'ethers'

import { DataContext } from '../context/DataProvider'
import factoryAbi from '../constants/abis/factory';

export default function Events() {

  const { address, isConnected, provider } = useContext(DataContext)

  const [events, setEvents] = useState([])
  const [event, setEvent] = useState({})
  const [title, setTitle] = useState('')
  const [location, setLocation] = useState('')
  const [description, setDescription] = useState('')
  const [image, setImage] = useState('')
  const [date, setDate] = useState('')
  const [prices, setPrices] = useState([{ ticket: '', price: '' }])

  useEffect(() => {
    fetch('/api/events').then(res => res.json()).then(data => {
      setEvents(data)
    })
  }, [])

  const getSymbol = (string) => {
    const matches = string.match(/\b(\w)/g)
    return matches.join('')
  }

  const createEvent = async (e) => {
    e.preventDefault()
    const signer = provider.getSigner()
    const factory = new ethers.Contract('0x1c1a7c4332cA88F6e52ac63D058A67443E187F8e', factoryAbi, signer)
    const tx = await factory.genesis(address, title.trim(), getSymbol(title))
    await tx.wait()
    console.log(tx)
    const receipt = await provider.getTransactionReceipt(tx.hash)
    console.log(receipt)
    const eventAddress = receipt.logs[0].address
    console.log(eventAddress)
    fetch('/api/event', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        address: eventAddress,
        title,
        location,
        description,
        image,
        date
      })
    })
  }

  const addTicket = () => {
    setPrices([...prices, { ticket: '', price: '' }])
  }

  const removeTicket = (e, index) => {
    e.preventDefault()
    const newPrices = [...prices]
    newPrices.splice(index, 1)
    setPrices(newPrices)
  }

  return (
    <main className="h-screen">
      <Navbar />
      {events.length === 0 ? <div className="flex justify-center items-center h-full">Loading...</div> : <Carousel images={events} />}
      <input type="checkbox" id="my-modal-3" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box w-11/12 max-w-5xl">
          <label htmlFor="my-modal-3" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
          <h3 className="text-lg font-bold">Create new event</h3>
          <form className="flex flex-col gap-2">
            <input type="text" placeholder="Title" className="input input-bordered" required onChange={e => setTitle(e.target.value)} value={title} />
            <input type="location" placeholder="Location" className="input input-bordered" required onChange={e => setLocation(e.target.value)} value={location} />
            <input type="text" placeholder="Description" className="input input-bordered" required onChange={e => setDescription(e.target.value)} value={description} />
            <input type="url" placeholder="Image" className="input input-bordered" required  onChange={e => setImage(e.target.value)} value={image} />
            <input type="date" placeholder="Date" className="input input-bordered" required onChange={e => setDate(e.target.value)} value={date} />
            {/* create new fields for different tickets and prices */}
            {prices.map((price, index) => {
              return (
                <div className="flex flex-row gap-2 items-center">
                  <input type="text" placeholder="Ticket" className="input input-bordered" required />
                  <input type="text" placeholder="Price" className="input input-bordered" required />
                  <button className="btn btn-primary" onClick={addTicket}>Add</button>
                  <button className="btn btn-primary" onClick={(e) => removeTicket(e, index)} disabled={prices.length === 1}>Remove</button>
                </div>
              )
            })}
            <button className="btn btn-primary" onClick={(e) => createEvent(e)}>Create</button>
          </form>
        </div>
      </div>
      <label htmlFor="my-modal-3" className="btn">Create new event</label>

    </main>
  )
}
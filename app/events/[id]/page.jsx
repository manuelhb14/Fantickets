'use client'
import Navbar from "@/app/components/Navbar"
import { useSearchParams } from "next/navigation"
import { useContext, useEffect, useState } from "react"
import { ethers } from "ethers"

import { DataContext } from "@/app/context/DataProvider"

import erc721Abi from "@/app/constants/abis/erc721"

export default function Event() {

  const { address, isConnected, provider } = useContext(DataContext)

  const [event, setEvent] = useState({})

  const searchParams = useSearchParams()

  const id = searchParams.get("id")
  const title = searchParams.get("title")
  const location = searchParams.get("location")
  const description = searchParams.get("description")
  const image = searchParams.get("image")
  const date = searchParams.get("date")

  const formatDate = (date) => {
    // format date to Month Day, Year
    const newDate = new Date(date)
    const month = newDate.toLocaleString('default', { month: 'long' })
    const day = newDate.getDate()
    const year = newDate.getFullYear()
    return `${month} ${day}, ${year}`
  }

  useEffect(() => {
    fetch(`/api/event?id=${id}`).then(res => res.json()).then(data => {
      console.log(data)
      setEvent(data)
    })
  }, [])

  const sendTransaction = async (ticket) => {
    const signer = provider.getSigner()
    const contract = new ethers.Contract(event?.address, erc721Abi, signer)
    const tx = await contract.safeMint(address, { value: ethers.utils.parseEther(ticket.price) })
    await tx.wait()
    console.log(tx)
    fetch(`/api/tickets`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        address: event?.address,
        event: event?.id,
        ticket: ticket.ticket,
        price: ticket.price,
        owner: address
      })
    })
  }

  useEffect(() => {
    console.log(event)
  }, [event])

  return (
    <div>
      <Navbar />
      <div className="flex flex-col m-20 lg:flex-row">
        <div className="flex flex-col w-1/3 mr-3.5">
          <img className="rounded-box w-full h-full object-cover" src={image} alt="Event Image" />
        </div>
        <div className="flex flex-col w-2/3 px-8">
          <h1 className="text-4xl font-bold text-center mb-2">{title}</h1>
          <h1 className="text-xl mb-6">{description}</h1>
          <h2 className="text-l mb-1">Date: {formatDate(date)}</h2>
          <h2 className="text-l mb-1">Location: {location}</h2>
          <div className="flex flex-col w-full lg:flex-row mt-10">
            {event?.price?.map((ticket, index) => {
              return (
                <>
                  <div className="grid flex-grow h-full card bg-base-300 rounded-box place-items-center p-8 hover:shadow-lg hover:scale-105 transition-all duration-200">
                    <h1 className="text-xl font-bold text-center">{ticket.ticket}</h1>
                    <h2 className="text-l font-bold text-center">Price: {ticket.price} FTM </h2>
                    <button className="btn btn-secondary btn-lg mt-4" onClick={() => {sendTransaction(ticket)}}>Buy ticket</button>
                  </div>
                  {index !== event?.price?.length - 1 && <div className="divider lg:divider-horizontal"></div>}
                </>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

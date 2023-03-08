'use client'

import { useEffect, useState, useContext } from "react";
import Navbar from "../components/Navbar";

import { DataContext } from "../context/DataProvider";

export default function Tickets() {

  const { address, isConnected, provider } = useContext(DataContext)

  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    if (address) {
      fetch("/api/tickets?owner=" + address).then(res => res.json()).then(data => {
        console.log(data)
        // sort tickets by date
        data.sort((a, b) => {
          return new Date(a.date) - new Date(b.date)
        }
        )
        setTickets(data)
      })
    }
  }, [address])

  const formatDate = (date) => {
    // format date to Month Day, Year
    const newDate = new Date(date)
    const month = newDate.toLocaleString('default', { month: 'long' })
    const day = newDate.getDate()
    const year = newDate.getFullYear()
    return `${month} ${day}, ${year}`
  }

  return (
    <main>
      <Navbar />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 content-start justify-center">
      {tickets.length === 0 ? <h1 className="text-4xl font-bold text-center mt-10">No tickets available</h1> : (
        <>
          {tickets?.map((ticket, index) => {
            return (
              <div className="card w-96 bg-base-100 shadow-xl">
                <figure><img src={ticket.image} alt="Event image" /></figure>
                <div className="card-body">
                  <h2 className="card-title">
                    {ticket.title}
                    <div className="badge badge-secondary text-xs">{ticket.ticket}</div>
                  </h2>
                  <p>{formatDate(ticket.date)}</p>
                  <p>{ticket.location}</p>
                  {/* <div className="card-actions justify-end">
                    <div className="badge badge-outline">Fashion</div>
                    <div className="badge badge-outline">Products</div>
                  </div> */}
                </div>
              </div>
            )
          })}
        </>
      )}
      </div>
    </main>
  );
}
const events = [
  {
    id: 1,
    address: '0x8D27e622Ca804FDc435FA9B2d0E7ed6398857133',
    title: 'David Guetta at Ushuaïa',
    location: 'Ibiza, Spain',
    image: '/images/1.jpg',
    date: '2023-03-10T23:59:59',
    price: [
      {
        ticket: "General",
        price: "0.01"
      },
      {
        ticket: "VIP",
        price: "0.05"
      }
    ],
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel aliquam aliquam, nunc nisl aliquet nisl, eget aliquam nisl nisl et nisl. Sed euismod, nisl vel aliquam aliquam, nunc nisl aliquet nisl, eget aliquam nisl nisl et nisl.'
  },
  {
    id: 2,
    address: '0x8D27e622Ca804FDc435FA9B2d0E7ed6398857133',
    title: 'Rosalía at Estadio Azteca',
    location: 'Mexico City, Mexico',
    image: '/images/rosalia.jpg',
    date: '2023-03-28T23:59:59',
    price: [
      {
        ticket: "General",
        price: "0.01"
      },
      {
        ticket: "VIP",
        price: "0.03"
      },
      {
        ticket: "VIP + Meet & Greet",
        price: "0.1"
      }
    ],
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel aliquam aliquam, nunc nisl aliquet nisl, eget aliquam nisl nisl et nisl. Sed euismod, nisl vel aliquam aliquam, nunc nisl aliquet nisl, eget aliquam nisl nisl et nisl.'
  }
]

const tickets = [
  {
    id: 1,
    eventId: 1,
    ticket: "General",
    price: "0.01",
    owner: "0xbC91222C7DB724F9aA99eFf7b493Ec37FF241341",
    txHash: "0x81972c0230e2291973c183a924a0e985cb8f6e1481832e4be20edac5ada8f710",
    image: '/images/1.jpg',
    title: 'David Guetta at Ushuaïa',
    location: 'Ibiza, Spain',
    date: '2023-03-10T23:59:59'
  },
  {
    id: 2,
    eventId: 1,
    ticket: "VIP",
    price: "0.05",
    owner: "0xbC91222C7DB724F9aA99eFf7b493Ec37FF241341",
    txHash: "0x81972c0230e2291973c183a924a0e985cb8f6e1481832e4be20edac5ada8f710",
    image: '/images/1.jpg',
    title: 'David Guetta at Ushuaïa',
    location: 'Ibiza, Spain',
    date: '2023-03-10T23:59:59'
  },
  {
    id: 3,
    eventId: 2,
    ticket: "General",
    price: "0.01",
    owner: "0xbC91222C7DB724F9aA99eFf7b493Ec37FF241341",
    txHash: "0x81972c0230e2291973c183a924a0e985cb8f6e1481832e4be20edac5ada8f710",
    image: '/images/rosalia.jpg',
    title: 'Rosalía at Estadio Azteca',
    location: 'Mexico City, Mexico',
    date: '2023-03-28T23:59:59'
  },
  {
    id: 4,
    eventId: 2,
    ticket: "VIP",
    price: "0.03",
    owner: "0xbC91222C7DB724F9aA99eFf7b493Ec37FF241341",
    txHash: "0x81972c0230e2291973c183a924a0e985cb8f6e1481832e4be20edac5ada8f710",
    image: '/images/rosalia.jpg',
    title: 'Rosalía at Estadio Azteca',
    location: 'Mexico City, Mexico',
    date: '2023-03-28T23:59:59'
  },
  {
    id: 5,
    eventId: 2,
    ticket: "VIP + Meet & Greet",
    price: "0.1",
    owner: "0xbC91222C7DB724F9aA99eFf7b493Ec37FF241341",
    txHash: "0x81972c0230e2291973c183a924a0e985cb8f6e1481832e4be20edac5ada8f710",
    image: '/images/rosalia.jpg',
    title: 'Rosalía at Estadio Azteca',
    location: 'Mexico City, Mexico',
    date: '2023-03-28T23:59:59'
  }
]

export default async function handler(req, res) {

  const { method } = req

  switch (method) {

    case 'GET':

      const { owner } = req.query
    
      if (owner) {
        const ticketsByOwner = tickets.filter(ticket => ticket.owner.toLowerCase() === owner.toLowerCase())
        res.status(200).json(ticketsByOwner)
      } else {
        res.status(400).json({ message: 'Bad request' })
      }

      break

    case 'POST':
      
      const { address, event, ticket, price, txHash } = req.body

      if (event && ticket && price && owner) {
        const newTicket = {
          id: tickets.length + 1,
          event,
          ticket,
          price,
          owner: address,
          txHash
        }
        tickets.push(newTicket)
        res.status(201).json(newTicket)
      } else {
        res.status(400).json({ message: 'Bad request' })
      }

    default:
      res.setHeader('Allow', ['GET', 'POST'])
      res.status(405).end(`Method ${method} Not Allowed`)

  }
}
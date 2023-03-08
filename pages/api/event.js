const events = [
  {
    id: 1,
    address: '0xcfaba15A59Da14be493648067B008f6F3bbaddae',
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

export default async function handler(req, res) {

  const { method } = req

  switch (method) {

    case 'GET':

      const { id } = req.query
      // const { db } = request.locals
      // const event = await db.collection('events').findOne({ _id: ObjectId(id) })
      const event = events.find(event => event.id === parseInt(id))

      res.status(200).json(event)

      break

    case 'POST':
      const { address, title, location, image, date, price, description } = req.body
      const newEvent = {
        id: events.length + 1,
        address,
        title,
        location,
        image,
        date,
        price,
        description
      }
      events.push(newEvent)
      res.status(201).json(newEvent)
      break

    default:
      res.setHeader('Allow', ['GET', 'POST'])
      res.status(405).end(`Method ${method} Not Allowed`)

  }
}
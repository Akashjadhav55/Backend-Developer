let express = require("express");
const { sequelize } = require("./lib");
const { tickets } = require("./model/ticket.model");
const customers = require("./model/customer.model");
const agents = require("./model/agent.model");
const { ticketCustomer } = require("./model/ticketCustomer.model");
const { ticketAgent } = require("./model/ticketAgent.model");
const { Op, where } = require("sequelize");

let app = express();
app.use(express.json());

app.get("/seed_db", async (req, res) => {
  try {
    await sequelize.sync({ force: true });

    let customer = await customers.bulkCreate([
      { customerId: 1, name: "Alice", email: "alice@example.com" },
      { customerId: 2, name: "Bob", email: "bob@example.com" },
    ]);

    let agent = await agents.bulkCreate([
      { agentId: 1, name: "Charlie", email: "charlie@example.com" },
      { agentId: 2, name: "Dave", email: "dave@example.com" },
    ]);

    let ticket = await tickets.bulkCreate([
      {
        ticketId: 1,
        title: "Login Issue",
        description: "Cannot login to account",
        status: "open",
        priority: 1,
        customerId: customer[0].id,
        agentId: agent[0].id,
      },
      {
        ticketId: 2,
        title: "Payment Failure",
        description: "Payment not processed",
        status: "closed",
        priority: 2,
        customerId: customer[1].id,
        agentId: agent[1].id,
      },
      {
        ticketId: 3,
        title: "Bug Report",
        description: "Found a bug in the system",
        status: "open",
        priority: 3,
        customerId: customer[0].id,
        agentId: agent[0].id,
      },
    ]);

    await ticketCustomer.bulkCreate([
      { ticketId: ticket[0].id, customerId: customer[0].id },
      { ticketId: ticket[2].id, customerId: customer[0].id },
      { ticketId: ticket[1].id, customerId: customer[1].id },
    ]);

    await ticketAgent.bulkCreate([
      { ticketId: ticket[0].id, agentId: agent[0].id },
      { ticketId: ticket[2].id, agentId: agent[0].id },
      { ticketId: ticket[1].id, agentId: agent[1].id },
    ]);

    return res.json({ message: "Database seeded successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: err.message });
  }
});

app.get("/a", async (req ,res) => {
  let resa = await ticketCustomer.findAll()
  res.json(resa)
})

// Exercise 1: Get All Tickets
// http://localhost:3000/tickets
let getTicketAgents = async (ticketId) =>{
  let res = await ticketAgent.findAll({
    where : { ticketId }
  })
  let agentArray = []
  for (let cus of res) {
      agentArray.push(cus.agentId)
  }
  let agntData = await agents.findOne({
    where : { id : { [Op.in] : agentArray }  }
  })

  return agntData
}
let getTicketCustomers = async (ticketId) =>{
  let res = await ticketCustomer.findAll({
    where : { ticketId }
  })
  let customerArray = []
  for (let cus of res) {
    customerArray.push(cus.customerId)
  }
  let cusData = await customers.findOne({
    where : { id : { [Op.in] : customerArray }  }
  })
  return cusData
}
async function getTicketDetails(ticketData) {
  if (!ticketData) {
    return { message: 'Ticket not found' };
  }
  const customer = await getTicketCustomers(ticketData.id);
  const agent = await getTicketAgents(ticketData.id);

  return {
    ...ticketData.dataValues,
    customer,
    agent,
  };
}

app.get("/tickets",async (req ,res) => {
  try {
    let response = await tickets.findAll()
    let detailedTickets = [];
    for(let i=0; i < response.length; i++){
      let detailTkt = await getTicketDetails(response[i])
      detailedTickets.push(detailTkt)
    }
    res.status(200).json(detailedTickets)
  }catch (error) {
    return res.status(500).json({ message : error.message })
  }
})


// Exercise 2: Get Ticket by ID
// http://localhost:3000/tickets/details/1
app.get("/tickets/details/:id", async (req ,res) => {
  try {
    let id = parseInt(req.params.id)

    let ticketData = await tickets.findOne({ where : { id } })
    let response = await getTicketDetails(ticketData)

    res.status(200).json(response)
  } catch (error){
    return res.status(500).json({ message : error.message })
  }
})

// Exercise 3: Get Tickets by Status
// http://localhost:3000/tickets/status/closed
app.get("/tickets/status/:status", async (req ,res) => {
  try {
    let status = req.params.status
    let ticketData = await tickets.findAll({ where : { status } })
    let statusArray = [];
    for(let i = 0; i < ticketData.length; i++){
      let response = await getTicketDetails(ticketData[i])
      statusArray.push(response)
    }

    res.status(200).json(statusArray)
  } catch (error) {
    return res.status(500).json({ message : error.message })
  }
})

// Exercise 4: Get Tickets Sorted by Priority
// http://localhost:3000/tickets/sort-by-priority
app.get("/tickets/sort-by-priority", async (req ,res) => {
  try {
    let ticketData = await tickets.findAll({ order : [ ["priority", "ASC"] ] })
    let SortedArray = [];
    for(let i = 0; i < ticketData.length; i++){
      let response = await getTicketDetails(ticketData[i])
      SortedArray.push(response)
    }

    res.status(200).json(SortedArray)
  } catch (error) {
    return res.status(500).json({ message : error.message })
  }
})

// Exercise 5: Add a New Ticket
// http://localhost:3000/tickets/new
let newTicket = async (newTkt) => {
  let res = await tickets.create(newTkt)
  return { ticket : res }
}
app.post("/tickets/new", async (req ,res) => {
  try {
    let newTkt = req.body
    let response = await newTicket(newTkt)
    res.status(200).json(response)
  } catch (error){
    return res.status(500).json({ message : error.message })
  }
})

// Exercise 6: Update Ticket Details
// http://localhost:3000/tickets/update/1
let updateTicket = async (id, newTicketData) => {

  let ticket2 = await tickets.findOne({ where : { id } })
  if (!ticket2) {
    return res.status(404).json({ message: 'Ticket not found' });
  }
  
  console.log(ticket2.status,newTicketData.status)
  if (newTicketData.title) ticket2.set('title', newTicketData.title);
  if (newTicketData.description) ticket2.set('description', newTicketData.description);
  if (newTicketData.status) ticket2.set('status', newTicketData.status);
  if (newTicketData.priority) ticket2.set('priority', newTicketData.priority);

  console.log(ticket2.status)
  if (newTicketData.customerId) {
    console.log("run")
    await ticketCustomer.destroy({ where: { ticketId: ticket2.id } });
    await ticketCustomer.create({ ticketId: ticket2.id, customerId: newTicketData.customerId });
  }

  if (newTicketData.agentId) {
    console.log("run")
    await ticketAgent.destroy({ where: { ticketId: ticket2.id } });
    await ticketAgent.create({ ticketId: ticket2.id, agentId: newTicketData.agentId });
  }
  let saveTicket = await ticket2.save();

  return saveTicket;
  
}
app.post("/tickets/update/:id", async (req ,res) => {
  try {
    let id = req.params.id
    let newTicketData = req.body
    
    let updatedTickets = await updateTicket(id,newTicketData)
    let response = await getTicketDetails(updatedTickets);

    res.status(200).json(response)
  } catch (error){
    return res.status(500).json({ message : error.message })
  }
})

// Exercise 7: Delete a Ticket
// http://localhost:3000/tickets/delete
let deleteTickets = async (id) => {
  let ticketId = id
  await ticketCustomer.destroy({ where: { ticketId } });
  await ticketAgent.destroy({ where: { ticketId } });
  let res = await tickets.destroy({ where: { id }})
  console.log(res)
  if(res.length === 0) {}
  return { message : "ticket deleted" }
}
app.post("/tickets/delete",async (req ,res) => {
  try{
    let id = parseInt(req.body.id);
    let ress = await deleteTickets(id)
    if(!ress.message){
      return res.status(404).json({ message : "Not Found"})
    }
    return res.status(200).json(ress)
  }catch (error) {
    return res.status(500).json({ message : error.message })
  }
})

app.listen(3000, () => {
  console.log("server is running on port https://localhost:3000");
});

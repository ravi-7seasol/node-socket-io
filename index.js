const express = require('express')
const app = express()
const http = require('http')
const cors = require('cors')
const { Server } = require('socket.io')
app.use(cors())

const server = http.createServer(app)

const io = new Server(server, {
    // allowEIO3: true, // false by default
    path: '/socket.io',
    transports: ['websocket'],
    secure: true,
    cors: {
        origin: "https://react-socket-io.vercel.app/",
        // origin: "http://localhost:3002",
        methods: ["GET", "POST"]
    }
})

io.on("connection", (socket) => {
    console.log(`User Connected: ${socket.id}`);

    socket.on("join_room", (data) => {
        socket.join(data)
        console.log(`User with ID: ${socket.id} joined Room: ${data}  `);
    })

    socket.on("send_message", (data) => {
        console.log(`message: ${data}  `);
        socket.to(data.room).emit("receive_message", data)
    })

    socket.on("disconnect", () => {
        console.log("User Disconnected", socket.id);
    })
})

// app.listen(5000, () => {
//     console.log(`server is running on ${5000}`);
// })

server.listen(5000, () => {
    console.log(`server is running on ${5000}`);
})
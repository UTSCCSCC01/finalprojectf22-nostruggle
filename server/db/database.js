import mongoose from 'mongoose'

mongoose.connect('mongodb+srv://catsun:JVuBA2fHTJEqHI8V@nostruggle.5fraunn.mongodb.net/?retryWrites=true&w=majority')

const connection = mongoose.connection

connection.on('connected', () => console.log("connection success"))

connection.on('disconnected', () => console.log("connection unsuccessful"))

connection.on('error', () => console.log("ERROR ERROR ERROR"))

export default connection
import { MongoClient } from 'mongodb';

const HOST = process.env.DB_HOST || 'localhost';
const PORT = process.env.DB_PORT || 27017;

const DATABASE = process.env.DB_DATABASE || 'chatbot_app';

const uri = `mongodb://${HOST}:${PORT}/${DATABASE}`;

async function testConnection() {
  try {
    const client = new MongoClient(uri, { useNewUrlParser: true });
    await client.connect();
    console.log('Connected to MongoDB');
    await client.close();
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
}

export default testConnection();

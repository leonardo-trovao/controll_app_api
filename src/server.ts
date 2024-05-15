import fastify from 'fastify'
import routes from './routes';
import mongoose from 'mongoose';

const app = fastify()

const uri = "mongodb+srv://leoxhpp:leoxhpp@cluster0.a1bnmsh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const clientOptions: any = { serverApi: { version: '1', strict: true, deprecationErrors: true } };

const start = async () => {

  await mongoose.connect(uri, clientOptions);
  await app.register(routes);

  try {
    await app.listen({ port: 5000 });
    console.log("Server Listen")
  } catch (err) {
    process.exit(1);
  }
}

start();
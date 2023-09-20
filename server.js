import express from 'express';


const port = parseInt(process.env.PORT, 10) || 5000;

const app = express();

app.use(express.json());

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.listen(port, () =>{
	console.log(`server running on port ${port}`);
});

export default app;

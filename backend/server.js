// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// require('dotenv').config();

// const app = express();
// app.use(cors());
// app.use(express.json());

// // Connect to MongoDB
// mongoose.connect(process.env.MONGO_URI)
//   .then(()=>{
//     app.listen(process.env.PORT, () => {
//       console.log('connected to db & listening on port', process.env.PORT);
//     })
//   })

// // Routes
// const authRouter = require('./routes/auth');
// const pathsRouter = require('./routes/paths');
// app.use('/api', authRouter);
// app.use('/api', pathsRouter);

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
mongoose.connection.on('connected', () => console.log('MongoDB connected'));

// Routes
const authRouter = require('./routes/auth');
const pathsRouter = require('./routes/paths');
app.use('/api', authRouter);
app.use('/api', pathsRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
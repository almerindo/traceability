import dotenv from 'dotenv';

dotenv.config();

const configDatabase = {
  ConnectionOptions: {
    user: process.env.DATABASE_USER,
    pass: process.env.DATABASE_PASSWORD,
    useNewUrlParser: true,
    authSource: 'admin',
    useUnifiedTopology: true,
  },
  mongoURI: process.env.DATABASE_URI ? process.env.DATABASE_URI : '',
};

export default configDatabase;

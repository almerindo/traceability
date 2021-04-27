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
  mongoURI: process.env.DATABASE_URI ? process.env.DATABASE_URI : 'mongodb://test:test@127.0.0.1:27017/test?authSource=admin&readPreference=primary&ssl=false',
};

export default configDatabase;

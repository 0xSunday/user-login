import { MongoClient } from "mongodb";

export const connectToDB = async () => {
  const client = await MongoClient.connect(
    "mongodb+srv://sunil1:sunilreddy@cluster0.qua6s9m.mongodb.net/?retryWrites=true&w=majority"
  );
  return client;
};

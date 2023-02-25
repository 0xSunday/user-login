import { hashPassword } from "@/lib/authPassword";
import { connectToDB } from "@/lib/db";

async function handler(req, res) {
  if (req.method !== "POST") {
    return;
  }

  const email = req.body.email;
  const password = req.body.password;

  if (!email) {
    res.status(422).json({ message: "enter email" });
    return;
  }
  if (!email.includes("@")) {
    res.status(422).json({ message: "email should have @ in it" });
    return;
  }
  if (password.trim().length < 5) {
    res.status(422).json({ message: "Password must be grater then 5 letters" });
    return;
  }

  console.log(email, password);

  const client = await connectToDB();
  const db = client.db();
  const existingUser = await db.collection("users").findOne({ email: email });

  if (existingUser) {
    client.close();
    res.status(422).json({ message: "user already exist !!" });
    return;
  }
  const hashedPassword = hashPassword(password);

  const result = await db.collection("users").insertOne({
    email: email,
    password: hashedPassword,
  });

  res.status(201).json({ message: "Created user!" });
  client.close();
}
export default handler;

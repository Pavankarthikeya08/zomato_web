import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import connectDB from './db.js';
import User from './modal.js';
import Stripe from "stripe";
dotenv.config();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret_key';

// ✅ connect MongoDB
connectDB();

// ✅ Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true, // ok to keep; frontend can send cookies/headers
  })
);

// ✅ Register user
app.post('/post', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const exists = await User.findOne({ email });
    if (exists) return res.status(409).json({ message: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashedPassword });
    await user.save();

    res.status(201).json({ message: 'User saved successfully!' });
  } catch (err) {
    console.error('Register Error:', err);
    res.status(500).json({ message: 'Failed to save user.' });
  }
});

// ✅ Login -> issue JWT
app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.status(401).json({ message: 'Invalid password' });

    const token = jwt.sign(
      { userId: user._id.toString(), email: user.email },
      JWT_SECRET,
      { expiresIn: '10h' }
    );

    res.json({ token }); 
  } catch (err) {
    console.error('Login Error:', err);
    res.status(500).json({ message: 'Login failed' });
  }
});

// ✅ JWT auth middleware
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'] || '';
  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null;

  if (!token) return res.status(401).json({ message: 'No token provided' });

  jwt.verify(token, JWT_SECRET, (err, payload) => {
    if (err) {
      console.error('JWT Verify Error:', err);
      return res.status(403).json({ message: 'Invalid token' });
    }

    req.user = payload; // { userId, email, iat, exp }
    next();
  });
}
app.get('/check', authenticateToken, (req, res) => {
     res.status(200).json({ message: 'Valid user', user: req.user });
 
});

// ✅ Example protected route
app.get('/content', authenticateToken, (req, res) => {
  res.send(`Welcome user ${req.user.email}`);
});

// ✅ "Logout" (JWT logout is client-side only)
app.post('/logout', (_req, res) => {
  res.json({ message: 'Logged out (delete token on client)' });
});


app.post("/create-checkout-session", async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: { name: "Test Product" },
            unit_amount: 2000, // $20.00
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: "http://localhost:3000/successpage",
      cancel_url: "http://localhost:3000/cancelpage",
    });

   res.status(200).json({ id: session.id });
  } catch (error) {
    console.error(error);
    res.status(500).send("Something went wrong");
  }
});



// ✅ Start server
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));







const express = require('express');
const path = require('path');
const cors = require('cors');
const session = require('express-session');
const jwt = require('jsonwebtoken');
const { sequelize, Product, LikeProduct, Order, User, Reservation, SchoolProduct } = require('./models');
const { passport, generateToken } = require('./auth/passport');


const app = express();
const SECRET_KEY = 'your_secret_key';

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public/img")));
app.use(session({ secret: SECRET_KEY, resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.sendStatus(401);

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

// User registration
app.post('/register', async (req, res) => {
  const { username, userRealname, phone, zip, address, password} = req.body;
  try {
    const hashedPassword = await User.hashPassword(password);
    const fullAddress = `${address}` // 주소와 상세 주소를 문자열로 결합
    

    const user = await User.create({ username, userRealname, phone, zip, address: fullAddress, password: hashedPassword
    });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'User registration failed' });
  }
});

// User login with local strategy
app.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) return next(err);
    if (!user) return res.status(401).json(info);
    const token = generateToken(user);
    res.json({ token });
  })(req, res, next);
});

// User login with Kakao strategy
app.get('/auth/kakao', passport.authenticate('kakao'));

app.get('/auth/kakao/callback', 
  passport.authenticate('kakao', { failureRedirect: '/login' }),
  (req, res) => {
    const token = generateToken(req.user);
    //res.redirect(`http://localhost:3001/login?token=${token}`);
  }
);

// User logout
app.post('/logout', (req, res) => {
  req.logout();
  res.status(200).json({ message: 'Logged out successfully' });
  
});


app.get("/product/:id", async (req, res) => {
  
  const prodid = req.params.id;
  try {
    const products = await Product.findAll({ where: { prodid: prodid } });
    console.log("까꿍", products)
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch products" });
  }
});
app.get("/products", async (req, res) => {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch products" });
  }
});

app.get("/school/:id", async (req, res) => {
  console.log("꺄악")
  const schoolid = req.params.id;
  try {
    const schools = await SchoolProduct.findAll({ where: { schoolprodid: schoolid } });
    console.log("까꿍", schools)
    res.json(schools);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch schools" });
  }
});
app.get("/schools", async (req, res) => {
  try {
    const schools = await SchoolProduct.findAll();
    res.json(schools);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch schools" });
  }
});


// app.get('/prod', async (req, res) => {
//   try {
//     const prod = await Prod.findAll();
//     res.json(prod);
//   } catch (error) {
//     res.status(500).json({ error: 'Failed to fetch prod' });
//   }
// });



// Protected routes
app.post('/makereservation', async (req, res, next) => {
  console.log("userAuthID:", req.body.userAuthID)
  console.log("timeSelected:", req.body.timeSelected)
  const reserv_time = req.body.timeSelected;
  const userid = req.body.userAuthID;
  const used_point = 1;
  const user = await Reservation.create({ used_point, reserv_time,  userid});
  res.status(200).json({ message: 'reservation success!' });
  
});

app.get('/user/:id', async (req, res) => {
  const userid = req.params.id;
  console.log('userid:', userid);
  try {
    const usernamephone = await User.findAll(
      {
        attributes:['username','userRealname', 'phone','address'],
        where :{'userid':userid}
      }
    );
    res.json(usernamephone);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch books' });
  }
});

app.get('/users', authenticateToken, async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});
app.get("/orders", async (req, res) => {
  try {
    const orders = await Order.findAll({
      include: [Products, User],
    });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch orders" });
  }
});
// app.get('/orders', authenticateToken, async (req, res) => {
//   try {
//     const orders = await Order.findAll({
//       include: [Prod, User]
//     });
//     res.json(orders);
//   } catch (error) {
//     res.status(500).json({ error: 'Failed to fetch orders' });
//   }
// });

app.get('/likeProducts', authenticateToken, async (req, res) => {
  try {
    const likeProducts = await LikeProduct.findAll({
      include: [Product, User]
    });
    res.json(likeProducts);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch likeProd' });
  }
});

app.get('/reservation', authenticateToken, async (req, res) => {
  try {
    const reservation = await Reservation.findAll({
      include: [User]
    });
    res.json(reservation);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch reservation' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  // sequelize.sync({force: true});
  sequelize.sync({force: false});
});

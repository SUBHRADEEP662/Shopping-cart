const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const MsqConn = require('../db/mysqlConn');
const nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'gmitcse1@gmail.com',
      pass: 'gmit12345'
    }
  });

// for MongoDB database connection
require('../db/mdbConn');
const Products = require('../model/prodSchema');



// user register section
// for MySQL database connection
router.post('/register', async (req, res) => {
    const { name, email, username, password } = req.body;

    var EncPassword;
    if (!name || !email || !username || !password) {
        return res.status(422).json({ error: "Filled the filds properly" });
    } else {
        // encrypt the password
        EncPassword = await bcrypt.hash(password, 12);
    }

    try {
        await MsqConn.query('SELECT * FROM user_data WHERE email = ?', [email], (err, result) => {
            if (err) {
                console.log(err)
            }
            try {
                if (result[0].email) {
                    return res.status(422).json({ error: "Email already exist!" });
                }
            } catch (err) {
                MsqConn.query('INSERT INTO user_data (name, email, username, password) VALUES (?,?,?,?)', [name, email, username, EncPassword], (err, result) => {
                    if (err) {
                        res.status(422).send({ err: err })
                    } else {
                        var mailOptions = {
                            from: 'gmitcse1@gmail.com',
                            to: email,
                            subject: 'GMIT Shopping Cart',
                            html: '<b>WELCOME:' + name + '</b> <br/>Registration Successful !',
                          };
                          
                        transporter.sendMail(mailOptions, function(error, info){
                            if (error) {
                                console.log(error);
                            } else {
                                console.log('Email sent: ' + info.response);
                            }
                        });
                        res.status(201).json({ message: "User registerd successfully." });
                    }
                })
            }

        })

    } catch (error) {
        console.log(error);
    }
});

// user login section for MongoDB
// router.post('/signin', async (req, res) => {
//     try {
//         const { email, password } = req.body;

//         if (!email || !password) {
//             return res.status(400).json({ error: "Filled the field properly" });
//         }

//         const userLogin = await User.findOne({ email: email });

//         if (userLogin) {
//             const isPassMatch = await bcrypt.compare(password, userLogin.password);

//             const token = await userLogin.generateAuthToken(); // jwt token generation in userSchema.js file

//             res.cookie('jwtoken', token, {
//                 expires: new Date(Date.now() + 25892000000),
//                 httpOnly: true
//             });

//             if (!isPassMatch) {
//                 res.status(400).json({ error: "Invalid Credentials!" });
//             } else {
//                 res.status(201).json({ message: "Signin successfully." });
//             }
//         } else {
//             res.status(400).json({ error: "Invalid Credentials!" });
//         }

//     } catch (error) {
//         console.log(error);
//     }
// });

// user login section for MySQL
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: "Filled the field properly" });
        }

        try {
            await MsqConn.query('SELECT * FROM user_data WHERE email = ?', [email], async (err, result) => {
                if (err) {
                    console.log(err)
                }
                try {
                    if (result[0].email) {
                        const isPassMatch = await bcrypt.compare(password, result[0].password);
                        if (!isPassMatch) {
                            res.status(400).json({ error: "Invalid Credential!" });
                        } else {
                            var user = {
                                name: result[0].name,
                                email: result[0].email,
                                username: result[0].username
                            }

                            res.status(200).json(user);
                        }
                    } else {
                        res.status(400).json({ error: "Invalid Credentials!" });
                    }
                } catch (err) {
                    console.log(err)
                }

            })
        } catch (error) {
            console.log(error)
        }

    } catch (error) {
        console.log(error);
    }
});


router.get('/product', async (req, res) => {
    try {
        const products = await Products.find();
        res.json(products);
        console.log(products);
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
});


router.get('/cart/:email', async (req, res) => {
    try {
        const products = await Products.findOne({ email: email });
        res.json(products);
        console.log(products);
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
});


module.exports = router;
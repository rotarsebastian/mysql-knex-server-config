const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const saltRounds = 10;

// bcrypt.hash('password', saltRounds, (err, hashedPassword) => {
//     if(err) return console.log(err);
//     console.log(hashedPassword);
// });

// bcrypt.compare('password', '$2b$10$SK4aBWxKHRDwL3d9h/.tDe.83resj6Z2B35iSQQ6RppmvTE7rFSnW', (err, isSame) => {
//     if (err) return console.log(err);
//     console.log(isSame);
// });

// Login
router.post('/login', async(req, res) => {
    const { username, password } = req.body;
    if(username && password) {
        const users = await User.query().where({ username }).limit(1);
        const user = users[0];
        if(!user) {
            return res.status(404).send({ message: 'User not regisered!' });
        }
        bcrypt.compare(password, user.password, (err, isSame) => {
            if (err) return console.log(err);
            if(!isSame) {
                return res.status(404).send({ message: 'Wrong password!' });
            } else {
                return res.status(200).send({ response: user.username });
            }
        });
    } else {
        return res.status(404).send({ message: 'Missing username or password!' });
    }
});

// Register
router.post('/register', async(req, res) => {
    const { username, password, repeatPassword } = req.body;
    if(username && password && repeatPassword ) {
        if(password !== repeatPassword) {
            return res.status(404).send({ message: 'Passwords do not match!' });
        } else {
            if(password.length <= 6) {
                return res.status(404).send({ message: 'Password too short!' });
            } else {
                bcrypt.hash(password, saltRounds, async(err, hashedPassword) => {
                    if(err) return res.status(500).send({ message: err });
                    try {
                        const existingUser = await User.query().select().where({username}).limit(1);
                        if(existingUser[0]) {
                            return res.status(404).send({ message: 'User already exists!' });
                        } else {
                            const newUser = await User.query().insert({username, password: hashedPassword});
                            return res.status(200).send({ response: newUser });
                        }
                    } catch(err) {
                        return res.status(404).send({ message: 'Error while trying adding user!' });
                    }
                });
            }
        }
    } else {
        return res.status(404).send({ message: 'Missing credentials!' });
    }
    
});

module.exports = router;
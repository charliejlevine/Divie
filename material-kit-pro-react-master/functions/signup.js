const { db } = require('/admin');
const firebase = require('firebase');
const auth = firebase.auth();
const config = require('/config');

exports.signUp = (req, res) => {
  /*
          We get the new user data from the 
          body of the request we sent
      */
  const newUser = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password
  };
  let userId;
  const defaultImg = 'defaultImg.png';

  if (newUser.password.trim().length < 6) {
    return res
      .status(400)
      .json({ message: 'Password must be at least 6 characters.' });
  }
  /*
      Now we are going to try to create a new user
      Before we create a new user we need to check 
      if the user already exists by checking his email
  */
  db.doc(`/users/${newUser.email}`)
    .get()
    .then(doc => {
      if (doc.exists) {
        return res
          .status(400)
          .json({ message: 'Email has been already taken' });
      } else {
        return auth
          .createUserWithEmailAndPassword(newUser.email, newUser.password)
          .then(data => {
            data.user.sendEmailVerification();
            userId = data.user.uid;

            const userCredentials = {
              firstName: newUser.firstName,
              lastName: newUser.lastName,
              email: newUser.email,
              createdAt: new Date().toISOString(),
              userId: userId,
              imageUrl: `https://firebasestorage.googleapis.com/v0/b/${config.storageBucket}/o/${defaultImg}?alt=media`
            };
            return db
              .doc(`/users/${newUser.email}`)
              .set(userCredentials)
              .then(data => {
                return res.status(201).json({ message: 'sign up successful' });
              })
              .catch(err => {
                console.log(err);
              });
          })
          .catch(err => {
            /*
                          Just an extra check
                      */
            console.log(err);
            if (err.code == 'auth/email-already-in-use') {
              return res.status(400).json({ message: 'Email Already in Use' });
            } else {
              return res.status(500).json({ message: err.code });
            }
          });
      }
    })
    .catch(err => {
      console.log(err);
      return res.status(500).json({ message: err.code });
    });
};

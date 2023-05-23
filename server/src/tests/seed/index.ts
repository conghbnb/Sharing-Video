// import mongoose from 'mongoose';
// import jwt from 'jsonwebtoken';

// const userOneID = new mongoose.Types.ObjectId();
// const userTwoID = new mongoose.Types.ObjectId();

// const users = [
//   {
//     _id: userOneID,
//     email: 'person1@gmail.com',
//     password: 'person1PASSWORD',
//     tokens: [
//       {
//         access: 'auth',
//         token: jwt
//           .sign({ _id: userOneID, access: 'auth' }, process.env.JWT)
//           .toString(),
//       },
//     ],
//   },
//   {
//     _id: userTwoID,
//     email: 'person2@gmail.com',
//     password: 'person2PASSWORD',
//     tokens: [
//       {
//         access: 'auth',
//         token: jwt
//           .sign({ _id: userTwoID, access: 'auth' }, process.env.JWT_SECRET)
//           .toString(),
//       },
//     ],
//   },
// ];

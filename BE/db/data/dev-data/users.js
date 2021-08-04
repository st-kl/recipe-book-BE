const { ObjectId } = require('mongodb');
module.exports = [
  {
    _id: ObjectId('610a5e30ceac105ae4bc5bca'),
    username: 'user1',
    name: 'name1',
    email: 'hello1@gmail.com',
    avatar_url: 'https://bit.ly/3rD32gb',
    recipes: ['110a5e30ceac105ae4bc5bcb'],
    created_at: new Date(1610965445410),
  },
  {
    _id: ObjectId('610a5e30ceac105ae4bc5bcb'),
    username: 'user2',
    name: 'name2',
    email: 'hello2@gmail.com',
    avatar_url: 'https://bit.ly/3rD32gb',
    recipes: ['210a5e30ceac105ae4bc5bcb'],
    created_at: new Date(1540965445410),
  },
  {
    _id: ObjectId('610a5e30ceac105ae4bc5bcc'),
    username: 'user3',
    name: 'name3',
    email: 'hello3@gmail.com',
    avatar_url: 'https://bit.ly/3rD32gb',
    recipes: ['310a5e30ceac105ae4bc5bcb'],
    created_at: new Date(1656965445410),
  },
  {
    _id: ObjectId('610a5e30ceac105ae4bc5bcd'),
    username: 'user4',
    name: 'name4',
    email: 'hello4@gmail.com',
    avatar_url: 'https://bit.ly/3rD32gb',
    recipes: [],
    created_at: new Date(1610910445410),
  },
];

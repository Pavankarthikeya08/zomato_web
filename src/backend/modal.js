import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const Schema1= new Schema({
  name: {
    type: String,
    required:true
  },
  email: {
    type: String,
    required: true,
  },
  password:{
    type: String,
    required: true,
    
  }
});
const User = model('Data2',Schema1, 'data2');

export default User;



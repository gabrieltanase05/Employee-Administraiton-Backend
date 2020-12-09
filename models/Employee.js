import mongoose from 'mongoose';

const PersonSchema = mongoose.Schema({
   name: {
       type: String,
       require: true
   },
    salary: {
       type: Number,
       require: true
   },
    age: {
       type: Number,
       require: true
   }
});

export default mongoose.model('Data', PersonSchema);
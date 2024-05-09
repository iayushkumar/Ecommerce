const mongoose=require('mongoose')
const {Schema}=mongoose;

const cartSchema=new Schema({
  color:{type:String,required:true},
  size:{type:String,required:true},
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  product:{type:Schema.Types.ObjectId,ref:'Product'}
})

module.exports=mongoose.model('cart',cartSchema); 

import mongoose from 'mongoose';

const productSchema = mongoose.Schema({
    name: String,
    price: Number,
    desc: String,
    quality: Number,
    status: Boolean,

});
export default mongoose.model("Products", productSchema)
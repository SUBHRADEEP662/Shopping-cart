const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema(
    {
        productId: Number,
        productName: string,
        qty: number,
        price: number
    },
    { timestamps: true }
)

cartSchema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});

// const userSchema = new mongoose.Schema({
//     email: {
//         type: String,
//         required: true
//     },

//     password: {
//         type: String,
//         required: true
//     },

//     tokens: [
//         {
//             token: {
//                 type: String,
//                 required: true
//             }
//         }
//     ],
// })

// // hashing the password
// userSchema.pre('save', async function (next) {
//     if (this.isModified('password')) {
//         this.password = await bcrypt.hash(this.password, 12);
//     }
//     next();
// });

// // generating jwt token
// userSchema.methods.generateAuthToken = async function () {
//     try {
//         let token = jwt.sign({ _id: this._id }, process.env.SECRET_KEY);
//         this.tokens = this.tokens.concat({ token: token});
//         await this.save();
//         return token;
//     } catch (error) {
//         console.log(error);
//     }
// }

const Products = mongoose.model('PRODUCT', cartSchema);
module.exports = Products;
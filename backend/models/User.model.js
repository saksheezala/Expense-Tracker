import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema(
    {
        fullName:{
            type: String,
            required: true,
            trim: true
        },
        email:{
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true
        },
        password:{
            type: String,
            required: true,
            minlength: 8
        },
        profileImageUrl:{
            type: String,
            default: null
        }
    },{timestamps: true}
);

//hash password before saving
userSchema.pre('save', async function(next){
    if(!this.isModified("password")) return next();
    
    this.password = await bcrypt.hashSync(this.password, 10);
    next();
})

//method to compare password
userSchema.methods.comparePassword = async function(candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
}

export const User = mongoose.model("User" , userSchema);
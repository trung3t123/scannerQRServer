import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

mongoose.Promise = global.Promise;

const userSchema = new mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	userPassword: {
		type: String,
		required: true,
	},
	userMail: {
		type: String,
		required: true,
	},
	userPhone: {
		type: String,
		required: true,
	},
	tokens: [{
		token: {
			type: String,
			required: true
		}
	}]
});

userSchema.methods.generateAuthToken = async function () {
	// Generate an auth token for the user
	const user = this
	const token = jwt.sign({ _id: user._id }, "TrungNC")
	user.tokens = user.tokens.concat({ token })
	await user.save()
	return token
}

userSchema.statics.findByCredentials = async (userPhone, userPassword) => {
	// Search for a user by email and password.
	const user = await User.findOne({ userPhone })
	console.log('finding');
	if (!user) {
		throw new Error({ error: 'Invalid login credentials, no user match' })
	}
	const isPasswordMatch = await bcrypt.compare(userPassword, user.userPassword)
	if (!isPasswordMatch) {
		throw new Error({ error: 'Invalid login credentials ' })
	}
	return user
}

export default mongoose.model('User', userSchema);
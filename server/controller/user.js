import mongoose from 'mongoose';
import User from '../models/user.js';
import bcrypt from 'bcryptjs';


/// create new code
export async function createUser(req, res) {
	const user = new User({
		_id: mongoose.Types.ObjectId(),
		userPhone: req.body.userPhone,
		userPassword: await bcrypt.hash(req.body.userPassword, 8),
		userMail: req.body.userMail
	});
	console.log('user', user);
	return user
		.save()
		.then(async function (newUser) {
			const token = await user.generateAuthToken()
			return res.status(201).json({
				success: true,
				message: 'New user created successfully',
				user: newUser,
				token: token
			});
		})
		.catch((error) => {
			console.log(error);
			res.status(500).json({
				success: false,
				message: 'Server error. Please try again.',
				error: error.message,
			});
		});
}

export async function getLoginData(req, res) {
	res.send(req.user)
}

export async function loginUser(req, res) {
	try {
		console.log('hello');
		const { userPhone, userPassword } = req.body;
		const user = await User.findByCredentials(userPhone, userPassword);
		if (!user) {
			return res.status(401).send({ error: 'Login failed! Check authentication credentials' })
		}
		const token = await user.generateAuthToken()
		res.send({ user, token })
	} catch (error) {
		res.status(400).send(error)
	}
}

export function deleteUser(req, res) {
	const id = req.params.userId;
	User.findByIdAndRemove(id)
		.exec()
		.then(() => res.status(204).json({
			message: 'deleted user',
			success: true,
		}))
		.catch((err) => res.status(500).json({
			success: false,
		}));
}


export function deleteAllUsers(req, res) {
	User.remove({})
		.exec()
		.then(() => res.status(204).json({
			message: 'deleted user',
			success: true,
		}))
		.catch((err) => res.status(500).json({
			success: false,
		}));
}


// Get all course
export function getAllUser(req, res) {
	User.find()
		.select('_id userPhone userPassword userMail')
		.then((allUser) => {
			return res.status(200).json({
				success: true,
				message: 'A list of all users',
				Course: allUser,
			});
		})
		.catch((err) => {
			res.status(500).json({
				success: false,
				message: 'Server error. Please try again.',
				error: err.message,
			});
		});
}

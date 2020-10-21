import mongoose from 'mongoose';

mongoose.Promise = global.Promise;

const qrResult = new mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	qrResultMessage: {
		type: String,
		required: true,
	},
	date: {
		type: String,
		required: true,
	},
	time: {
		type: String,
		required: true,
	},
	deviceInfo: {
		type: String,
		required: true,
	},
	scanStatus : {
		type: String,
		required: true,
	}
});

export default mongoose.model('qrResult', qrResult);
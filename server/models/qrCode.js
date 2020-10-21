import mongoose from 'mongoose';

mongoose.Promise = global.Promise;

const qrCodeSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  bounds: {
    type: [],
	},
	data : {
		type: String,
		required: true
	},
	type : { 
		type: String,
		required: true
	},
	target: {
		type: String,
		required: true
	},
	rawData: {
		type: String,
		required: true
	}
});

export default mongoose.model('qrCode', qrCodeSchema);
import mongoose from 'mongoose';
import qrCode from '../models/qrCode.js';

/// create new code
export function createQrCode(req, res) {
	const code = new qrCode({
		_id: mongoose.Types.ObjectId(),
		bounds: req.body.bounds,
		data: req.body.data,
		type: req.body.type,
		target: req.body.target,
		rawData: req.body.rawData,
	});
	console.log('code', code);
	return code
		.save()
		.then((newCode) => {
			return res.status(201).json({
				success: true,
				message: 'New code created successfully',
				qrCode: newCode,
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

//delete

export function deleteCode(req, res) {
  const id = req.params.codeId;
  qrCode.findByIdAndRemove(id)
    .exec()
    .then(()=> res.status(204).json({
      success: true,
    }))
    .catch((err) => res.status(500).json({
      success: false,
    }));
}

// Get all course
export function getAllCode(req, res) {
	qrCode.find()
		.select('_id bounds data type target rawData')
		.then((allQRCode) => {
			return res.status(200).json({
				success: true,
				message: 'A list of all course',
				qrCode: allQRCode,
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
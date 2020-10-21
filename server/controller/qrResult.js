import mongoose from 'mongoose';
import qrResult from '../models/qrResult.js';

/// create new cause
export function createResultMessage(req, res) {
	const newQrResult = new qrResult({
		_id: mongoose.Types.ObjectId(),
		qrResultMessage: req.body.qrResultMessage,
		time: req.body.time,
		date: req.body.date,
		deviceInfo: req.body.deviceInfo,
		scanStatus: req.body.scanStatus
	});
	console.log('qrResult', newQrResult);
	return newQrResult
		.save()
		.then((newQrResult) => {
			return res.status(201).json({
				success: true,
				message: 'New Result message Stored',
				qrResultMessage: newQrResult,
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

export function getScanStatus(req, res) {
	qrResult.find()
		.select('_id scanStatus')
		.then((allQrResultMessage) => {
			var success = 0;
			var fail = 0;

			allQrResultMessage.map((qrResultMessage) => {
				console.log(qrResultMessage.scanStatus);
				switch (qrResultMessage.scanStatus) {
					case ('true'): {
						success = success + 1;
						break;
					}
					case ('false'): {
						fail = fail + 1;
						break;
					}
					default:
						break;
				}
			})
			return res.status(200).json({
				success: true,
				message: 'scanStatus count',
				scanStatusCount: { success: success, fail: fail }

			});
		}).catch((err) => {
			res.status(500).json({
				success: false,
				message: 'Server error. Please try again.',
				error: err.message,
			});
		})
}
// Get all course
export function getAllResultMessage(req, res) {
	qrResult.find()
		.select('_id qrResultMessage time date deviceInfo scanStatus')
		.then((allQrResultMessage) => {
			return res.status(200).json({
				success: true,
				message: 'A list of all qrResult Message',
				qrResultMessage: allQrResultMessage,
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


export function deleteAllQrResultMessage(req, res) {
	qrResult.remove({})
		.exec()
		.then(() => res.status(204).json({
			message: 'deleted qrResult',
			success: true,
		}))
		.catch((err) => res.status(500).json({
			success: false,
		}));
}

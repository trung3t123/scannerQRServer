import express from 'express';
import { createCourse, getAllCourse, getSingleCourse } from '../controller/course.js';
import { createQrCode, getAllCode, deleteCode } from '../controller/qrCode.js';
import { createUser, getAllUser, deleteUser, deleteAllUsers, loginUser, getLoginData } from '../controller/user.js';
import auth from '../middleware/auth.js';
import { createResultMessage, getAllResultMessage, deleteAllQrResultMessage, getScanStatus } from '../controller/qrResult.js';

const mainRoutes = express.Router();
mainRoutes.post('/course', createCourse);
mainRoutes.get('/course', getAllCourse);
mainRoutes.get('/code', getAllCode);
mainRoutes.post('/code', createQrCode);
mainRoutes.delete('/code/:codeId', deleteCode);
mainRoutes.delete('/user/:userId', deleteUser);
mainRoutes.delete('/user', deleteAllUsers);
mainRoutes.post('/user/postLogin', loginUser);
mainRoutes.get('/user/getLoginData', auth, getLoginData)
mainRoutes.get('/courses/:courseId', getSingleCourse);
mainRoutes.post('/user', createUser);
mainRoutes.get('/users', getAllUser);
mainRoutes.post('/moCode', createResultMessage);
mainRoutes.get('/moCodes', getAllResultMessage);
mainRoutes.delete('/moCodes', deleteAllQrResultMessage);
mainRoutes.get('/moCodes/scanStatus', getScanStatus);




export default mainRoutes;
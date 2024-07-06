import express from 'express';
import session from '../controllers/session.js';
import admin from '../controllers/admin.js'
import student from '../controllers/student.js';
import mailer from '../otp/mail.js'
import jwtAuth from '../middlewares/auth.js';
import pay from '../payment/pay.js';
import washerman from '../controllers/washerman.js';

const router = express.Router();

router.get('/', (req, res) => {
    res.send('Welcome to DBMS');
});

// Session Routes
router.post('/session/admin/login', session.adminLogin);
router.post('/session/student/login', session.studentLogin);
// washerman login also creates a web socket conn
router.post('/session/washerman/login', session.washermanLogin);
// washerman logout also removes web socket conn
router.post('/session/washerman/logout', session.washermanLogout);
router.get('/session/logout', session.logout);

// Register Routes
router.post('/sendAuthCode', mailer.sendOTP);
router.post('/student/register', student.register);
router.post('/student/resetPassword',student.resetPassword);
// Authentication Midddleware to access other routes
router.use(jwtAuth);

// Admin Routes
router.post('/admin/washerman/register', admin.registerWasherman);
router.post('/admin/addHallData', admin.addHallData);

// Student Routes
// requestWash is done through web socket conn and response is received through event listener
router.post('/student/requestWash', student.requestWash);
router.post('/student/fetchRecord', student.fetchRecord);
router.get('/student/fetchDates', student.fetchDates);
router.post('/student/payment/fetchReceipt', student.fetchReceipt);
router.get('/student/payment/fetchDates', student.paymentDates);
router.get('/student/payment/clearDue', student.clearDue);
router.post('/student/fetchUpcomingDate', student.fetchUpcomingDate);
// For payment verification from RazorPay
router.post('/verifyPayment', pay.verifyPayment);

// Washerman routes
router.post('/washerman/wing/fetchRecord', washerman.wingRecord);
router.post('/washerman/upcomingDate', washerman.upcomingDate);
router.post('/washerman/wing/addEvents', washerman.addEvents);
router.post('/washerman/wing/collectCloths',washerman.collectCloths);
router.post('/washerman/wing/fetchSummary',washerman.fetchSummary);
router.post('/washerman/wing/accept',washerman.acceptRecord);
export default router;

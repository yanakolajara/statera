const express = require('express');
const router = express.Router();
const db = require('../db/dbConfig');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const sendEmail = require('../services/nodemailer');

function generateVerificationCode() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

function getExpirationDate(minutes = 10) {
  return new Date(Date.now() + minutes * 60 * 1000);
}

router.post('/register', async (req, res) => {
  try {
    const {
      email,
      password,
      first_name,
      middle_name,
      last_name,
      dob,
      gender,
      phone,
    } = req.body;

    const existingEmail = await db.oneOrNone(
      'SELECT email FROM users WHERE email = $1',
      [email]
    );
    const existingPhone = await db.oneOrNone(
      'SELECT phone FROM users WHERE phone = $1',
      [phone]
    );

    const existingPending = await db.oneOrNone(
      'SELECT email FROM pending_users WHERE email = $1',
      [email]
    );

    if (existingEmail || existingPhone || existingPending) {
      return res.status(400).json({
        success: false,
        error: 'Email already registered or pending verification',
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const verificationCode = generateVerificationCode();

    const expiresAt = getExpirationDate(10);

    await db
      .one(
        `INSERT INTO pending_users (
        email, 
        hashed_password,
        verification_code,
        first_name,
        middle_name,
        last_name,
        dob,
        gender,
        phone,
        created_at,
        expires_at
      ) VALUES (
        $1, $2, $3, $4, $5,
        $6, $7, $8, $9,
        NOW(),
        $10
      )
      RETURNING temp_id
      `,
        [
          email,
          hashedPassword,
          verificationCode,
          first_name,
          middle_name,
          last_name,
          dob,
          gender,
          phone,
          expiresAt,
        ]
      )
      .then(() => {
        sendEmail(
          email,
          'Welcome to Statera!',
          'This is the plain text body.',
          `<p>This is the <b>${verificationCode}</b> body.</p>`
        );
      });

    res.status(201).json({
      success: true,
      message: 'Registration successful. Check your email for the MFA code.',
    });
  } catch (error) {
    console.error('Error on /register:', error);
    res.status(500).json({
      error: 'An error occurred while registering. Please try again.',
      success: false,
    });
  }
});

router.post('/complete-enrollment', async (req, res) => {
  console.log('=== Complete Enrollment Started ===');
  console.log('Request body:', req.body);
  try {
    const { email, code } = req.body;
    console.log('Extracted data:', { email, code });

    console.log('Querying pending user...');
    const pending = await db.oneOrNone(
      'SELECT * FROM pending_users WHERE email = $1',
      [email]
    );
    console.log('Pending user query result:', pending);

    if (!pending) {
      console.log('No pending registration found for email:', email);
      return res.status(404).json({
        success: false,
        error: 'There is no pending registration with that email.',
      });
    }

    console.log('Preparing user insertion query...');
    const query = `
  INSERT INTO users (
    first_name, 
    middle_name, 
    last_name, 
    dob, 
    gender, 
    email, 
    phone,
    hashed_password
  ) VALUES (
    $1, $2, $3, $4, $5, $6, $7, $8
  )
  RETURNING *
`;

    console.log('Inserting new user into database...');
    const updated = await db.one(query, [
      pending.first_name,
      pending.middle_name,
      pending.last_name,
      pending.dob,
      pending.gender,
      email,
      pending.phone,
      pending.hashed_password,
    ]);
    console.log('User successfully inserted:', { userId: updated.id });

    console.log('Generating JWT token...');
    const token = jwt.sign({ user_id: code }, 'SECRET_KEY_EXAMPLE', {
      expiresIn: '1d',
    });
    console.log('JWT token generated successfully');

    console.log('Preparing response data...');
    const responseData = {
      success: true,
      message: 'Account successfully created. ',
      token: token,
      userData: {
        id: updated.id,
        first_name: updated.first_name,
        middle_name: updated.middle_name,
        last_name: updated.last_name,
        dob: updated.dob,
        gender: updated.gender,
        email: updated.email,
        phone: updated.phone,
      },
    };
    console.log('Response data prepared:', {
      userId: responseData.userData.id,
    });

    res.status(202).json(responseData);
    console.log('=== Complete Enrollment Finished Successfully ===');
  } catch (error) {
    console.error('=== Complete Enrollment Error ===');
    console.error('Error details:', error);
    console.error('Stack trace:', error.stack);
    res.status(500).json({
      success: false,
      error: 'Error completing the enrollment.',
    });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const userData = await db.oneOrNone(
      `SELECT 
        id
        email,
        first_name,
        middle_name,
        last_name,
        dob,
        gender,
        phone,
        hashed_password
      FROM users
      WHERE email = $1`,
      [email]
    );

    if (!userData) {
      return res.status(400).json({
        success: false,
        error: 'User not found',
      });
    }

    const { id, hashed_password } = userData;

    const isMatch = await bcrypt.compare(password, hashed_password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        error: 'Invalid credentials',
      });
    }

    const verificationCode = generateVerificationCode();
    const expiresAt = getExpirationDate(10);

    await db.none('DELETE FROM pending_users WHERE email = $1 OR phone = $2', [
      email,
      userData.phone,
    ]);

    await db.none(
      `INSERT INTO pending_users (
        email,
        hashed_password,
        verification_code,
        first_name,
        middle_name,
        last_name,
        dob,
        gender,
        phone,
        expires_at
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`,
      [
        email,
        userData.hashed_password,
        verificationCode,
        userData.first_name,
        userData.middle_name,
        userData.last_name,
        userData.dob,
        userData.gender,
        userData.phone,
        expiresAt,
      ]
    );

    await sendEmail(
      email,
      'Login Verification Code',
      'Here is your login verification code.',
      `<p>Your login verification code is: <b>${verificationCode}</b></p>`
    );

    res.status(200).json({
      success: true,
      message: 'Please check your email for the verification code.',
      email: email,
    });
  } catch (error) {
    console.error('❌ Error in /login:', error);
    res.status(500).json({
      success: false,
      error: 'Internal login error',
    });
  }
});

router.post('/verify-login', async (req, res) => {
  try {
    const { email, verification_code } = req.body;

    const pendingVerification = await db.oneOrNone(
      'SELECT * FROM pending_users WHERE email = $1 ORDER BY created_at DESC LIMIT 1',
      [email]
    );

    if (!pendingVerification) {
      return res.status(404).json({
        success: false,
        error: 'No pending verification found',
      });
    }

    if (pendingVerification.verification_code !== verification_code) {
      return res.status(400).json({
        success: false,
        error: 'Invalid verification code',
      });
    }

    if (new Date() > new Date(pendingVerification.expires_at)) {
      return res.status(400).json({
        success: false,
        error: 'Verification code has expired',
      });
    }

    const userData = await db.one(`SELECT * FROM users WHERE email = $1`, [
      pendingVerification.email,
    ]);

    const token = jwt.sign({ user_id: userData.id }, 'SECRET_KEY_EXAMPLE', {
      expiresIn: '1d',
    });

    await db.none('DELETE FROM pending_users WHERE temp_id = $1', [
      pendingVerification.temp_id,
    ]);

    res.status(200).json({
      success: true,
      message: 'Login successful',
      token,
      userData: {
        id: userData.id,
        email: userData.email,
        first_name: userData.first_name,
        last_name: userData.last_name,
        dob: userData.dob,
        gender: userData.gender,
        phone: userData.phone,
      },
    });
  } catch (error) {
    console.error('❌ Error in /verify-login:', error);
    res.status(500).json({
      success: false,
      error: 'Internal verification error',
    });
  }
});

module.exports = router;

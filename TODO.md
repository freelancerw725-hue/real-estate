# OTP-Based Admin Login Implementation

## Backend Changes
- [ ] Install nodemailer dependency
- [ ] Update Admin model to include OTP fields (otp, otpExpires)
- [ ] Create sendOTP function in authController
- [ ] Create verifyOTP function in authController
- [ ] Update auth routes to include /admin/send-otp and /admin/verify-otp

## Frontend Changes
- [ ] Update AdminDashboard component to use OTP flow
- [ ] Update api.js with sendOTP and verifyOTP functions

## Testing
- [ ] Test complete OTP flow
- [ ] Verify httpOnly cookie is set
- [ ] Ensure dashboard opens after successful verification

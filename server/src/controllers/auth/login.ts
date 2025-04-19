import { catchAsync } from "../../utils/catchAsync";
import User from "../../models/UserModel";
import bcrypt from "bcrypt";
import { generateToken } from "../../utils/auth/jwtUtils";
import { createAuthCookie } from "../../utils/auth/cookieUtils";
import { generateVerificationToken } from "../../utils/auth/tokenUtils";
import sendVerificationEmail from "../../utils/auth/sendVerifyMail";
import { buildUserResponse } from "../../utils/userUtils";

export const UserLogin = catchAsync(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res
      .status(400)
      .json({ success: false, message: "Email and password are required." });

  const user = await User.findOne({ email: email.toLowerCase() });
  if (!user)
    return res
      .status(401)
      .json({ success: false, message: "Invalid credentials." });

  // handle unverified user
  if (!user.isVerified) {
    const now = new Date();
    if (
      !user.resendWindowStart ||
      now.getTime() - user.resendWindowStart.getTime() > 86400000
    ) {
      user.resendWindowStart = now;
      user.resendCount = 0;
    }

    if (user.resendCount >= 3)
      return res
        .status(429)
        .json({ message: "Too many attempts. Try again tomorrow." });

    const { rawToken, hashed } = generateVerificationToken();
    user.verificationToken = hashed;
    user.verificationTokenExpires = Date.now() + 15 * 60 * 1000;
    user.resendCount += 1;
    await user.save();

    const link = `${
      process.env.CLIENT_URL
    }/verify?token=${rawToken}&email=${encodeURIComponent(user.email)}`;
    await sendVerificationEmail(user.email, link);

    return res
      .status(401)
      .json({ message: "Verification required. Check email.", resend: true });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch)
    return res
      .status(401)
      .json({ success: false, message: "Incorrect password." });

  const token = generateToken(user._id.toString());

  res.setHeader("Set-Cookie", createAuthCookie(token));
  return res.status(200).json({
    success: true,
    message: "Logged in successfully.",
    user: buildUserResponse(user),
    token,
  });
});

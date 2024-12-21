import React, { useState } from "react";
import OtpInput from "otp-input-react";
import { auth } from "../../Config/firebase";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";

const OTP = () => {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  function onCaptchaVerify() {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        auth,
        "recaptcha-container",
        {
          size: "invisible",
          callback: (response) => {
            onSignUp();
          },
          "expired-callback": () => {
            // Response expired. Ask user to solve reCAPTCHA again.
            // ...
          },
        },
        auth
      );
    }
  }
  const onSignUp = () => {
    setLoading(true);
    onCaptchaVerify();

    const appVerifier = window.recaptchaVerifier;

    const phoneNumber = "+923102647209";
    signInWithPhoneNumber(auth, phoneNumber, appVerifier)
      .then((confirmationResult) => {
        // SMS sent. Prompt user to type the code from the message, then sign the
        // user in with confirmationResult.confirm(code).
        window.confirmationResult = confirmationResult;
        setLoading(false);
        toast.success("Code Sent");
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };
  return (
    <div className="w-screen h-screen pt-16 bg-[#1E2021] flex  justify-center items-center">
      <div id="recaptcha-container"></div>
      <div className="max-sm:w-10/12 flex flex-col  items-center h-72 bg-[#2c2f2f] rounded-xl py-5">
        <h1 className="text-3xl text-center font-semibold text-white">
          Verfication
        </h1>
        <p className="text-lg w-10/12 mx-2 text-white my-1 text-center">
          Enter the 6-digit code sent to your phone number
        </p>
        {/* <data va></data> */}
        <OtpInput
          OTPLength={6}
          value={otp}
          onChange={setOtp}
          otpType="number"
          disabled={false}
          autoFocus
          className="otp-container"
        ></OtpInput>
        <button
          className="bg-orange-500 w-10/12 h-12 font-bold text-white hover:scale-105 transition-all duration-300 rounded-md my-4 py-3 text-[1.1rem]"
          onClick={onSignUp}
        >
          <span> Verify OTP</span>
        </button>
      </div>
    </div>
  );
};

export default OTP;

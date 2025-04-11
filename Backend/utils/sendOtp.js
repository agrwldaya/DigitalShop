// import twilio from 'twilio';

// const client = new twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);

// const sendOTP = async (mobile, otp) => {
//   console.log(otp)
//     try {
//         const message = await client.messages.create({
//             body: `Your OTP code is ${otp}`,
//             from: process.env.TWILIO_PHONE,
//             to: `+91${mobile}`, 
//         });
//         return true;
//     } catch (error) {
//         console.error("Error sending OTP:", error);
//         throw error;
//     }
// };
// export default sendOTP;

 import axios from 'axios'

/**
 * Function to send OTP via Fast2SMS
 * @param {string} phoneNumber - Recipient phone number (without country code for India)
 * @param {string} otp - OTP to send
 * @returns {Promise} - Resolves with the response from Fast2SMS
 */

// const sendOTP = async (phoneNumber, otp) => {
//     try {
//         const response = await axios.post('https://www.fast2sms.com/dev/bulkV2', {
//             route: 'otp',
//             message: `Your OTP is ${otp}`,
//             language: 'english',
//             numbers: phoneNumber
//         }, {
//             headers: { 
//                 authorization: process.env.FAST2SMS_API_KEY
//             }
//         });

//         console.log('OTP Sent:', response.data);
//         return true;
//     } catch (error) {
//         console.error('Error sending OTP:', error.response?.data || error.message);
//         throw error;
//     }
// };

const sendOTP = async function sendOTP(phone,otp) {
    try {
        const response = await axios.get(`https://2factor.in/API/V1/${process.env.Factor_api}/SMS/${phone}/${otp}`);
        if (response.data.Status === 'Success') {
            return { success: true, otpSessionId: response.data.Details };  
        } else {
            console.error('Error Sending OTP:', response.data);
            return { success: false, error: response.data };
        }
    } catch (error) {
        console.error('API Error:', error.message);
        return { success: false, error: error.message };
    }
}

export default sendOTP;

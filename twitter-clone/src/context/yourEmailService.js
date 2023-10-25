import emailjs from "@emailjs/browser";
// import { db } from "./firebase";

function sendEmailNotification  (email , {message})  {
    console.log("Sending email notification...");
  const templateParams = {
    from_name: "Twitter",
    to_name: "Akshat Gupta",
    from_email: "akshatgtc@gmail.com",
    to_email: email,
    message: message,
  };

  emailjs
    .send(
      "service_m5wpqnq",
      "template_xk3pp1q",
      templateParams,
      "bKs4oP1IZMlG27n--"
    )
    .then((response) => {
      console.log("Email sent successfully:", response);
    })
    .catch((error) => {
      console.error("Error sending email:", error);
    });
};

// const blockAccount = (email) => {
//   // Code to update user account status to 'blocked' in the database
//   db.collection("users")
//     .doc(email)
//     .update({
//       status: "blocked",
//     })
//     .then(() => {
//       console.log(`Account with email ${email} is blocked.`);
//     })
//     .catch((error) => {
//       console.error(`Error blocking account: ${error}`);
//     });
// };

// const unblockAccount = (email) => {
//   // Code to update user account status to 'active' in the database
//   db.collection("users")
//     .doc(email)
//     .update({
//       status: "active",
//     })
//     .then(() => {
//       console.log(`Account with email ${email} is unblocked.`);
//     })
//     .catch((error) => {
//       console.error(`Error unblocking account: ${error}`);
//     });
// };

export {
  sendEmailNotification,
  // blockAccount,
  // unblockAccount
};
import { admin } from "firebase-admin";
try {
  admin.initializeApp({
    credential: admin.credential.cert(
      JSON.parse(process.env.FIREBASE_ADMIN_JSON)
    ),
  });
} catch (err) {
  //console.log(err);
}

export default admin;

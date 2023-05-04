import DbConnect from "@/config/databse";
import { mainAuth } from "@/middleware/isMainAuth";
import PayDetails from "@/models/PayDetails";

const handler = async (req, res) => {
  const { user } = req.auth;
  if (req.method === "POST") {
    try {
      await DbConnect();
      const { paymentType, paymentDetails } = req.body;

      const newPaymentDetails = new PayDetails({
        user: user._id,
        paymentType,
        ...paymentDetails,
      });

      const savedPaymentDetails = await newPaymentDetails.save();

      res
        .status(201)
        .json({ success: true, paymentDetails: savedPaymentDetails });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        sussess: false,
        error: error.message,
      });
    }
  } else {
    res.status(405).json({ message: `Method ${req.method} not allowed` });
  }
};

export default mainAuth(handler);

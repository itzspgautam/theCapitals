const mongoose = require("mongoose");

const paymentDetailsSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User not found"],
    },

    paymentType: {
      type: String,
      enum: ["UPI", "BANK"],
      required: true,
    },
    upiId: {
      type: String,
      required: function () {
        return this.paymentType === "UPI";
      },
    },

    accountHolder: {
      type: String,
      required: function () {
        return this.paymentType === "BANK";
      },
    },
    bankName: {
      type: String,
      required: function () {
        return this.paymentType === "BANK";
      },
    },
    accountNumber: {
      type: String,
      required: function () {
        return this.paymentType === "BANK";
      },
    },
    IFSCCode: {
      type: String,
      required: function () {
        return this.paymentType === "BANK";
      },
    },
  },
  { timestamps: true }
);

// Custom error message for validation
paymentDetailsSchema.post("validate", function (error, doc, next) {
  if (error) {
    const errorMessage = Object.values(error.errors)
      .map((err) => err.message)
      .join(",");
    next(new Error(errorMessage.split(",")[0]));
  } else {
    next();
  }
});

export default mongoose.models.PaymentDetail ||
  mongoose.model("PaymentDetail", paymentDetailsSchema);

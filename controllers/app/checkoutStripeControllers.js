const stripe = require("stripe")("sk_test_sLqySDO8sxRfgiWmEfBkz6GX00vXG9Mxo4");
const uuid = require("uuid/v4");

exports.checkoutViaCard = async (req, res) => {
  let error;
  let status;
  try {
    const { user, token } = req.query;

    const customer = await stripe.customers.create({
      email: token.email,
      source: token.id
    });

    const idempotency_key = uuid();
    const charge = await stripe.charges.create(
      {
        amount: user.total * 100,
        currency: "rs",
        customer: customer.id,
        receipt_email: token.email,
        shipping: {
          name: user.firstName,
          address: {
            line2: user.streetAddress,
            city: user.city,
            country: user.country,
            postal_code: user.zipcode
          }
        }
      },
      {
        idempotency_key
      }
    );

    console.log("Charge:", { charge });

    status = "success";
  } catch (error) {
    console.error("Error:", error);
    status = "failure";
  }

  res.json({ error, status });
};

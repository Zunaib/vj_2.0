const stripe = require("stripe")("sk_test_sLqySDO8sxRfgiWmEfBkz6GX00vXG9Mxo4");
const uuid = require("uuid/v4");

exports.checkout = async (req, res) => {
  const cutomer = await stripe.cutomers.create({
    email: token.email,
    source: token.id
  });

  const idempotency_key = uuid();
  const charge = await stripe.charges.create(
    {
      amount: product.price * 100,
      currency: "usd",
      customer: customer.id,
      receipt_email: token.email,
      description: `Purchased the ${product.name}`,
      shipping: {
        name: token.card.name,
        address: {
          line1: token.card.address_line1,
          line2: token.card.address_line2,
          city: token.card.address_city,
          country: token.card.address_country,
          postal_code: token.card.address_zip
        }
      }
    },
    {
      idempotency_key
    }
  );
};

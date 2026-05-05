const processPayment = async (req, res) => {
  try {
    const { method, amount, name } = req.body;

    if (!method) {
      return res.status(400).json({ success: false, message: 'Payment method is required' });
    }

    // Simulate payment processing delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Simulate ~95% success rate for demo
    const success = Math.random() > 0.05;

    if (!success) {
      return res.status(400).json({ success: false, message: 'Payment declined. Please try again.' });
    }

    const transactionId = 'TXN' + Date.now() + Math.floor(Math.random() * 1000);

    return res.json({
      success: true,
      message: 'Payment processed successfully',
      transactionId,
      method,
      amount: amount || 499,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Payment processing error' });
  }
};

module.exports = { processPayment };
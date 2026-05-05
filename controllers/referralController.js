const Referral = require('../models/referralModel');

// Seed some referral IDs for demo
const seedReferrals = async () => {
  const count = await Referral.countDocuments();
  if (count === 0) {
    await Referral.insertMany([
      { referralId: 'REF001', isActive: true },
      { referralId: 'REF002', isActive: true },
      { referralId: 'REF003', isActive: true },
      { referralId: 'DEMO2024', isActive: true },
      { referralId: 'PASSPORT01', isActive: true },
    ]);
    console.log('Seeded demo referral IDs');
  }
};
seedReferrals();

const verifyReferral = async (req, res) => {
  try {
    const { referralId } = req.body;
    if (!referralId) {
      return res.status(400).json({ success: false, message: 'Referral ID is required' });
    }

    const referral = await Referral.findOne({ referralId: referralId.trim().toUpperCase() });

    if (!referral) {
      return res.status(404).json({ success: false, message: 'Invalid Referral ID. Please check and try again.' });
    }

    if (!referral.isActive) {
      return res.status(400).json({ success: false, message: 'This Referral ID has been deactivated.' });
    }

    return res.json({ success: true, message: 'Referral ID verified successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error during verification' });
  }
};

module.exports = { verifyReferral };
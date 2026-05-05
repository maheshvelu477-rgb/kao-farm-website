const Referral = require('../models/referralModel');

const seedReferrals = async () => {
  const count = await Referral.countDocuments();

  if (count === 0) {
    await Referral.insertMany([
      { referralId: 'REF001' },
      { referralId: 'REF002' },
      { referralId: 'DEMO2024' },
      { referralId: 'PASSPORT01' },
    ]);

    console.log("✅ Referral data seeded");
  }
};

module.exports = seedReferrals;
const cron = require('node-cron');
const mongoose = require('mongoose');
const userModel = require('../Models/user'); // adjust the path to your model

// Schedule a job to run at midnight every day
cron.schedule('0 0 * * *', async () => {
  try {
    const users = await userModel.find({});
    for (const user of users) {
      user.remainingCalories = user.dailyCal;
      await user.save();
    }
    console.log("Reset remainingCalories for all users to their dailyCal.");
  } catch (err) {
    console.error("Error resetting calories:", err);
  }
});


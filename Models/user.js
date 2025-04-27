const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    username: {
        type : String,
        required : true
    },
    email : {
        type: String,
      required: true,
      unique: true,
    },
    age : {
      type: Number,
      required: function() { return this.role === 'Consommateur'; }
    },
    sex : {
      type :String,
      enum : ["male", "female"],
      required: function() { return this.role === 'Consommateur'; }
    },
    height : {
      type: Number,
      required: function() { return this.role === 'Consommateur'; }
    },
    weight : {
      type: Number,
      required : true
    },
    password: {
            type: String,
            required: true,
    },
    dailyActivity: {
      type: String,
      enum: [
        'Student',
        'Intellectual Work',
        "Housework",
        'Light Manual Work',
        'Heavy Manual Work',
        'Moderate Manual Work',
        'Athlete',
      ],
      required: function() { return this.role === 'Consommateur'; }
    },
    goal: {
      type: String,
      enum: ['Maintain', 'Lose Weight', 'Gain Weight'],
      required: function() { return this.role === 'Consommateur'; }
    },
    role: {
        type: String,
        enum: ["Consommateur", "Producteur", "Agriculteur",],
      },
      coordinates: {
        type: [Number],
        required: true,
        index: "2dsphere",
      },
      dailyCal : {
        type : Number,
      }
          
      
}, { timestamps: true });

userSchema.index({ location: "2dsphere" });

module.exports = mongoose.model("user",userSchema);
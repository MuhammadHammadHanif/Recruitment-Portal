const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Company Schema
const CompanySchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  companyname: {
    type: String,
    required: true
  },
  establishdate: {
    type: Date,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  website: {
    type: String
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  services: {
    type: [String],
    required: true
  },
  annualsales: {
    type: String
  },
  noofemployees: {
    type: String
  },
  partners: {
    type: [String]
  },
  additionaldescription: {
    type: String
  },
  social: {
    twitter: {
      type: String
    },
    facebook: {
      type: String
    },
    linkedin: {
      type: String
    },
    instagram: {
      type: String
    }
  },
  jobsposting: [
    {
      companyid: {
        type: Schema.Types.ObjectId,
        ref: "companies"
      },
      jobtitle: {
        type: String,
        required: true
      },
      jobdescription: {
        type: String,
        required: true
      },
      duties: {
        type: [String],
        required: true
      },
      skills: {
        type: [String],
        required: true
      },
      education: {
        type: String,
        required: true
      },
      experience: {
        type: String,
        required: true
      },
      salary: {
        type: String,
        default: "Handsome Salary Package",
        required: true
      },
      email: {
        type: String,
        required: true
      },
      location: {
        type: String,
        required: true
      },
      postingstartdate: {
        type: Date,
        default: Date.now()
      },
      postingenddate: {
        type: Date
      },
      jobapplied: [
        {
          user: {
            type: Schema.Types.ObjectId,
            ref: "users"
          },
          jobid: {
            type: Schema.Types.ObjectId
          },
          createdAt: {
            type: Date,
            default: Date.now()
          }
        }
      ],
      createdAt: {
        type: Date,
        default: Date.now()
      }
    }
  ],
  createdAt: {
    type: Date,
    default: Date.now()
  }
});

module.exports = Company = mongoose.model("companies", CompanySchema);

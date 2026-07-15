const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide a project name'],
      trim: true,
      maxlength: [100, 'Project name cannot exceed 100 characters']
    },
    slug: {
      type: String,
      required: [true, 'Please provide a slug'],
      unique: true,
      lowercase: true,
      trim: true
    },
    tagline: {
      type: String,
      trim: true,
      maxlength: [150, 'Tagline cannot exceed 150 characters']
    },
    description: {
      type: String,
      required: [true, 'Please provide a description'],
      trim: true
    },
    status: {
      type: String,
      enum: ['Upcoming', 'Ongoing', 'Completed'],
      default: 'Upcoming'
    },
    heroImage: {
      type: String,
      required: [true, 'Please provide a hero image URL']
    },
    gallery: [
      {
        type: String,
        trim: true
      }
    ],
    amenities: [
      {
        type: String,
        trim: true
      }
    ],
    connectivity: [
      {
        destination: {
          type: String,
          required: true,
          trim: true
        },
        time: {
          type: String,
          required: true,
          trim: true
        },
        icon: {
          type: String,
          trim: true
        }
      }
    ]
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Project', projectSchema);

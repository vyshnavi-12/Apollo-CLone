// models/Doctor.js
import mongoose from 'mongoose';

const DoctorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide the doctor name'],
    maxlength: [100, 'Name cannot be more than 100 characters'],
  },
  designation: {
    type: String,
    required: [true, 'Please provide the doctor designation'],
    default: 'General Practitioner',
  },
  experience: {
    type: Number,
    required: [true, 'Please provide years of experience'],
  },
  qualifications: {
    type: [String],
    required: [true, 'Please provide at least one qualification'],
  },
  location: {
    type: String,
    required: [true, 'Please provide location'],
  },
  facility: {
    type: String,
    required: [true, 'Please provide facility name'],
    default: 'Apollo 24|7 Clinic',
  },
  region: {
    type: String,
    required: [true, 'Please provide region'],
  },
  fees: {
    type: Number,
    required: [true, 'Please provide consultation fees'],
  },
  cashback: {
    type: Number,
    default: 0,
  },
  languages: {
    type: [String],
    default: ['English'],
  },
  consultMode: {
    type: [String],
    default: ['Online Consult'],
  },
  rating: {
    type: Number,
    min: 0,
    max: 100,
    default: 0,
  },
  patientCount: {
    type: Number,
    default: 0,
  },
  availableIn: {
    type: Number,
    default: 5,
  },
  profileImage: {
    type: String,
    default: '/placeholder-doctor.png',
  }
}, {
  timestamps: true, // Adds createdAt and updatedAt
});

// Add indexes for faster filtering
DoctorSchema.index({ facility: 1 });
DoctorSchema.index({ location: 1 });
DoctorSchema.index({ fees: 1 });
DoctorSchema.index({ experience: 1 });

export default mongoose.models.Doctor || mongoose.model('Doctor', DoctorSchema);
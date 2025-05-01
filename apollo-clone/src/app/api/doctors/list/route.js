import dbConnect from '@/lib/dbConnect';
import Doctor from '@/models/Doctor';

export async function GET(request) {
  try {
    await dbConnect();
    const { searchParams } = new URL(request.url);

    // Pagination
    const page = parseInt(searchParams.get('page')) || 1;
    const limit = parseInt(searchParams.get('limit')) || 10;
    const skip = (page - 1) * limit;

    // Base query
    const query = {};

    // Experience Filter
    const minExp = searchParams.get('minExp');
    const maxExp = searchParams.get('maxExp');

    if (minExp && maxExp) {
      query.experience = { $gte: parseInt(minExp), $lte: parseInt(maxExp) };
    } else if (minExp) {
      query.experience = { $gte: parseInt(minExp) };
    } else if (maxExp) {
      query.experience = { $lte: parseInt(maxExp) };
    }

    // Fees Filter
    const minFees = searchParams.get('minFees');
    const maxFees = searchParams.get('maxFees');

    if (minFees && maxFees) {
      query.fees = { $gte: parseInt(minFees), $lte: parseInt(maxFees) };
    } else if (minFees) {
      query.fees = { $gte: parseInt(minFees) };
    } else if (maxFees) {
      query.fees = { $lte: parseInt(maxFees) };
    }

    // Language Filter 
    const language = searchParams.get('language');
    if (language) {
      // Split the comma-separated string into an array
      const languagesArray = language.split(',');
      query.languages = { $in: languagesArray };
    }

    // Consult Mode Filter
    const consultMode = searchParams.get('consultMode');
    if (consultMode) {
      query.consultMode = { $in: [consultMode] };
    }

    // Facility Filter 
    const facility = searchParams.get('facility');
    const facilityType = searchParams.get('facilityType');
    
    if (facility === 'Apollo Hospital') {
      query.facility = 'Apollo 24|7 Clinic';
    } else if (facilityType === 'otherClinics') {
      // This will show all clinics that are not Apollo Hospital
      query.facility = { $ne: 'Apollo 24|7 Clinic' };
    }

    // Location Filter
    const location = searchParams.get('location');
    if (location) {
      query.location = location;
    }

    // Fetch data
    const doctors = await Doctor.find(query).skip(skip).limit(limit).lean();
    const total = await Doctor.countDocuments(query);
    const totalPages = Math.ceil(total / limit);

    return Response.json({
      success: true,
      data: doctors,
      pagination: {
        total,
        page,
        limit,
        pages: totalPages
      }
    });

  } catch (error) {
    console.error('Error fetching doctors:', error.message);
    return Response.json({ success: false, error: 'Failed to fetch doctors', details: error.message }, { status: 500 });
  }
}
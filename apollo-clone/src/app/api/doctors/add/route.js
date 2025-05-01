import dbConnect from '@/lib/dbConnect';
import Doctor from '@/models/Doctor';

export async function POST(request) {
  try {
    await dbConnect();
    const doctorData = await request.json();
    
    const doctor = await Doctor.create(doctorData);
    
    return Response.json({ success: true, data: doctor }, { status: 201 });
  } catch (error) {
    return Response.json({ success: false, error: error.message }, { status: 400 });
  }
}
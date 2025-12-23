import { createVideoRecordInMongo, getUploadSignedUrl, uploadToS3 } from '@/lib/functions/video';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const formData = await request.formData();
        
        const name = formData.get("name") as string;
        const description = formData.get("description") as string;
        const video = formData.get("video") as File;
        const genres = formData.get("genres") as string;

        const { uploadUrl, key } = await getUploadSignedUrl(video.name, video.type); 
        
        const res = await uploadToS3(uploadUrl, video);

        if(res.status == 200) {
            const result = await createVideoRecordInMongo(key, name, genres, description);
            
            return NextResponse.json(
                { success: true, message: "Video uploaded successfully", data: { key, id: result.insertedId } },
                { status: 200 }
            );
        } else {
            return NextResponse.json(
                { success: false, error: "Something went wrong" },
                { status: 500 }
            );
        }
    } catch(err: any) {
        return NextResponse.json(
            { success: false, error: err, message: err?.message },
            { status: 500 }
        );
    }
}
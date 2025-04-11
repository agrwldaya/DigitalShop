'use client';

import { uploadToCloudinary } from "@/components/UploadImage";

export default function Page() {
  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const url = await uploadToCloudinary(file);
    console.log('Uploaded Image URL:', url);
    
  };

  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold mb-2">Upload Image</h2>
      <input type="file" accept="image/*" onChange={handleImageChange} />
    </div>
  );
}

export const uploadToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'my_unsigned_preset'); 
  
    const response = await fetch('https://api.cloudinary.com/v1_1/dqgwpbbmo/image/upload', {
      method: 'POST',
      body: formData,
    });
  
    const data = await response.json();
    return data.secure_url;
  };
  
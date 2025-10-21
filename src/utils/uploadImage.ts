import cloudinary from "../config/cloudinary";

const uploadImage = async function (
    imageUrl: string,
    folder: string = "users/profile_pics"
): Promise<string> {
    if (!imageUrl || !imageUrl.startsWith("http")) {
        throw new Error("Invalid or missing image URL.");
    }

    try {
        const result = await cloudinary.uploader.upload(imageUrl, {
            folder,
            resource_type: "image",
            allowed_formats: ["jpg", "jpeg", "png", "webp"]
        });

        return result.secure_url;
    } catch (error: any) {
        console.error("Cloudinary upload failed:", error.message);
        throw new Error("Image upload failed or URL does not point to a valid image.");
    }
};

export default uploadImage;

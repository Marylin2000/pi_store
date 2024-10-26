// src/services/productService.js
import { ref, set, push } from 'firebase/database';
import { ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../firebase';

// Function to add a product with images
export async function addProductWithImages({ name, price, description, category, thumbnail, images }) {
    try {
        // 1. Upload the thumbnail image to Firebase Storage
        const thumbnailRef = storageRef(storage, `products/thumbnails/${thumbnail.name}`);
        await uploadBytes(thumbnailRef, thumbnail);
        const thumbnailURL = await getDownloadURL(thumbnailRef);

        // 2. Upload each additional image in the images array to Firebase Storage
        const imageUrls = [];
        for (const image of images) {
            const imageRef = storageRef(storage, `products/images/${image.name}`);
            await uploadBytes(imageRef, image);
            const imageURL = await getDownloadURL(imageRef);
            imageUrls.push(imageURL);
        }

        // 3. Generate a new product key and save the product details in Realtime Database
        const productRef = push(ref(db, 'products'));
        await set(productRef, {
            name,
            price,
            description,
            category,
            thumbnail: thumbnailURL,
            images: imageUrls, // Array of URLs for additional images
        });

        console.log('Product added successfully with images');
    } catch (error) {
        console.error('Error adding product:', error);
    }
}

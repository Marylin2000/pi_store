import { ref, set, push, get, onValue } from 'firebase/database';
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
        const productId = productRef.key;

        // 4. Save the product with the generated ID in Realtime Database
        await set(productRef, {
            id: productId, // Include the ID in Realtime Database for consistency
            name,
            price,
            description,
            category,
            thumbnail: thumbnailURL,
            images: imageUrls,
        });

        console.log('Product added successfully with images and consistent ID');
    } catch (error) {
        console.error('Error adding product:', error);
    }
}

// Function to fetch all products from Realtime Database
export async function fetchFireProducts() {
    try {
        const productsRef = ref(db, 'products');
        const snapshot = await get(productsRef);
        
        if (snapshot.exists()) {
            const products = [];
            snapshot.forEach((childSnapshot) => {
                products.push({
                    id: childSnapshot.key, 
                    ...childSnapshot.val()
                });
            });
            console.log('Fetched products:', products);
            return products;
        } else {
            console.log('No products found');
            return [];
        }
    } catch (error) {
        console.error('Error fetching products:', error);
    }
}

// Real-time listener for products in Realtime Database (optional)
export function subscribeToProducts(onProductsChange) {
    const productsRef = ref(db, 'products');
    onValue(productsRef, (snapshot) => {
        const products = [];
        snapshot.forEach((childSnapshot) => {
            products.push({
                id: childSnapshot.key, 
                ...childSnapshot.val()
            });
        });
        onProductsChange(products);
    });
}

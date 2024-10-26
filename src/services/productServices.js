import { ref, set, push } from 'firebase/database';
import { ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../firebase';
import { getDocs, collection, onSnapshot } from 'firebase/firestore';
import { firestore } from '../firebase';


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

const testFirestoreConnection = async () => {
    try {
      const docRef = doc(firestore, "products", "sampleDocId"); // Replace with an actual doc ID
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
      } else {
        console.log("No such document!");
      }
    } catch (error) {
      console.error("Firestore connection test failed:", error);
    }
  };
  
  testFirestoreConnection();

export const fetchFireProducts = (setProducts) => {
    try {
      const productsCollection = collection(firestore, 'products');
  
      // Set up the listener with `onSnapshot`
      const unsubscribe = onSnapshot(productsCollection, (querySnapshot) => {
        const productsArray = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setProducts(productsArray);
      });
  
      // Return `unsubscribe` to clean up the listener when it's no longer needed
      return unsubscribe;
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };
import { 
  doc, 
  onSnapshot, 
  setDoc, 
  getDoc 
} from 'firebase/firestore';
import { db } from './firebase';
import { AppSyncData, Batch, AdvertisementBanner } from '../types';
import { fetchAppState } from './api';

const APP_DATA_DOC = 'global_app_state';

// Listen to real-time changes from Firestore passively
export function subscribeToRealtimeAppState(
  onUpdate: (data: AppSyncData) => void,
  onError?: (err: Error) => void
): () => void {
  try {
    const docRef = doc(db, 'app_data', APP_DATA_DOC);
    const unsubscribe = onSnapshot(
      docRef,
      async (snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.data() as AppSyncData;
          if (data && Array.isArray(data.batches)) {
            onUpdate(data);
            return;
          }
        }
        // If Firestore doc is not initialized yet, seed it from server initial state
        try {
          const fallbackData = await fetchAppState();
          if (fallbackData) {
            onUpdate(fallbackData);
            // Seed Firestore with initial state in background
            await setDoc(docRef, fallbackData);
          }
        } catch (e: any) {
          if (onError) onError(e);
        }
      },
      (error) => {
        console.warn('Firestore snapshot listener error, using HTTP state fallback:', error);
        if (onError) onError(error);
      }
    );
    return unsubscribe;
  } catch (error: any) {
    console.warn('Firestore subscription failed, using local polling:', error);
    return () => {};
  }
}

// Push updated batch or banner state to Firestore in background
export async function pushAppStateToFirestore(data: AppSyncData): Promise<void> {
  try {
    const docRef = doc(db, 'app_data', APP_DATA_DOC);
    await setDoc(docRef, data);
  } catch (err) {
    console.error('Failed to push state to Firestore:', err);
  }
}

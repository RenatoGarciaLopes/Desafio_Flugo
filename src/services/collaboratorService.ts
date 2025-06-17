import { collection, getDocs } from 'firebase/firestore';
import { db } from './firebase.ts';
import type { Employee } from '../types/employee';

export async function getCollaborators(): Promise<Employee[]> {
    const querySnapshot = await getDocs(collection(db, "collaborators"));

    const collaborators = querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
    })) as Employee[];

    return collaborators;
}
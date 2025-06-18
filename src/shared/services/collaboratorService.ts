import { collection, getDocs, addDoc, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from './firebase.ts';
import type { Employee } from '../types/employee.ts';

/**
 * Busca todos os colaboradores no banco de dados.
 * @returns Uma promessa que resolve para um array de colaboradores.
 */
export async function getCollaborators(): Promise<Employee[]> {
  try {
    const querySnapshot = await getDocs(collection(db, "collaborators"));
    const collaborators = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
    })) as Employee[];
    return collaborators;
  } catch (error) {
    console.error("Erro ao buscar colaboradores: ", error);
    throw new Error('Falha ao buscar colaboradores.');
  }
}

/**
 * Adiciona um novo colaborador ao banco de dados.
 * O ID é gerado automaticamente pelo Firestore.
 * @param collaboratorData - Os dados do colaborador a serem adicionados (sem o ID).
 */
export async function addCollaborator(collaboratorData: Omit<Employee, 'id'>): Promise<void> {
  try {
    await addDoc(collection(db, 'collaborators'), collaboratorData);
    console.log('Colaborador adicionado com sucesso!');
  } catch (error) {
    console.error("Erro ao adicionar colaborador: ", error);
    throw new Error('Falha ao registrar o colaborador.');
  }
}

/**
 * Atualiza os dados de um colaborador existente.
 * @param id - O ID do colaborador a ser atualizado.
 * @param dataToUpdate - Um objeto com os campos a serem atualizados.
 */
export async function updateCollaborator(id: string, dataToUpdate: Partial<Employee>): Promise<void> {
  try {
    const collaboratorRef = doc(db, 'collaborators', id);
    await updateDoc(collaboratorRef, dataToUpdate);
    console.log('Colaborador atualizado com sucesso!');
  } catch (error) {
    console.error("Erro ao atualizar colaborador: ", error);
    throw new Error('Falha ao atualizar o colaborador.');
  }
}

/**
 * Deleta um colaborador do banco de dados.
 * @param id - O ID do colaborador a ser deletado.
 */
export async function deleteCollaborator(id: string): Promise<void> {
  try {
    const collaboratorRef = doc(db, 'collaborators', id);
    await deleteDoc(collaboratorRef);
    console.log('Colaborador deletado com sucesso!');
  } catch (error) {
    console.error("Erro ao deletar colaborador: ", error);
    throw new Error('Falha ao deletar o colaborador.');
  }
}
// src/shared/services/collaboratorService.ts
import { collection, getDocs, addDoc, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from './firebase.ts';
import type { Employee } from '../types/employee.ts';

// Função auxiliar para adicionar timeout a uma promessa
function withTimeout<T>(promise: Promise<T>, ms: number): Promise<T> {
  return new Promise((resolve, reject) => {
    const timeoutId = setTimeout(() => {
      // Rejeita com um erro específico de timeout
      reject(new Error('Tempo limite da requisição excedido. Verifique sua conexão.'));
    }, ms);

    promise
      .then(res => {
        clearTimeout(timeoutId); // Limpa o timeout se a promessa resolver
        resolve(res);
      })
      .catch(err => {
        clearTimeout(timeoutId); // Limpa o timeout se a promessa rejeitar
        reject(err);
      });
  });
}

/**
 * Busca todos os colaboradores no banco de dados.
 * @returns Uma promessa que resolve para um array de colaboradores.
 */
export async function getCollaborators(): Promise<Employee[]> {
  try {
    // Aplica o timeout à operação getDocs
    const querySnapshot = await withTimeout(getDocs(collection(db, "collaborators")), 15000); // Ex: 15 segundos de timeout
    const collaborators = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    })) as Employee[];
    return collaborators;
  } catch (error) {
    console.error("Erro ao buscar colaboradores: ", error);
    // Propaga o erro (incluindo o de timeout)
    throw error; // Use 'throw error' para manter o tipo de erro original
  }
}

/**
 * Adiciona um novo colaborador ao banco de dados.
 * O ID é gerado automaticamente pelo Firestore.
 * @param collaboratorData - Os dados do colaborador a serem adicionados (sem o ID).
 */
export async function addCollaborator(collaboratorData: Omit<Employee, 'id'>): Promise<void> {
  try {
    // Aplica o timeout à operação addDoc
    await withTimeout(addDoc(collection(db, 'collaborators'), collaboratorData), 10000); // Ex: 10 segundos de timeout
    console.log('Colaborador adicionado com sucesso!');
  } catch (error) {
    console.error("Erro ao adicionar colaborador: ", error);
    // Propaga o erro (incluindo o de timeout)
    throw error; // Use 'throw error' para manter o tipo de erro original
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
    // Aplica o timeout à operação updateDoc
    await withTimeout(updateDoc(collaboratorRef, dataToUpdate), 10000); // Ex: 10 segundos de timeout
    console.log('Colaborador atualizado com sucesso!');
  } catch (error) {
    console.error("Erro ao atualizar colaborador: ", error);
    // Propaga o erro (incluindo o de timeout)
    throw error; // Use 'throw error' para manter o tipo de erro original
  }
}

/**
 * Deleta um colaborador do banco de dados.
 * @param id - O ID do colaborador a ser deletado.
 */
export async function deleteCollaborator(id: string): Promise<void> {
  try {
    const collaboratorRef = doc(db, 'collaborators', id);
    // Aplica o timeout à operação deleteDoc
    await withTimeout(deleteDoc(collaboratorRef), 10000); // Ex: 10 segundos de timeout
    console.log('Colaborador deletado com sucesso!');
  } catch (error) {
    console.error("Erro ao deletar colaborador: ", error);
    // Propaga o erro (incluindo o de timeout)
    throw error; // Use 'throw error' para manter o tipo de erro original
  }
}
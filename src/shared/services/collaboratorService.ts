import { collection, getDocs, addDoc, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from './firebase.ts';
import type { Funcionario } from '../types/funcionario.ts';

// Função auxiliar para adicionar timeout a uma promessa
function withTimeout<T>(promise: Promise<T>, ms: number): Promise<T> {
  return new Promise((resolve, reject) => {
    const timeoutId = setTimeout(() => {
      reject(new Error('Tempo limite da requisição excedido. Verifique sua conexão.'));
    }, ms);

    promise
      .then(res => {
        clearTimeout(timeoutId);
        resolve(res);
      })
      .catch(err => {
        clearTimeout(timeoutId); 
        reject(err);
      });
  });
}

/**
 * Busca todos os colaboradores no banco de dados.
 * @returns Uma promessa que resolve para um array de colaboradores.
 */
export async function getCollaborators(): Promise<Funcionario[]> {
  try {
    const querySnapshot = await withTimeout(getDocs(collection(db, "collaborators")), 15000); // Ex: 15 segundos de timeout
    const collaborators = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    })) as Funcionario[];
    return collaborators;
  } catch (error) {
    console.error("Erro ao buscar colaboradores: ", error);
    throw error; 
  }
}

/**
 * Adiciona um novo colaborador ao banco de dados.
 * O ID é gerado automaticamente pelo Firestore.
 * @param collaboratorData - Os dados do colaborador a serem adicionados (sem o ID).
 */
export async function addCollaborator(collaboratorData: Omit<Funcionario, 'id'>): Promise<void> {
  try {
    await withTimeout(addDoc(collection(db, 'collaborators'), collaboratorData), 10000);
    console.log('Colaborador adicionado com sucesso!');
  } catch (error) {
    console.error("Erro ao adicionar colaborador: ", error);
    throw error; 
  }
}



// //Restante da logica do crud nao implementada

// /**
//  * Atualiza os dados de um colaborador existente
//  * @param id 
//  * @param dataToUpdate 
//  */
// export async function updateCollaborator(id: string, dataToUpdate: Partial<Funcionario>): Promise<void> {
//   try {
//     const collaboratorRef = doc(db, 'collaborators', id);
//     await withTimeout(updateDoc(collaboratorRef, dataToUpdate), 10000); // Ex: 10 segundos de timeout
//     console.log('Colaborador atualizado com sucesso!');
//   } catch (error) {
//     console.error("Erro ao atualizar colaborador: ", error);
//     throw error; 
//   }
// }

// /**
//  * Deleta um colaborador do banco de dados.
//  * @param id - O ID do colaborador a ser deletado.
//  */
// export async function deleteCollaborator(id: string): Promise<void> {
//   try {
//     const collaboratorRef = doc(db, 'collaborators', id);
//     await withTimeout(deleteDoc(collaboratorRef), 10000);
//     console.log('Colaborador deletado com sucesso!');
//   } catch (error) {
//     console.error("Erro ao deletar colaborador: ", error);
//     throw error; 
//   }
// }
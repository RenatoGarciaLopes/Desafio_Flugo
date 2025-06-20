export interface Funcionario {
    id: string;
    name: string;
    email: string;
    department: string;
    status: 'Ativo' | 'Inativo'; 
    avatarUrl?: string;
}
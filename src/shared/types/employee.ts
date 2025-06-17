export interface Employee {
    id: string;
    name: string;
    email: string;
    department: string;
    status: 'Ativo' | 'Inativo'; 
    avatarUrl?: string;
}
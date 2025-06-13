export interface Categories{
    id: string;
    name: string;
    slug: string;
    description: string;
    color: string;
    blogs?: string[];
    createdAt: string;
    updatedAt: string;
}

export interface Tags{
    id: string;
    name: string;
    slug: string;
    description: string;
    color: string;
    blogs?: string[];
    createdAt: string;
    updatedAt: string;
}
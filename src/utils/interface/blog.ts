export interface Blog {
    data: [
        {
            image: string;
            created?: number;
            author: string;
            ___class?: string;
            title: string;
            ownerId?: string | null;
            updated?: number | null;
            objectId?: string;
            content: string;
        }
    ];
    status?: number;
}
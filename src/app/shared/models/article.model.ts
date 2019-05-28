export class Article {
    uuid?: string = null;
    createdDate?: Date = null;
    text: string = null;
    title: string = null;
    imageUrl: string = null;
    isPublic: boolean;
    ownerUuid?: string = null;
    ownerEmail?: string = null;
    ownerImage?: string = null;
    ownerFirstName?: string = null;
    ownerLastName?: string = null;
}

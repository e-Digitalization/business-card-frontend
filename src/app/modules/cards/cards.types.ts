export type CardTagSummary = {
    id: number;
    tagCode: string;
    active: boolean;
};

export type CardResponse = {
    id: number;
    slug: string;
    fullName: string;
    title: string;
    company: string;
    location: string;
    phone: string;
    email: string;
    website: string;
    whatsapp: string;
    photoUrl: string;
    linkedin: string;
    twitter: string;
    github: string;
    active: boolean;
    tags: CardTagSummary[];
};

export type CardCore = Omit<CardResponse, 'tags'>;

export type CardListItem = {
    card: CardCore;
    tags: CardTagSummary[];
};

export type CardRequest = {
    slug: string;
    fullName: string;
    title: string;
    company: string;
    location: string;
    phone: string;
    email: string;
    website: string;
    whatsapp: string;
    photoUrl: string;
    linkedin: string;
    twitter: string;
    github: string;
    active: boolean;
};

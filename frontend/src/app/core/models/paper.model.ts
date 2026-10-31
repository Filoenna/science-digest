export enum FieldOfStudy {
    ComputerScience = 'Computer Science',
    Medicine = 'Medicine',
    Chemistry = 'Chemistry',
    Biology = 'Biology',
    MaterialsScience = 'Materials Science',
    Physics = 'Physics',
    Geology = 'Geology',
    Psychology = 'Psychology',
    Art = 'Art',
    History = 'History',
    Geography = 'Geography',
    Sociology = 'Sociology',
    Business = 'Business',
    PoliticalScience = 'Political Science',
    Economics = 'Economics',
    Philosophy = 'Philosophy',
    Mathematics = 'Mathematics',
    Engineering = 'Engineering',
    EnvironmentalScience = 'Environmental Science',
    AgriculturalAndFoodSciences = 'Agricultural and Food Sciences',
    Education = 'Education',
    Law = 'Law',
    Linguistics = 'Linguistics'
}

// Reusable array constant derived directly from the enum
export const FIELDS_OF_STUDY: FieldOfStudy[] = Object.values(FieldOfStudy);

export interface PaperSearchQuery {
    query: string;
    fieldsOfStudy?: FieldOfStudy[];
    limit?: number;
}

export interface PaperAuthor {
    authorId: string;
    name: string;
}

// Light model for list results
export interface SimplePaper {
    paperId: string;
    title: string;
    authors: PaperAuthor[];
    abstract?: string;
}

// Complete model for single paper view
export interface Paper extends SimplePaper {
    year?: number;
    url?: string;
    isOpenAccess?: boolean;
    venue?: string;
    pdfUrl?: string;
    fieldsOfStudy?: FieldOfStudy[];
    tldr?: string;
    textAvailability?: string;
}

export interface PaperSearchResponse {
    total: number;
    offset: number;
    data: SimplePaper[];
}
export interface ExamType {
    id: number
    name: string
    slug: string
    description: string
    is_active: number
}

export interface Section {
    id: number
    name: string
    description: string
    created_at: string
    updated_at: string
}

export interface Test {
    id: number
    title: string
    slug: string
    tags: string
    exame_type_id: number
    section_id: number
    duration: string
    units: string
    total_marks: string
    negative_marks: string
    difficult_level: string
    test_type: string
    description: string
    attempts: number | null
    languages: string
    created_at: string
    updated_at: string
    questions?:[]

    exame_type?: ExamType
    section?: Section
}

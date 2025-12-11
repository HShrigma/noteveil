export interface Note{
    id: number;
    title: string;
    content: string;
}
export const tempNotes: Note[] = [
    { id: 1, title: 'API MD Header Note', content: '# H1\n## H2\n### H3' },
    { id: 2, title: 'API MD Stylized', content: 'none\n*italics*\n**bold**\n***bolditalics***' },
    { id: 3, title: 'API MD Specials', content: '### ---\n---\n### *empty*\n' },
    { id: 4, title: 'API MD ulist Note', content: '- l1 \n  - l2' },
];
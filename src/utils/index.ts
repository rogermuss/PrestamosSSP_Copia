const categorySlugMap = {
    1: 'componentes',
    2: 'placas-desarrollo',
    3: 'equipo-medicion',
    4: 'herramientas',
    5: 'cableado-prototipado',
    6: 'sensores-modulos',
    7: 'documentacion-varios'
} as const;

export function getCategorySlug(categoryId: number): string {
    return categorySlugMap[categoryId as keyof typeof categorySlugMap] || 'documentacion-varios';
}

export function getImagePath(imagePath: string) {
    if(imagePath.startsWith('http')) {
        return imagePath;
    }
    return `/products/${imagePath}.jpg`;
}
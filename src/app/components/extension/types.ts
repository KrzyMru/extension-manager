interface ExtensionProps {
    logo: string,
    name: string,
    description: string,
    isActive: boolean,
    onDelete: (name: string) => void,
    onCheck: (name: string) => void,
}

export type { ExtensionProps }
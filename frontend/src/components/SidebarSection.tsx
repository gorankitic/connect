type SidebarSectionProps<T> = {
    label: string;
    items: T[];
    renderItem: (item: T) => React.ReactNode;
    action: React.ReactNode;
}

// Typescript generics <T,>: The comma is needed so TypeScript knows it is a generic type parameter, not JSX tag
const SidebarSection = <T,>({ label, action, items, renderItem }: SidebarSectionProps<T>) => {
    if (items.length === 0) return null;

    return (
        <div className="mt-3 px-5">
            <div className="flex items-center justify-between py-2">
                <p className="text-gray-600 font-semibold uppercase text-sm">
                    {label}
                </p>
                {action}
            </div>

            <div className="space-y-1">
                {items.map(renderItem)}
            </div>
        </div>
    )
}

export default SidebarSection;
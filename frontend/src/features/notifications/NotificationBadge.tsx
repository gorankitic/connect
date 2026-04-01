const NotificationsBadge = ({ count }: { count: number }) => {
    if (!count || count <= 0) return null;

    return (
        <div className="relative flex items-center justify-center ml-auto">
            <span className="absolute size-5 rounded-full bg-blue-400 opacity-75 animate-ping" />
            <span className="relative size-5 rounded-full bg-blue-500 text-white text-xs flex items-center justify-center">
                {count}
            </span>
        </div>
    )
}

export default NotificationsBadge;
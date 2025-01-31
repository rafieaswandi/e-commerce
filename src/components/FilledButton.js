export default function FilledButton({type = "button", className, children}) {
    return (
        <button 
            type={type}
            className={"flex items-center justify-center gap-2 px-4 py-2 bg-dark text-white rounded-full font-medium " + className}
        >
            {children}
        </button>
    );
}
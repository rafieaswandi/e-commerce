export default function CustomInput({ type = "text", id, name, placeholder, required = false, className, onChange = function () { }, value = undefined }) {
    return (
        <input onChange={onChange} value={value} type={type} id={id} name={name} placeholder={placeholder} className={"border border-dark py-2 px-4 rounded-md bg-white/50 " + className} />
    );
}
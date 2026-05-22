
// FormField.tsx
interface FormFieldProps {
    id: string,
    label: string,
    error?: string,
    children: React.ReactNode
}

export function FormField({id,label,error,children}:FormFieldProps){
    return(
        <div>
            <label
              htmlFor={id}
              className=" block text-sm font-medium mb-1.5 text-gray-500"
            >
              {label}
            </label>
            {children}

            {error &&(
                 <p className="mt-1 text-xs text-danger">{error}</p>
            )}
        </div>
    )
}
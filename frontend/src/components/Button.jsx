const Button = ({ 
  children, 
  onClick, 
  label, 
  type = 'button', 
  variant = 'submit',
 }) => {
  const variants = {
    submit: 'bg-amber-50 text-black border-amber-50',
    cancel: 'bg-zinc-50/10 text-white border-zinc-50/10',
  }

  return (
    <button
      type={type}
      onClick={onClick}
      className={`flex flex-row self-end item-center justify-center cursor-pointer px-4 py-3 my-5 border min-w-50 font-medium rounded-md ${variants[variant]}`}
    >
      {children}
      {label}
    </button>
  )
}

export default Button
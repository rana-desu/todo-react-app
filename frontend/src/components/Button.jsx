const Button = ({ children, onClick, label, type}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className="flex flex-row self-end item-center justify-center cursor-pointer px-4 py-3 my-5 border min-w-50 text-black font-medium rounded-md bg-amber-50"
    >
      {children}
      {label}
    </button>
  )
}

export default Button
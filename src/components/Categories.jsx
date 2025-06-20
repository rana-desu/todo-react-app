const Categories = () => {
  const categoryStyles = `
    border border-zinc-50/10 bg-opacity-[0.01] rounded-full 
    my-3 px-6 py-2 mr-2 
    text-white
    hover:bg-white hover:text-black
  `
  
  return (
    <div className="categories">
      <button type="button" className={categoryStyles}>
        home
      </button>
      <button type="button" className={categoryStyles}>
        work
      </button>
      <button type="button" className={categoryStyles}>
        studies
      </button>
    </div>
  )
}

export default Categories
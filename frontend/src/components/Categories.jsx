const Categories = ({ categories }) => {
  const categoryStyles = `
    border border-zinc-50/10 bg-opacity-[0.01] rounded-full 
    my-3 px-6 py-2 mr-2 
    text-white
    hover:bg-white hover:text-black
  `
  
  console.log('categories in component', categories)

  return (
    <div className="categories flex">
      {categories.map(category => (
        <div className={categoryStyles}>
          {category}
        </div>
      ))}
    </div>
  )
}

export default Categories
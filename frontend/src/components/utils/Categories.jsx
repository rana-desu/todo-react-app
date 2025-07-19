const Categories = ({ categories }) => {
  const categoryStyles = `
    border border-zinc-50/10 bg-opacity-[0.01] rounded-full 
    my-3 px-6 py-2 mr-2 
    text-white
  `

  return (
    <div className="categories flex">
      {categories.map((category, index) => (
        <div key={index} className={categoryStyles}>
          {category}
        </div>
      ))}
    </div>
  )
}

export default Categories
import { useState } from 'react'
import useTodoStore from '../store/todoStore'

import AddIcon from '../assets/add.svg?react'

const AddTodo = () => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  const addTodo = useTodoStore((state) => state.addTodo)
  
  const handleSubmit = async (e) => {
    console.log("HANDLE SUBMIT CALLED")
    e.preventDefault()

    try {
      if (title.trim() && description.trim()) {
        await addTodo(title.trim(), description.trim())
        setTitle('')
        setDescription('')
        console.log('changed input field values to default.', title, description)
      } else {
        alert('please enter non-empty inputs.')
      }
    } catch (error) {
      console.error('error while handling AddTodo submission:', error)
    }
  }

  const inputStyles = `p-5 my-2 min-w-2xl border-1 border-gray-500 outline-none rounded-sm w-full`
  const categoryStyles = `border-2 border-white rounded-full px-6 py-2 text-white mr-2 hover:bg-white hover:text-black`

  return (
    <form
      onSubmit={handleSubmit} 
      className="flex flex-col items-center justify-center p-8 w-full border border-gray-500 rounded-[6px]"
    > 
      <div className="flex flex-col items-center">
        <input
          type="text"
          name="title"
          className={inputStyles}
          value={title}
          placeholder="Enter TODO's title"
          onChange={e => {
            setTitle(e.target.value)
            console.log(title);
          }}
          required
        />

        <textarea 
          type="text"
          name="description"
          className={inputStyles}
          value={description}
          placeholder="Enter TODO's description"
          onChange={e => {
            setDescription(e.target.value)
            console.log(description)
          }}
        />
      </div>

      <div className="flex flex-row items-center justify-between min-w-2xl">
        <div className="select-categories">
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
        <button 
          className="flex flex-row self-end item-center justify-center px-4 py-3 my-5 border min-w-50 text-black font-medium rounded-sm btn-grad"
          type="submit"
        >
          <AddIcon className="fill-black mr-2"/>
          <p>add todo!</p>
        </button>
      </div>
    </form>
  )
}

export default AddTodo

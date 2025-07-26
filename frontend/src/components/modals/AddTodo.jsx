import { useState, useRef } from 'react'

import useTodoStore from '../../store/todoStore'
import Modal from './Modal'
import CategoriesDropdown from '../utils/CategoriesDropdown'
import Button from '../Button'
import AddIcon from '../../assets/add.svg?react'


const AddTodo = () => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [categories, setCategories] = useState([])
  const addFormRef = useRef()

  const addTodo = useTodoStore((state) => state.addTodo)
  
  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      if (title.trim() && description && categories) {
        await addTodo(title.trim(), description, categories)
        addFormRef.current.toggleOpened()
        
        setTitle('')
        setDescription('')
        setCategories([])
      } else {
        alert('please enter non-empty inputs.')
      }
    } catch (error) {
      console.error('error while handling AddTodo submission:', error)
    }
  }

  const inputStyles = `p-5 my-2 min-w-2xl border-1 border-zinc-50/10 bg-opacity-[0.01] outline-none rounded-sm w-full`

  return (
    <>
    <Button 
      type="button"
      label="add todo"
      onClick={() => addFormRef.current.toggleOpened()}
    />

    <Modal
      layoutId="add-todo-form"
      buttonLabel="add todo"
      ref={addFormRef}
    >
      <form
        key="add-todo-form"
        onSubmit={handleSubmit}
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

        <div className="flex flex-row items-center justify-between min-w-2xl gap-4">
          <CategoriesDropdown 
            categories={categories}
            setCategories={setCategories}
          />
          
          <div className="flex gap-4">   
            <Button type="button" onClick={() => addFormRef.current.toggleOpened()} variant="cancel">
              <p>cancel</p>
            </Button>

            <Button type="submit">
              <AddIcon className="fill-black mr-2"/>
              <p>add todo!</p>
            </Button>
          </div>
        </div>
      </form>
    </Modal>
    </>
  )
}

export default AddTodo

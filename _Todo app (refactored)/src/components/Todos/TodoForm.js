import { useState } from 'react'
import Button from '../UI/Button'
import styles from './TodoForm.module.css'

function TodoForm({addTodo}) {

    const [inputText, setInputText] = useState('')
    
    const onSubmitHandler = (event) => {
        event.preventDefault()
        addTodo(inputText)
        setInputText('')
    }

    return (
        <div className={styles.todoFormContainer}>
            <form onSubmit = {onSubmitHandler}>
                <div>
                    <input placeholder = "Enter new todo" value={inputText} onChange={event => setInputText(event.target.value)} />
                    <Button type = "submit" title = "Submit" onClick={onSubmitHandler}> Submit </Button> 
                </div>
            </form>
        </div>
        
    )
}

export default TodoForm
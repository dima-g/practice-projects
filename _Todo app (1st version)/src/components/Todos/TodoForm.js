//import { useState } from 'react'
import styles from './TodoForm.module.css'
import Button from '../UI/Button'

function TodoForm({onSubmit}) {

    //const [inputText, setInputText] = useState('')

    return (
        <form onSubmit = {onSubmit}>
            <div className={styles.formContainer}>
                <input placeholder = "Enter new todo" id="todo-create" type="text" /*value={inputText} onChange={event => setInputText(event.target.value)}*//>
                <Button buttonText="Submit"/>
            </div>
        </form>
    )
}

export default TodoForm
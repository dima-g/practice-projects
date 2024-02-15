import { RiDeleteBin2Line, RiRefreshLine } from 'react-icons/ri'
import Button from '../UI/Button'
import styles from './TodoActions.module.css'

function TodoActions({ resetTodos, deleteCompletedTodos, completedTodosExist }) {
    console.log(completedTodosExist)
    return (
        <div className={styles.todoActions}>
            <Button title="Reset todos" onClick={resetTodos}><RiRefreshLine /></Button>
            <Button title="Delete completed todos" onClick={deleteCompletedTodos} disabled={!completedTodosExist}><RiDeleteBin2Line /></Button>
        </div>
    )
}

export default TodoActions
import styles from "./TodoList.module.css"

function TodoList({children}) {

    return (
        <div className={styles.todoList}>
            {children}
        </div>
    )
}

export default TodoList
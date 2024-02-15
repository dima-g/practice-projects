import todoItem from '../../assets/images/todo.png'
import todoTick from '../../assets/images/tick.png'
import todoTrash from '../../assets/images/trash.png'
import todoItemInactive from '../../assets/images/todo_inactive.png'
import todoTickInactive from '../../assets/images/tick_inactive.png'
import todoTrashInactive from '../../assets/images/trash_inactive.png'
import todoTickActive from '../../assets/images/tick_active.png'
import todoTrashActive from '../../assets/images/trash_active.png'
import styles from './Todo.module.css'

function Todo({text, status, deleteAction, completeAction}) {

    const actionIconChange = (imageTag, imageLink) => imageTag.currentTarget.src = imageLink
    console.log(status)

    return (
        <div className={status ? `todo todoColorComplete` : `todo todoColor`}>
            <img className={`item ${styles.todoItem}`} src={status ? todoItemInactive : todoItem} alt='' />
            {text}
            <div className={styles.actionsContainer}>
                <img   
                    className={`trash ${styles.todoAction}`} src={status ? todoTrashInactive : todoTrash} alt='' 
                    onClick = {deleteAction} 
                    onMouseOver={image => actionIconChange(image, todoTrashActive)} 
                    onMouseOut={image => { 
                        image.target.closest(`.todo`).getAttribute('class').includes('Complete') ? 
                            actionIconChange(image, todoTrashInactive) : 
                            actionIconChange(image, todoTrash)}}
                />  
                <img 
                    className={`${styles.todoAction} tick`} src={status ? todoTickInactive : todoTick} alt='' 
                    onClick = {completeAction}
                    onMouseOver={image => actionIconChange(image, todoTickActive)} 
                    onMouseOut={image => { 
                        image.target.closest(`.todo`).getAttribute('class').includes('Complete') ? 
                            actionIconChange(image, todoTickInactive) : 
                            actionIconChange(image, todoTick)}}
                />
            </div>
        </div>
    )
}

export default Todo
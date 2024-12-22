import styles from './List.module.css';

interface ListProps {
    itemsToList: string[]
    listName?: string,
}

const List: React.FC<ListProps> = ({itemsToList, listName}) => {
    return (
        <div className={styles.listContainer}>
            <h3 className={styles.title}>{listName}</h3>
            <ul className={styles.list}>
                {itemsToList ? itemsToList.map((itemName, index) => (<li key={index}>{itemName}</li>)) : "The list is empty"}
            </ul>
        </div>
    )
}

export default List;
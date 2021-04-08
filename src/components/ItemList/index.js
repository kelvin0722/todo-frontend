function ItemList(props){
 return (
     <>
       {props.items.map(item => (
        <li
          key={item.id}
          className="list-group-item d-flex justify-content-between align-items-center"
        >
          <span
            className={`todo-title mr-2 ${
              item.completed ? "completed-todo" : ""
            }`}
            title={item.description}
          >
            {item.title}
          </span>
          <span>
            <button
              className="btn btn-secondary mr-2"
              onClick={() => props.editItem(item)}
            >
              Edit
            </button>
            <button
              className="btn btn-danger"
              onClick={() => props.deleteItem(item)}
            >
              Delete
            </button>
          </span>
        </li>
      ))}
     </>
    )
}

export default ItemList
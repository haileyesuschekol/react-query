import { useState } from "react"
import useTodos from "../hook/useTodos"

const Todos = () => {
  const pageSize = 10
  const [page, setPage] = useState(1)
  const { data, error, isLoading } = useTodos({ page, pageSize })

  if (isLoading) {
    return <p>Loading .....</p>
  }

  if (error) {
    return <p>{error.message}</p>
  }

  return (
    <>
      <h2>Todos</h2>
      {data?.map((todo) => (
        <div key={todo.id}>
          <p>
            {todo.id} {todo.title}
          </p>
        </div>
      ))}
      <button disabled={page === 1} onClick={() => setPage(page - 1)}>
        previous
      </button>
      <button onClick={() => setPage(page + 1)}>next</button>
    </>
  )
}

export default Todos

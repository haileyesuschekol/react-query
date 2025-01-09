import { useQuery } from "@tanstack/react-query"
import axios from "axios"

interface Todo {
  userId: number
  id: number
  title: string
  completed: boolean
}

interface TodoQuery {
  pageSize: number
  page: number
}

const useTodos = (query: TodoQuery) => {
  const fetchData = () =>
    axios
      .get<Todo[]>("https://jsonplaceholder.typicode.com/todos", {
        params: {
          _start: (query.page - 1) * query.pageSize,
          _limit: query.pageSize,
        },
      })
      .then((res) => res.data)

  return useQuery<Todo[], Error>({
    queryKey: ["posts", query],
    queryFn: fetchData,
  })
}

export default useTodos

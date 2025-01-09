import { useQuery } from "@tanstack/react-query"
import axios from "axios"

interface Posts {
  id: number
  userId: number
  title: string
  body: string
}

const usePosts = (userId: number | undefined) => {
  const fetchData = () =>
    axios
      .get<Posts[]>("https://jsonplaceholder.typicode.com/posts", {
        params: {
          userId,
        },
      })
      .then((res) => res.data)

  return useQuery<Posts[], Error>({
    queryKey: userId ? ["user", userId, "posts"] : ["posts"],
    queryFn: fetchData,
  })
}

export default usePosts

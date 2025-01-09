import { useState } from "react"
import usePosts from "../hook/usePosts"

const Posts = () => {
  const [userId, setUserId] = useState<number>()
  const { data, isLoading, error } = usePosts(userId)

  if (isLoading) {
    return <p>Loading ...</p>
  }

  if (error) {
    return <p>{error.message}</p>
  }

  return (
    <>
      <select
        onChange={(e) => setUserId(parseInt(e.target.value))}
        value={userId}
      >
        <option value="">Select...</option>
        <option value={1}>user 1</option>
        <option value={2}>user 2</option>
        <option value={3}>user 3</option>
      </select>
      {data?.map((post) => (
        <div key={post.id}>
          <h3>{post.title}</h3>
          <p>{post.body}</p>
        </div>
      ))}
    </>
  )
}

export default Posts

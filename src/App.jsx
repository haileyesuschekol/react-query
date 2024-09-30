import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

function App() {
  const queryClient = useQueryClient()
  const { data, error, isLoading } = useQuery({
    queryKey: ["post"],
    queryFn: () =>
      fetch("https://jsonplaceholder.typicode.com/posts").then((res) =>
        res.json()
      ),
  })

  const { mutate } = useMutation({
    mutationFn: (newPost) =>
      fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",
        body: JSON.stringify(newPost),
        headers: { "Content-type": "application/json" },
      }).then((res) => res.json()),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["post"] })
    },

    //set on caches
    // onSuccess: (newPost) => {
    //   queryClient.setQueriesData(["posts"], (oldPosts) => [
    //     ...oldPosts,
    //     newPost,
    //   ])
    // },
  })

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error while fetching</div>
  return (
    <div>
      <button
        onClick={() =>
          mutate({
            userId: 2000,
            title: "new Title",
            body: "this is new body",
          })
        }
      >
        Post
      </button>
      {data?.map((post) => {
        return (
          <ul key={post.id}>
            <li>Id: {post.id}</li>
            <li>Title: {post.title}</li>
            <li>Body: {post.body}</li>
          </ul>
        )
      })}
    </div>
  )
}

export default App

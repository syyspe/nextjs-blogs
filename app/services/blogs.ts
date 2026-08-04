// id, title, author, url, and likes
const blogs = [
  {id: 1, title: "Blog 1", author: "S. Author", url: "https://yle.fi", likes: 3},
  {id: 2, title: "Blog 2", author: "S.O. Author", url: "https://yle.fi", likes: 2},
  {id: 3, title: "Blog 3", author: "S.O.M. Author", url: "https://yle.fi", likes: 1},
]

let nextId = 4

export const getBlogs = () => {
  return blogs
}

export const getBlogById = (id: number) => {
  const blog = blogs.find(value => value.id === id) || undefined
  console.log(id, blog)
  return blog
}

export const addBlog = (title: string, author: string, url: string, likes: number) => {
  blogs.push({ id: nextId++, title, author, url, likes })
}

const totalLikes = (blogs) => {

  const sumLikes = blogs.reduce((sum, blog) => sum + blog.likes, 0)

  return sumLikes

}

const favouriteBlog = (blogs) => {

  const blogsLikes = blogs.map(blog => blog.likes)
  const maxLikes = Math.max.apply(Math, blogsLikes)
  const favBlog = blogs.find(blog => blog.likes === maxLikes)

  const deconstructed = {
    title: favBlog.title,
    author: favBlog.author,
    likes: favBlog.likes
  }

  return deconstructed

}

module.exports = { totalLikes, favouriteBlog }
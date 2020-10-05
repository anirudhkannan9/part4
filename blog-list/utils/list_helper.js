
var _ = require('lodash')


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

const mostBlogs = (blogs) => {

  const authors = blogs.map(blog => blog.author)

  const counts = authors.reduce((a, c) => {
    a[c] = (a[c] || 0) + 1
    return a
  }, {})
  const maxCount = Math.max(...Object.values(counts))
  const mostFrequent = Object.keys(counts).filter(k => counts[k] === maxCount)[0]

  const mostAuthor = {
    author: mostFrequent,
    blogs: maxCount
  }

  return mostAuthor

}

module.exports = { totalLikes, favouriteBlog, mostBlogs }
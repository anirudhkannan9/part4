
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

const mostLikes = (blogs) => {

  const unique_auths = _.uniq(blogs.map(blog => blog.author))
  const auth_count = [...unique_auths].map(function(ua) {
    return {
      author: ua,
      likes: 0
    }
  })

  for (let i=0; i<unique_auths.length; i++) {
    for (let n=0; n<blogs.length; n++) {
      if (unique_auths[i]===blogs[n].author) {
        for (let x=0; x<auth_count.length; x++) {
          if (Object.values(auth_count)[x].author===blogs[n].author) {
            Object.values(auth_count)[x].likes+=blogs[n].likes

          }
        }
      }
    }
  }

  var max_likes = 0

  for (let a=0; a<auth_count.length; a++) {
    if (auth_count[a].likes > max_likes) {
      max_likes = auth_count[a].likes
    }

  }

  var max_auth = {}
  for (let b=0; b<auth_count.length; b++) {
    if (auth_count[b].likes===max_likes) {
      max_auth = auth_count[b]
    }

  }

  return max_auth

}

module.exports = { totalLikes, favouriteBlog, mostBlogs, mostLikes }

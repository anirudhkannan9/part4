const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
  {
    title: 'test blog 1',
    author: 'auth1',
    url: 'https://example.com',
    likes: 1
  },
  {
    title: 'test blog 2',
    author: 'auth2',
    url: 'https://example2.com',
    likes: 2
  }

]

const nonExistingId = async () => {
  const blog = new Blog({ title: 'x', auth: 'y', url: 'https://x.ca' })
  await blog.save()
  await blog.remove()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

module.exports = {
  initialBlogs,
  nonExistingId,
  blogsInDb,
  usersInDb,
}


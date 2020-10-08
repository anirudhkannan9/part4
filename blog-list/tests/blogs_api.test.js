const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')
const initialBlogs = [
  {
    title: 'test blog post 1',
    author: 'anirudh',
    url: 'https://doesnmatter.com',
    likes: 0
  },
  {
    title: 'test post 2',
    author: 'also anirudh',
    url: 'https://ok.com',
    likes: 9
  },
  {
    title: 'test post 3',
    author: 'me 2',
    url: 'https://url.ca',
    likes: 1600
  }
]

beforeEach(async () => {
  await Blog.deleteMany({})
  let blogObject = new Blog(initialBlogs[0])
  await blogObject.save()
  blogObject = new Blog(initialBlogs[1])
  await blogObject.save()
  blogObject = new Blog(initialBlogs[2])
  await blogObject.save()
})

describe('getting blogs', () => {
  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(initialBlogs.length)
  })

  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs/')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('Verify that unique identifier property of blogs is called "id"', async () => {
    const response = await api.get('/api/blogs/')
    const first_blog = response.body[0]
    expect(first_blog.id).toBeDefined()
  })

})

describe('posting blogs', () => {
  test('succeeds with valid data', async () => {
    const newBlog = {
      title: 'testing addition of blog post',
      author: 'me',
      url: 'https://newpost.com',
      likes: 3
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)


    const blogsAtEnd = await api.get('/api/blogs')
    expect(blogsAtEnd.body).toHaveLength(4)

    const contents = blogsAtEnd.body.map(n => n.title)
    expect(contents).toContain(
      'testing addition of blog post'
    )
  })

  test('if "likes" property missing, automatically set to 0', async () => {
    const newBlog = {
      title: 'testing addition of blog post',
      author: 'me',
      url: 'https://newpost.com'
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await api.get('/api/blogs')
    expect(blogsAtEnd.body[3].likes).toBeDefined()
    expect(blogsAtEnd.body[3].likes).toBe(0)

  })

  test('if title missing, respond w/ 400 Bad Request', async () => {
    const newBlog = {
      author: 'me',
      url: 'https://newpost.com',
      likes: 3
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)

  })

  test('if url missing, respond w/ 400 Bad Request', async () => {
    const newBlog = {
      title: 'testing addition of blog post',
      author: 'me',
      likes: 3
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)

  })

  test('if title & URL missing, respond w/ 400 Bad Request', async () => {
    const newBlog = {
      author: 'me',
      likes: 3
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)

  })
})


afterAll(() => {
  mongoose.connection.close()
})
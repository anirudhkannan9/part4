const totalLikes = require('../utils/list_helper').totalLikes
const favouriteBlog = require('../utils/list_helper').favouriteBlog
const mostBlogs = require('../utils/list_helper').mostBlogs
const mostLikes = require('../utils/list_helper').mostLikes


const listWithOneBlog = [
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  }
]

const deconstructed1 = {
  title: 'Go To Statement Considered Harmful',
  author: 'Edsger W. Dijkstra',
  likes: 5

}

const manyblogs = [ { _id: '5a422a851b54a676234d17f7', title: 'React patterns', author: 'Michael Chan', url: 'https://reactpatterns.com/', likes: 7, __v: 0 }, { _id: '5a422aa71b54a676234d17f8', title: 'Go To Statement Considered Harmful', author: 'Edsger W. Dijkstra', url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html', likes: 5, __v: 0 }, { _id: '5a422b3a1b54a676234d17f9', title: 'Canonical string reduction', author: 'Edsger W. Dijkstra', url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html', likes: 12, __v: 0 }, { _id: '5a422b891b54a676234d17fa', title: 'First class tests', author: 'Robert C. Martin', url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll', likes: 10, __v: 0 }, { _id: '5a422ba71b54a676234d17fb', title: 'TDD harms architecture', author: 'Robert C. Martin', url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html', likes: 0, __v: 0 }, { _id: '5a422bc61b54a676234d17fc', title: 'Type wars', author: 'Robert C. Martin', url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html', likes: 2, __v: 0 }
]

const deconstructed2 = {
  title: 'Canonical string reduction',
  author: 'Edsger W. Dijkstra',
  likes: 12
}

test('empty list', () => {
  const blogs = []

  const result = totalLikes(blogs)
  expect(result).toBe(0)

})

describe('total likes', () => {

  test('empty list', () => {
    const blogs = []
    const result = totalLikes(blogs)
    expect(result).toBe(0)

  })

  test('when list has only one blog, equals the likes of that', () => {
    const result = totalLikes(listWithOneBlog)
    expect(result).toBe(5)
  })

  test('list w multiple blogs', () => {
    const result = totalLikes(manyblogs)
    expect(result).toBe(36)
  })

})

describe('favouriteBlog', () => {

  test('finding fav single element list', () => {
    const result = favouriteBlog(listWithOneBlog)
    expect(result).toEqual(deconstructed1)
  })

  test('finding fav in longer list', () => {
    const result = favouriteBlog(manyblogs)
    expect(result).toEqual(deconstructed2)
  })

})

describe('mostBlogs', () => {
  test('mostBlogs1', () => {
    const result = mostBlogs(manyblogs)
    expect(result).toEqual({ author: 'Robert C. Martin', blogs: 3 })
  })

})

describe('mostLikes', () => {
  test('mostLikes1', () => {
    const result = mostLikes(manyblogs)
    expect(result).toEqual({ author: 'Edsger W. Dijkstra', likes: 17 })

  })
})





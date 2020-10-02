
const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {

  const sumLikes = blogs.reduce((sum, blog) => sum + blog.likes, 0)

  return sumLikes

}

module.exports = { dummy, totalLikes }
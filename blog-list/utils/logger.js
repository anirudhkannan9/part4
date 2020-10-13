const info = (...params) => {
  if (process.env.NODE_ENV !== 'test') {
    console.log(...params)
  }
}

//change env back to all envs instead of just not test?
const error = (...params) => {
  // if (process.env.NODE_ENV !== 'test') {
  console.error(...params)
  //}
}



module.exports = {
  info, error
}


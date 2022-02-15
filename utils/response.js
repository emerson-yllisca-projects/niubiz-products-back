const successResponse = (res, data = null, status = 200) => {
  return res.status(status).json({ success: true, data })
}

const errorResponse = (res, error = null, status = 400) =>  {
  return res.status(status).json({ success: false, error })
}

const download = (res, headers = {}, contentFile, status = 200, send = true)  => {
  if (send) {
    return res.status(status).set(headers).send(contentFile)
  } else {
    res.set(headers)
    contentFile.write(res).then(() => {
      res.status(200).end()
    })
    return res
  }
}

module.exports = {
  successResponse,
  errorResponse,
  download
}

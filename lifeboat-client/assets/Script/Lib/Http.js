var Http = cc.Class({
  statics: {
    post(url, formData, cb) {
      const xhr = new XMLHttpRequest()
      xhr.timeout = 5000
      xhr.open('POST', url)
      xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded')
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          console.log('http response length: ' + xhr.responseText.length)
          if ((xhr.status >= 200 && xhr.status < 300)) {
            try {
              cb(null, JSON.parse(xhr.responseText))
            } catch(e) {
              cb(new Error('JSON FORMAT ERROR'), null)
            }
          } else {
            cb(new Error(xhr.status), null)
          }
        }
      }
      xhr.send(formData)
    }
  }
})

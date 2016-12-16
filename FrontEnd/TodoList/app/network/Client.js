export default class Client {
  constructor() {
    this.baseUrl = 'http://172.16.7.218:3000'
  }

  postData = (item, data, callback) => {
    fetch(this.baseUrl+item, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: data
      })
      .then((response) =>  response.json())
      .then((responseJson) => {
        callback(responseJson)
      })
      .catch((error) => {
        console.log('请求错误！')
        console.error(error)
      })
  }
}

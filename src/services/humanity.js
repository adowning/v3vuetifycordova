import axios from 'axios'
import cache from './cache/'
// const axios = require('axios')

var token = ''

export async function setToken() {
  const options = {
    client_id: '0cbaa9173943569cad4c0b8267981147bac0cf5d',
    client_secret: 'be6a34d0830ab6fb3db837958d50faace249e0d1',
    grant_type: 'password',
    username: 'ash@andrewscarpetcleaning.com',
    password: 'sugarlips42'
  }

  return await axios.post('/token', options).then(response => {
    cache.setItem('humanityToken', response.data.access_token)
    console.log(response.data.access_token)
  })
}
//www.humanity.com/api/v2/timeclocks/status/2736727/1?access_token=xxxxxxx

export async function getClockStatusOf1444044() {
  var token = await cache.getItem('humanityToken')
  var x = await axios
    .get('/humanity/timeclocks/status/1444044/1?access_token=' + token)
    .then(response => {
      // this.token = response.data.access_token;
      var string = response.data
      console.log(string)
      return string
    })
  return x
}

export async function clockInUser(empId) {
  var token = await cache.getItem('humanityToken')
  var x = await axios
    .post(`/humanity/employees/${empId}/clockin?access_token=` + token)
    .then(response => {
      // this.token = response.data.access_token;
      var string = response.data
      console.log(string)
      return string
    })
  return x
}

export async function clockOutUser(empId) {
  var token = await cache.getItem('humanityToken')
  console.log(token)
  console.log(empId)
  var res = await axios
    .put(`/humanity/employees/${empId}/clockout?access_token=` + token)
    .then(response => {
      console.log(response)
      // this.token = response.data.access_token;
      var string = response.data
      console.log(string)
      return string
    })
    .catch(error => {
      console.log(error)
    })
  return res
}

/* eslint-disable */
// import axios from "axios"
// import payload from "./jhumanity"
// var token

// export async function getUsers() {
//   try {
//     var result = await axios.post(
//       "https://www.humanity.com/oauth2/token.php",
//       payload
//     )
//     callback(result)
//   } catch (error) {
//     console.log("my error")
//     console.error(error)
//   }
// }
// exports.getToken = async function(option, callback) {
//   try {
//     var result = await axios.post(
//       "https://www.humanity.com/oauth2/token.php",
//       payload
//     )
//     token = result.data.access_token
//     callback(result)
//   } catch (error) {
//     console.log("my error")
//     console.error(error)
//   }
// }

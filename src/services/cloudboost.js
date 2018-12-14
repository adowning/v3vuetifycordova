import * as CB from 'cloudboost'
import bus from './bus-event'
import cache from './cache'
//{"appId":"andrewsDev","keys":{"js":"6d47c270-f65c-44ff-b030-afb3f1e4d8f7","master":"85520530-5b9c-4f42-9795-08cdf41a3ece"},"_id":"5c128f7873889a49c5abd75e"}%
import { stringify } from './utility'

CB.CloudApp.init(
  'https://mobile.ashdevtools.com',
  'andrewsDev',
  '85520530-5b9c-4f42-9795-08cdf41a3ece'
)

class CloudApi {
  constructor() {
    this.listening = false
    this.CB = CB
    this.cache = cache
    this.currentUser = CB.CloudUser.current
    if (CB.CloudApp._isConnected) {
      // console.log(this.currentUser)
    } else {
      console.log('Shit! not connected.')
    }
  }

  async startListeners() {
    if (!this.listening) {
      CB.CloudObject.on('Tablet', 'updated', function(obj) {
        console.log(obj)
        bus.emit('cb-tablet-updated', obj)
      })
      CB.CloudNotification.on('Sample', function(data) {
        console.log(data)
      })
      this.listening = true
      console.log('CB is now listening to updates')
    }
    var user = {
      username: 'browser2',
      password: 'asdfasdf'
    }
    if (this.currentUser) {
      console.log(this.currentUser)
      var x = {}
      x = await this.getCurrentDeviceFromLocal()
      if (x.length < 1) {
        console.log('no current deviuce, saving one now', user)

        this.loginUser(user)
      }
    } else {
      console.log('no current user, loginging in one now', user)
      this.loginUser(user)
    }
  }

  pin(obj) {
    var o = obj
    CB.CloudObject.unPin(obj).then(
      function(res) {
        console.log(res)
        CB.CloudObject.pin(o).then(
          function(res) {
            console.log(res)
          },
          function(err) {
            console.log(err)
          }
        )
      },

      function(err) {
        CB.CloudObject.pin(o).then(
          function(res) {
            console.log(res)
          },
          function(err) {
            console.log(err)
          }
        )
      }
    )
  }
  //  bulkPin(arr){

  //  }
  loginUser(_user) {
    var user = new CB.CloudUser()
    console.log(_user.username)
    user.set('username', _user.username)
    user.set('password', _user.password)
    var that = this
    user.logIn({
      success: function(user) {
        that.setCurrentDevice(user)
      },
      error: function(err) {
        //Error occured in user registration.
        console.log(err)
      }
    })
  }
  setCurrentDevice(user) {
    var that = this
    var query = new CB.CloudQuery('Tablet')
    query.equalTo('deviceId', user.username) //find all Students who age is 21
    query.findOne({
      success: function(obj) {
        user.relate('tablet', 'Tablet', obj.id) //relates the teacher in the Teacher table with id xxxxx to this student.
        let arr = []
        arr.push(obj)
        arr.push(user)
        that.pin(arr)
      },
      error: function(err) {
        //Error in retrieving the data.
        console.error(err)
      }
    })
  }

  async getCurrentDeviceFromLocal() {
    var query = new CB.CloudQuery('Tablet')
    query.equalTo('deviceId', this.currentUser.document.username) //find all Students who age is 21
    return new Promise(function(resolve, reject) {
      query.findFromLocalStore({
        success: function(obj) {
          resolve(obj)
        },
        error: function(err) {
          //Error in retrieving the data.
          console.error(err)
          reject(err)
        }
      })
    })
  }
  async sync() {
    CB.CloudObject.sync().then(
      function(res) {
        console.log(res)
      },
      function(err) {
        console.log(err)
      }
    )
  }
  async deviceAddEmployee(employeeId) {
    var device = await this.getCurrentDeviceFromLocal()
    device[0].document.userList.push(employeeId)
    this.pin(device)
    // this.sync()
    return await device[0].document.userList
  }
  async deviceRemoveEmployee(employeeId) {
    function remove(array, element) {
      return array.filter(el => el !== element)
    }
    var device = await this.getCurrentDeviceFromLocal()
    const updatedDevice = remove(device[0].document.userList, employeeId)
    device[0].document.userList = updatedDevice
    this.pin(device)
    return await device[0].document.userList
  }
  // createUser(_user) {
  //   var user = new CB.CloudUser()
  //   user.set('username', _user.username)
  //   user.set('password', 'asdfasdf')
  //   user.set('email', _user.username + '@sample.com')
  //   user.signUp({
  //     success: function(user) {
  //       console.log('created user ', user)
  //     },
  //     error: function(error) {
  //       //Error in user registration.
  //       console.log('>>>>>>>>. ERROR')
  //       console.log(error)
  //       return error
  //     }
  //   })
  // }
}
export { CloudApi as default }

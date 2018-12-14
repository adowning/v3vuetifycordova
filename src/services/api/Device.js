// import TaggedApi from "../../classes/TaggedApi";
import CloudApi from '../cloudboost'

class DeviceApi extends CloudApi {
  init() {
    return this.startListeners()
  }
  getEmployeeList() {}

  addEmployee(employeeId) {
    return this.deviceAddEmployee(employeeId)
  }
  removeEmployee(employeeId) {
    return this.deviceRemoveEmployee(employeeId)
  }
  index() {
    return this.get('/api/devices')
  }

  update(id, data) {
    return this.put('/api/devices/' + id, data)
  }

  remove(id) {
    return this.delete('/api/devices/' + id)
  }

  create(data) {
    return this.post('/api/devices', data)
  }
}

export { DeviceApi as default }

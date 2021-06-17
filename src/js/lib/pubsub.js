// Publish/Subscribe pattern
// (https://docs.microsoft.com/en-us/previous-versions/msdn10/hh201955(v=msdn.10))

// PubSub monitors state changes
export default class PubSub {
  constructor() {
    this.events = {};
  }

  subscribe(event, callback) {
    // this binding
    const self = this;
    // If events obj has no matching event
    // create event with blank array
    if(!self.events.hasOwnProperty(event)) {
      self.events[event] = [];
    }
    // push callback into events obj
    return self.events[event].push(callback);
  }

  publish(event, data=[]) {
    const self = this;

    // If event in events obj does not have callbacks, 
    // return empty array
    if(!self.events.hasOwnProperty(event)) {
      return [];
    }
    // If event in events obj has callbacks, 
    // loop through callbacks, return with passed data in an array
    return self.events[event].map(callback => callback(data))
  }
}
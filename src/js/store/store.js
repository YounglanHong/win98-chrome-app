import PubSub from "../lib/pubsub";

export default class Store {
  constructor(params) {
    const self = this;

    // default objs
    self.actions = {};
    self.mutations = {};
    self.state = {};

    self.status = "resting";

    // attach PubSub to store's events element
    self.events = new PubSub();

    if(params.hasOwnProperty("actions")) {
      self.actions = params.actions;
    }

    if(params.hasOwnProperty("mutations")) {
      self.mutations = params.mutations;
    }

    // set state as a Proxy to keep track of state change
    // https://ko.javascript.info/proxy
    self.state = new Proxy((params.state || {}), {
      set: (state, key, value) => {
        // set state as key-value pair
        state[key] = value;

        console.log(`stateChange: ${key}: ${value}`);

        // publish the event for components that are listening
        self.events.publish('stateChange', self.state);

        // not allowed to set value directly
        if(self.status !== "mutation") {
          console.warn(`You should use a mutation to set ${key}`);
        }

        // reset status
        self.status = "resting";

        return true;
      }
    });
  }

  // if action exists in actions, run the action


}
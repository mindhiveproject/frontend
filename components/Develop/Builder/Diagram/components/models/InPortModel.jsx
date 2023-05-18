import { DefaultPortModel } from '@projectstorm/react-diagrams';

// this is a incoming port
// it should be not allowed to create links from this port

export class InCustomPort extends DefaultPortModel {
  constructor(options = {}) {
    super({
      type: 'inCustomPort',
      ...options,
    });
    // this.maximumLinks = null;
    // if (this.getOptions().in) this.setMaximumLinks(1);
  }

  // setMaximumLinks(maxLinks) {
  //   this.maximumLinks = maxLinks;
  // }

  // getMaximumLinks() {
  //   return this.maximumLinks;
  // }

  isNewLinkAllowed() {
    // return this.getMaximumLinks() === null
    //   ? true
    //   : Object.keys(this.getLinks()).length < this.getMaximumLinks();
    // allow create new incoming connections
    return true;
  }

  canLinkToPort(port) {
    // console.log('in-port-modal', port);
    // it should be not allowed to create links from this port
    // do not allow outgoing connections from the in-port
    return false;
  }

  createLinkModel() {
    return false;
  }

  serialize() {
    return {
      ...super.serialize(),
      // maximumLinks: this.maximumLinks,
    };
  }

  deserialize(event, engine) {
    super.deserialize(event, engine);
    // this.maximumLinks = event.data.maximumLinks;
  }
}

import { DefaultPortModel } from '@projectstorm/react-diagrams';

// this is a outcoming port
// it should be allowed to create links from this port

export class OutCustomPort extends DefaultPortModel {
  constructor(options = {}) {
    super({
      type: 'outCustomPort',
      ...options,
    });
    // one link is already included by default
    this.maximumLinks = 10;
    // console.log('this.getOptions', this.getOptions().in);
    // if (this.getOptions().in) this.setMaximumLinks(1);
  }

  setMaximumLinks(maxLinks) {
    this.maximumLinks = maxLinks;
  }

  getMaximumLinks() {
    return this.maximumLinks;
  }

  isNewLinkAllowed() {
    return this.getMaximumLinks() === null
      ? true
      : Object.keys(this.getLinks()).length < this.getMaximumLinks();
  }

  canLinkToPort(port) {
    // console.log('out-port-modal', port);
    // console.log('this.isNewLinkAllowed()', this.isNewLinkAllowed());
    // console.log('port.isNewLinkAllowed()', port.isNewLinkAllowed());
    // debugger;
    return (
      this.isNewLinkAllowed() && // do not allow more than one outgoing link from out-port
      // port.isNewLinkAllowed() &&
      port?.options?.type !== 'outCustomPort' // do not allow links connecting to other out-ports
    );
  }

  serialize() {
    return {
      ...super.serialize(),
      maximumLinks: this.maximumLinks,
    };
  }

  deserialize(event, engine) {
    super.deserialize(event, engine);
    this.maximumLinks = event.data.maximumLinks;
  }
}

import App from 'next/app';
import { ApolloProvider } from '@apollo/client';
import withData from '../lib/withData';
import 'normalize.css';
import { init } from '@socialgouv/matomo-next';
import { matomoUrl, matomoSideId } from '../config';

const MATOMO_URL = matomoUrl;
const MATOMO_SITE_ID = matomoSideId;

class MyApp extends App {
  // get initial props of pages and resolve queries and mutation before rendering the page
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }
    // exposes the query to the user
    pageProps.query = ctx.query;
    return { pageProps };
  }

  state = {
    history: [], // keep history items in state
  };

  componentDidMount() {
    // init({ url: MATOMO_URL, siteId: MATOMO_SITE_ID });
    const { asPath } = this.props.router;
    // lets add initial route to `history`
    this.setState(prevState => ({ history: [...prevState.history, asPath] }));
  }

  componentDidUpdate() {
    const { history } = this.state;
    const { asPath } = this.props.router;
    // if current route (`asPath`) does not equal
    // the latest item in the history,
    // it is changed so lets save it
    if (history[history.length - 1] !== asPath) {
      this.setState(prevState => ({ history: [...prevState.history, asPath] }));
    }
  }

  render() {
    const { Component, apollo, pageProps } = this.props;

    return (
      <ApolloProvider client={apollo}>
        <Component history={this.state.history} {...pageProps} />
      </ApolloProvider>
    );
  }
}

export default withData(MyApp);

import "antd/dist/antd.css";
import PropTypes from "prop-types";
import Head from "next/head";

import wrapper from "../store/configureStore";

const NordBird = ({ Component }) => {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <title>NextBird</title>
      </Head>
      <Component />
    </>
  );
};

NordBird.prototypes = {
  Component: PropTypes.elementType.isRequire,
};

export default wrapper.withRedux(NordBird);

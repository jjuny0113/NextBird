import "antd/dist/antd.css";
import PropTypes from "prop-types";

import wrapper from "../store/configureStore";


const NordBird = ({ Component }) => {
  return (
    <>
      <Component />
    </>
  );
};

NordBird.prototypes = {
  Component: PropTypes.elementType.isRequire,
};

export default wrapper.withRedux(NordBird);

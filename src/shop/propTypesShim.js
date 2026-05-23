const chainable = () => chainable;
chainable.isRequired = chainable;

const PropTypes = new Proxy(
  {},
  {
    get() {
      return chainable;
    },
  },
);

export default PropTypes;

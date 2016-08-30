/**
 * Created by tiangen on 16/8/30.
 */
const PureRenderMixin = require('react/lib/ReactComponentWithPureRenderMixin');

function getPureRenderMixin(scope) {
  scope.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(scope);
}

module.exports = {
  getPureRenderMixin,
};
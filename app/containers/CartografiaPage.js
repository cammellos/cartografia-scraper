import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Cartografia from '../components/Cartografia';
import * as CartografiaActions from '../actions/cartografia';

function mapStateToProps(state) {
  return {
    cartografia: state.cartografia
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(CartografiaActions, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Cartografia);

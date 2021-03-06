import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import HoverPaper from '../../atoms/hover-paper';
import actions from '../../organisms/error-list/actions';
import styles from './styles';


const mapStateToProps = (state) => ({
  errorList: state.errorList.response,
  interval: state.interval.interval,
  timestamp: state.interval.timestamp,
});


@connect(mapStateToProps, actions)
class Errors extends React.Component {
  static propTypes = {
    errorList: PropTypes.object,
    get: PropTypes.func.isRequired,
    interval: PropTypes.number,
    style: PropTypes.object,
    timestamp: PropTypes.instanceOf(Date),
  }

  static contextTypes = {
    router: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props);

    this.handleClick = () => {
      this.context.router.push('/errors');
    };

    this.get = (interval = this.props.interval) => {
      this.props.get(interval);
    };
  }

  componentWillMount() {
    this.get();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps) {
      if (nextProps.timestamp && nextProps.timestamp !== this.props.timestamp) {
        this.get(nextProps.interval);
      }
    }
  }

  render() {
    const errorNumber = this.props.errorList
                      ? this.props.errorList.exceptions.length
                      : 0;
    const extraStyle = errorNumber > 0
                     ? { backgroundColor: '#d12b2b', color: '#fff' }
                     : {};
    const style = {
      ...styles.content,
      ...this.props.style,
      ...extraStyle,
    };
    return (
      <HoverPaper style={style}>
        <div onClick={this.handleClick} style={styles.clickable}>
          <h3>Errors</h3>
          <span style={styles.stat}>{errorNumber} Errors occured</span>
        </div>
      </HoverPaper>
    );
  }
}


export default Errors;

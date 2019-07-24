import React from 'react';
import './Reps.scss';
import PropTypes from 'prop-types';

class Reps extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      hover: props.reps.map(() => false),
    };
  }
  
  componentDidMount() {
  }

  // Handle a list item being hovered over
  onRepMouseEnter(hoverIdx) {
    this.setState(state => {
      const hover = state.hover.map((hoverItem, idx) => {
        return hoverItem || idx === hoverIdx;
      });
      return { hover };
    });
  }

  onRepMouseLeave(hoverIdx) {
    this.setState(state => {
      const hover = state.hover.map((hoverItem, idx) => {
        return hoverItem && idx !== hoverIdx;
      });
      return { hover };
    });
  }

  render() {
    const hover = this.state.hover;
    const that = this;
    const reps = this.props.reps.map((rep, i) => {
      return (
        <li key={i} 
          onMouseEnter={that.onRepMouseEnter.bind(that, i)}
          onMouseLeave={that.onRepMouseLeave.bind(that, i)}>
          <Rep
            name={rep.name}
            officeName={rep.officeName}
            party={rep.party}
            phone={(rep.phones && rep.phones[0]) || ''}
            hover={hover[i]} />
        </li>
      );
    });
    return ( 
      <div>
        <ul>
          {reps}
        </ul>
      </div>
    );
  }
}
Reps.propTypes = {
  reps: PropTypes.array.isRequired,
};

function Rep(props) {
  return (
    <div className={`userData userBox ${props.hover ? 'hovered' : ''}`}>
      <div className='name'>{props.name}</div>
      <div className='officeName'>{props.officeName}</div>
      <div className='party'>{props.party}</div>
      <div className='phone'>{props.phone}</div>
    </div>
  );
}
Rep.propTypes = {
  hover: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
  officeName: PropTypes.string.isRequired,
  party: PropTypes.string.isRequired,
  phone: PropTypes.string.isRequired,
};

export default Reps;

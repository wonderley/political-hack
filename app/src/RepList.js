import React from 'react';
import './RepList.scss';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router';

class RepList extends React.Component {

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

  onRepMouseDown(idx) {
    this.setState({ selectedRep: this.props.reps[idx] });
  }

  renderRedirect() {
    if (this.state.selectedRep) {
      return <Redirect push to={{
        pathname: `/rep/${this.state.selectedRep.name}`,
        state: this.state.selectedRep,
      }}/>;
    }
  }

  render() {
    const hover = this.state.hover;
    const that = this;
    const reps = this.props.reps.map((rep, i) => {
      return (
        <li key={i} 
          onMouseEnter={that.onRepMouseEnter.bind(that, i)}
          onMouseLeave={that.onRepMouseLeave.bind(that, i)}
          onMouseDown={that.onRepMouseDown.bind(that, i)}>
          <RepItem
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
        {this.renderRedirect()}
        <ul>
          {reps}
        </ul>
      </div>
    );
  }
}
RepList.propTypes = {
  reps: PropTypes.array.isRequired,
};

function RepItem(props) {
  return (
    <div className={`repItem ${props.hover ? 'hovered' : ''}`}>
      <div className='name'>{props.name}</div>
      <div className='officeName'>{props.officeName}</div>
      <div className='party'>{props.party}</div>
      <div className='phone'>{props.phone}</div>
    </div>
  );
}
RepItem.propTypes = {
  hover: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
  officeName: PropTypes.string.isRequired,
  party: PropTypes.string,
  phone: PropTypes.string.isRequired,
};

export default RepList;

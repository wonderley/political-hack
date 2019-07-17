import React from 'react';
import './Reps.scss';

class Reps extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      reps: [],
      // ID of the item most recently hovered
      hoverId: -1,
    };
  }
  
  componentDidMount() {
    const repsForAddressUrl = encodeURI(`/beta/repsForAddress/${this.props.address}`);
    const that = this;
    fetch(repsForAddressUrl)
    .then(response => {
      if (response.status !== 200) {
        throw new Error(`Request for url ${repsForAddressUrl} failed with status ${response.status}.`);
      }
      return response.json();
    })
    .then(res => {
      debugger;
      console.log(`URL ${repsForAddressUrl} fetched successfully`);
      const reps = res.data.officials;
      // Assign office names to the appropriate reps
      res.data.offices.forEach(office => {
        office.officialIndices.forEach(officialIdx => {
          reps[officialIdx] = {
            ...reps[officialIdx],
            officeName: office.name,
          }
        }); 
      });
      that.setState({ reps });
    })
    .catch(err => {
      console.error(err.toString());
    });
  }

  // Handle a list item being hovered over
  onRepMouseEnter(hoverId) {
    this.setState({ hoverId });
  }
  
  render() {
    const hoverId = this.state.hoverId;
    const that = this;
    const reps = this.state.reps.map((rep, i) => {
      return (
        <li key={i} 
            onMouseEnter={that.onRepMouseEnter.bind(that, i)}>
          <Rep
            name={rep.name}
            officeName={rep.officeName}
            party={rep.party}
            phone={(rep.phones && rep.phones[0]) || ''}
            hover={i === hoverId} />
        </li>
      );
    });
    const headerText = this.props.address ? `Representatives at ${this.props.address}` : '';
    return ( 
      <div>
        <h1>{headerText}</h1>
        <ul>
          {reps}
        </ul>
      </div>
    );
  }
}

const Rep = props => {
  return (
    <div className={`userData userBox ${props.hover ? 'hovered' : ''}`}>
      <div className='name'>{props.name}</div>
      <div className='officeName'>{props.officeName}</div>
      <div className='party'>{props.party}</div>
      <div className='phone'>{props.phone}</div>
    </div>
  );
}

export default Reps;

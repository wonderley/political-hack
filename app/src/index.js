import React from 'react'
import ReactDOM from 'react-dom'
import './index.scss'

const Rep = props => {
  const email = `mailto:${props.email}`;
  const company = props.company ? props.company.name : 'none';
  const city = props.address ? props.address.city : 'none';

  // Additional content is added to the hovered list item
  const extraContent = props.hover ? (
    <div className='userData'>
      <div className='city'>{city}</div>
      <div className='phone'>{props.phone}</div>
      <a className='website' href={`http://${props.website}`}>
        {props.website}
      </a>
    </div>
  ) : null;
  
  return (
    <div className={`userData userBox ${props.hover ? 'hovered' : ''}`}>
      <a className='email' href={email}>{props.name}</a>
      <div className='badge'>{company}</div>
      {extraContent}
    </div>
  );
}

class Reps extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      // List of fetched people
      people: [],
      // ID of the item most recently hovered
      hoverId: -1,
    };
  }
  
  componentDidMount() {
    const repsForAddressUrl = 'https://xrgewndjpj.execute-api.us-east-1.amazonaws.com/beta/repsForAddress/3423%20Piedmont%20Rd%20NE,%20Atlanta,%20GA%2030305';
    const that = this;
    fetch(repsForAddressUrl, { mode: 'no-cors'})
    .then(response => {
      if (response.status !== 200) {
        throw new Error(`Request for url ${repsForAddressUrl} failed with status ${response.status}.`);
      }
      return response.json();
    })
    .then(reps => {
      console.log(`URL ${repsForAddressUrl} fetched successfully`);
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
    const users = this.state.people.map(person => {
      return (
        <li key={person.id} 
            onMouseEnter={that.onRepMouseEnter.bind(that, person.id)}>
          <Rep
            name={person.name}
            email={person.email}
            company={person.company}
            address={person.address}
            phone={person.phone}
            website={person.website}
            hover={person.id === hoverId} />
        </li>
      );
    });
    return ( 
      <div>
        <h1>Our team</h1>
        <ul>
          {users}
        </ul>
      </div>
    );
  }
}



ReactDOM.render(
  <Reps />,
  document.getElementById('root')
);


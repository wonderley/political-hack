import React from 'react';
import PropTypes from 'prop-types';
import './Rep.css';
import placeholder from './rep-placeholder.png'; 

class Rep extends React.Component {
  render() {
    const repData = this.props.location.state;
    const { name, address: addresses, party, phones, urls,
            photoUrl, emails, channels, officeName } = repData;
    const repImg = photoUrl ?
      <img src={photoUrl} alt={name}/> :
      <img src={placeholder} alt="Rep Placeholder"/>;
    const addressDivs = divsForAddresses(addresses);
    const phoneDivs = phones && phones.map((phoneNumber, i) => {
      const index = phones.length > 1 ? ` ${i + 1}` : '';
      return <div>Phone{index}: {phoneNumber}</div>
    });
    const urlDivs = urls && urls.map((url, i) => {
      const index = urls.length > 1 ? ` ${i + 1}` : '';
      return <div>Website{index}: <a href={url} target="_blank" rel="noopener noreferrer">{url}</a></div>
    });
    const emailDivs = emails && emails.map((email, i) => {
      const index = emails.length > 1 ? ` ${i + 1}` : '';
      return <div>Email{index}: <a href={`mailto://${email}`}>{email}</a></div>
    });
    const socialMediaDivs = channels &&
      channels.filter(({type, _}) => type !== 'GooglePlus')
              .map(({type, id}) => {
        return <div>{type}: <a href={channelUrl(type, id)} target="_blank" rel="noopener noreferrer">{id}</a></div>;
      });
    return (
      <div>
        <div style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          paddingTop: '15px',
        }}><h1>{name}</h1></div>
        <div style={{
          display: 'flex',
          flexDirection: 'row',
          padding: '15px',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          <div className='imgParent'>
            {repImg}
          </div>
          <div>
            <div>{`Office: ${officeName || 'Unknown'}`}</div>
            <div>{`Party: ${party || 'Unknown'}`}</div>
            {phoneDivs}
            {addressDivs}
            {emailDivs}
            {urlDivs}
            {socialMediaDivs}
          </div>
        </div>
      </div>
    );

    // const url = encodeURI(`/candidatesForName/${repData.name}`);
    // const that = this;
    // fetch(url)
    //   .then(response => {
    //     debugger;
    //     if (response.status !== 200) {
    //       throw new Error(`Request for url ${url} failed with status ${response.status}.`);
    //     }
    //     return response.json();
    //   })
    //   .then(res => {
    //     debugger;
    //     console.log(`URL ${url} fetched successfully`);
    //     if (!res || !res.results || !res.results[0]) {
    //       throw new Error('No data was found');
    //     }
    //     if (res.results.length > 1) {
    //       console.error('WARNING: Multiple matches were found. The first result will be used.');
    //     }

    //     // go to profile page with this data
    //     const profileProps = {
    //       fecData: res.results[0],
    //       repData,
    //     };
    //     console.log(JSON.stringify(profileProps));
    //   })
    //   .catch(err => {
    //     console.error(err.toString());
    //     const profileProps = {
    //       repData,
    //     };
    //     console.log(JSON.stringify(profileProps));
    //   });
  }
}

function divsForAddresses(addresses) {
  return addresses && addresses.map((address, i) => {
    const index = addresses.length > 1 ? ` ${i + 1}` : '';
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'row',
      }}>
        <div>Address{index}:</div>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          padding: '0 3px 0 3px'
        }}>
          <div>{address.line1}</div>
          <div>{address.line2}</div>
          <div>{address.line3}</div>
          <div>{address.city}, {address.state} {address.zip}</div>
        </div>
      </div>
    );
  });
}

function channelUrl(type, id) {
  if (type === 'Facebook') {
    return `https://facebook.com/${id}`;
  } else if (type === 'Twitter') {
    return `https://twitter.com/${id}`;
  } else if (type === 'YouTube') {
    return `https://youtube.com/channel/${id}`;
  }
}

Rep.propTypes = {
  location: PropTypes.object,
};

export default Rep;
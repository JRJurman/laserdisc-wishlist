import React, { Component } from 'react';

class FacebookAuth extends Component {
  componentDidMount() {
    const appId = '223728614740748';

    window.fbAsyncInit = () => {
      window.FB.init({
        appId      : appId,
        cookie     : true,  // enable cookies to allow the server to access
                            // the session
        xfbml      : true,  // parse social plugins on this page
        version    : 'v2.8' // use graph api version 2.8
      });

      this.props.loadFacebookAPI(window.FB);
    }

    var js, fjs = document.getElementsByClassName('fb-root')[0];
    if (document.getElementById('facebook-jssdk')) return;
    js = document.createElement('script'); js.id = 'facebook-jssdk';
    js.src = `//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.8&appId=${appId}`;
    fjs.parentNode.insertBefore(js, fjs);
  }

  render() {
    return (
      <span className='fb-root'/>
    );
  }
}

export default FacebookAuth;

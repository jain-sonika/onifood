import React from 'react'

class Chat extends React.Component {


  componentDidMount(){

    (function(d, m){
        var kommunicateSettings = 
            {"appId":"1dc8936226b65218ef3603a265fddcb35","popupWidget":true,"automaticChatOpenOnNavigation":true};
        var s = document.createElement("script"); s.type = "text/javascript"; s.async = true;
        s.src = "https://widget.kommunicate.io/v2/kommunicate.app";
        var h = document.getElementsByTagName("head")[0]; h.appendChild(s);
        window.kommunicate = m; m._globals = kommunicateSettings;
    })(document, window.kommunicate || {});
}

    render() {
      return
    }
  }



export default Chat
import {Provider} from 'react-redux';
import React, {Component} from 'react';
import {PersistGate} from 'redux-persist/integration/react';

import {store, persistor} from '../../state';

export default class StateComponent extends Component {
  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          {this.props.children}
        </PersistGate>
      </Provider>
    );
  }
}

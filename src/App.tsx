import React from 'react';
import {StatusBar} from 'react-native';

import Navigator from './navigator';
import StateComponent from './common/component/state.component';

declare const global: {HermesInternal: null | {}};

const App = () => {
  return (
    <StateComponent>
      <StatusBar translucent backgroundColor="transparent" />
      <Navigator />
    </StateComponent>
  );
};

export default App;

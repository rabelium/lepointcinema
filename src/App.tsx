import {connect} from 'react-redux';
import React, {useEffect, useState} from 'react';
import AnimatedSplash from 'react-native-animated-splash-screen';

import Toaster from './common/component/toast.component';
import {preload} from './common/builder/worker';
import metrics from './assets/style/metrics';
import photos from './assets/style/photos';
import colors from './assets/style/colors';
import Navigator from './navigator';

declare const global: {HermesInternal: null | {}};

const App = ({people}: any) => {
  const [isLoaded, setIsLoaded] = useState(false);
  setTimeout(() => setIsLoaded(true), 5000);
  useEffect(() => {
    preload();
  }, []);
  useEffect(() => {
    setTimeout(() => setIsLoaded(people.length > 0), 1000);
  }, [people]);

  return (
    <>
      <AnimatedSplash
        translucent={true}
        isLoaded={isLoaded}
        logoImage={photos.logo}
        backgroundColor={colors.primary}
        logoWidth={Math.round((metrics.screenWidth * 0.67) / 2)}
        logoHeight={(Math.round((metrics.screenWidth * 0.67) / 2) / 46) * 17}>
        <>
          <Navigator />
          <Toaster />
        </>
      </AnimatedSplash>
    </>
  );
};

const mapStateToProps = (state: any) => ({
  people: state?.home?.people,
});

export default connect(mapStateToProps, () => ({}))(App);

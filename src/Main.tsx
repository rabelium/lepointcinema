import React, {useState} from 'react';
import AnimatedSplash from 'react-native-animated-splash-screen';

import App from './App';
import photos from './assets/style/photos';
import metrics from './assets/style/metrics';
import colors from './assets/style/colors';

const Main = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  setTimeout(() => setIsLoaded(true), 5000);

  return (
    <AnimatedSplash
      translucent={true}
      isLoaded={isLoaded}
      logoImage={photos.logo}
      backgroundColor={colors.primary}
      logoHeight={Math.round(metrics.screenWidth * 0.75)}
      logoWidth={(Math.round(metrics.screenWidth * 0.75) / 46) * 17}>
      <App />
    </AnimatedSplash>
  );
};

export default Main;

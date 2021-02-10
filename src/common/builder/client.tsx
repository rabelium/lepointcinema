import {API_URL} from '@env';
import NetInfo, {
  NetInfoState,
  NetInfoSubscription,
} from '@react-native-community/netinfo';
import axios, {AxiosRequestConfig} from 'axios';

import {store} from '../../state';
import updaters from './state/updaters';

const AppUpdater = updaters.app;

const API_TIMEOUT = __DEV__ ? 15000 : 15000;

const createClient = (baseURL: string) => {
  const instance = axios.create({
    baseURL,
    responseType: 'json',
    timeout: API_TIMEOUT,
  });

  instance.interceptors.request.use(
    (config: AxiosRequestConfig) => {
      return NetInfo.fetch().then((state) => {
        if (!state.isInternetReachable) {
          store.dispatch(
            AppUpdater.info({
              title: 'Pas de connexion internet',
              type: 'offline',
            }),
          );
          return new Promise((resolve) => {
            const unsubscribe: NetInfoSubscription = NetInfo.addEventListener(
              (network: NetInfoState) => {
                if (network.isInternetReachable) {
                  store.dispatch(
                    AppUpdater.info({
                      title: 'Votre connexion internet a été rétablie',
                      type: 'online',
                    }),
                  );
                  unsubscribe();
                  resolve(config);
                }
              },
            );
          });
        }
        return config;
      });
    },
    (error) => Promise.reject(error),
  );

  return instance;
};

export default createClient(API_URL);

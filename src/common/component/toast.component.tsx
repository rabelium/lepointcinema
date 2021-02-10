import {connect} from 'react-redux';
import React, {useEffect} from 'react';
import Toast from 'react-native-toast-message';
import {Text, View, TouchableOpacity} from 'react-native';

import updaters from '../builder/state/updaters';
import metrics from '../../assets/style/metrics';
import colors from '../../assets/style/colors';
import {Icon} from '../../assets/style/icons';

import style from './style/toast.style';

const AppUpdater = updaters.app;

const ToastContainer = ({title, content, icon}: any) => (
  <View style={style.container}>
    <Icon color={colors.snow} name={icon} size={metrics.icons.medium} />
    <View style={style.wrapper}>
      {title && (
        <Text numberOfLines={1} style={style.title}>
          {title}
        </Text>
      )}
      {content && <Text style={style.content}>{content}</Text>}
    </View>
    <TouchableOpacity style={style.touch} onPress={() => Toast.hide()}>
      <Icon color={colors.snow} name={'close'} size={metrics.icons.tiny} />
    </TouchableOpacity>
  </View>
);

const toastConfig = {
  success: ({text1, text2}: any) => (
    <ToastContainer title={text1} content={text2} icon={'smiley'} />
  ),
  error: ({text1, text2}: any) => (
    <ToastContainer title={text1} content={text2} icon={'sad'} />
  ),
  info: ({text1, text2}: any) => (
    <ToastContainer title={text1} content={text2} icon={'straight'} />
  ),
  offline: ({text1, text2}: any) => (
    <ToastContainer title={text1} content={text2} icon={'no-wifi'} />
  ),
  online: ({text1, text2}: any) => (
    <ToastContainer title={text1} content={text2} icon={'wifi-signal'} />
  ),
};

const Toaster = ({success, error, info, clear}: any) => {
  useEffect(() => {
    const notification = success || error || info;
    const type =
      notification?.type || (success ? 'success' : error ? 'error' : 'info');
    if (notification) {
      Toast.show({
        type,
        text1: notification?.title,
        text2: notification?.message,
        visibilityTime: 5000,
        position: 'bottom',
        onHide: () => clear('error'),
      });
    }
  }, [success, error, info, clear]);

  return <Toast config={toastConfig} ref={(ref) => Toast.setRef(ref)} />;
};

const mapStateToProps = (state: any) => ({...state?.app});

const mapDispatchToProps = (dispatch: any) => ({
  clear: (type: string) => dispatch(AppUpdater[type]()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Toaster);

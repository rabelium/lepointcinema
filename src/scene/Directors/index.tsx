import {connect} from 'react-redux';

import {load, setLoading, setRefreshing} from './provider/directors.provider';
import ListComponent from '../../common/component/list.component';

const mapStateToProps = (state: any) => ({
  ...state?.directors,
  title: 'Réalisateurs',
});

const mapDispatchToProps = (dispatch: any) => ({
  load: (page = 0, people = []) => dispatch(load(page, people)),
  setLoading: (loading = false) => dispatch(setLoading(loading)),
  setRefreshing: (refreshing = false) => dispatch(setRefreshing(refreshing)),
});
export default connect(mapStateToProps, mapDispatchToProps)(ListComponent);

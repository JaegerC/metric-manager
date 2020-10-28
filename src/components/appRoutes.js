import React, { useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { refreshToken } from '../redux/user/actions';
import requireAuth from '../setup/requireAuth';
import Main from '../screens/common/main';
import SideBar from '../components/sidebar';
import { routes } from '../setup/routes';
import CircularLoading from '../components/loading/circularLoading';


const AppRoutes = () => {
    const { isLoading, /*tokenRefreshed*/ } = useSelector(state => state.newAccessToken);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(refreshToken());
    }, [dispatch]);

    if (isLoading) {
        return (<CircularLoading isLoading={isLoading} />);
    }

    return (
        <Switch>
            <Route path={routes.home} component={Main} exact />
            <Route path={routes.home} component={requireAuth(SideBar)} />
        </Switch>
    );
}

export default AppRoutes;
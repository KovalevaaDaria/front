import React, {useContext} from 'react';
import {AuthContext} from "../context/AuthContext";
import {Route, Routes} from "react-router-dom";
import {privateRoutes, publicRoutes} from "../router/routes";

const AppRouter = () => {
    const {isAuth, isLoading} = useContext(AuthContext);
    if (isLoading) return <></>

    console.log(isAuth);
    return (
        isAuth
            ?
            <Routes>
                {privateRoutes.map(route =>
                    <Route
                        element={route.component}
                        path={route.path}
                        exact={route.exact}
                        loader={route.loader}
                        action={route.action}
                        key={route.path}
                    />
                )}
            </Routes>
            :
            <Routes>
                {publicRoutes.map(route =>
                    <Route
                        element={route.component}
                        path={route.path}
                        exact={route.exact}
                        key={route.path}
                        loader={route.loader}
                        action={route.action}
                    />
                )}
            </Routes>
    );
};

export default AppRouter;
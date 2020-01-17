import React from 'react';
import PropType from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

import Portal from '../../Views/_layouts/Portal';
import Default from '../../Views/_layouts/Default';

import { store } from '../store';

function Router({
    component: Component,
    isPrivate = false,
    noHeader = false,
    ...rest
}) {
    const { signed } = store.getState().auth;
    
    if (!signed && isPrivate) {
        return <Redirect to="/" />;
    } 

    if (signed && (rest.path === "/")) {
        return <Redirect to="/Dashboard" />
    }

    const Layout = signed ? Portal : Default;

    return (
        <Route 
            {...rest}
            render={props => (
                <Layout noHeader={noHeader}>
                    <Component {...props} />
                </Layout>
            )}
        />
    )
}

Router.propTypes = {
    noHeader: PropType.bool,
    isPrivate: PropType.bool,
    component: PropType.oneOfType([PropType.element, PropType.func]).isRequired,
};

Router.defaultProps = {
    noHeader: false,
}

export default Router;
import React from 'react';
import {
    Switch,
} from 'react-router-dom';
// Custom Route
import Route from './Route';
// Views
import NotFound from '../../Views/NotFound';
import SignIn from '../../Views/SignIn';
import Dashboard from '../../Views/Dashboard';
import GenMod from '../../Views/Portal/gen_mod';
import GenForm from '../../Views/Portal/gen_form';
import GenPapel from '../../Views/Portal/gen_papel';
import Perfil from '../../Views/Perfil';
import PnlOs from '../../Views/ACMA/pnl_os';
import GenOs from '../../Views/ACMA/gen_os';
import TransOs from '../../Views/ACMA/trans_os';
import RecOs from '../../Views/ACMA/rec_os';
import SolOs from '../../Views/ACMA/sol_os';
import EditOs from '../../Views/ACMA/edit_os';

const Routes = () => {
    return (
        <Switch>
            {
                // Public
            }
            <Route path="/" exact component={SignIn} isPrivate={false} />
            {
                // Private
                //ACMA
            }
            <Route path="/pnl/pnl_os" component={PnlOs} isPrivate={true} />
            <Route path="/gen_os" component={GenOs} isPrivate={true} />
            <Route path="/trans_os" component={TransOs} isPrivate={true} />
            <Route path="/rec_os" component={RecOs} isPrivate={true} />
            <Route path="/sol_os" component={SolOs} isPrivate={true} />
            <Route path="/edit_os" component={EditOs} isPrivate={true} />
            {
                //Portal
            }
            <Route path="/gen_form" component={GenForm} isPrivate={true} />
            <Route path="/gen_modulo" component={GenMod} isPrivate={true} />
            <Route path="/gen_papel" component={GenPapel} isPrivate={true} />
            <Route path="/Dashboard" component={Dashboard} isPrivate={true} />
            <Route path="/Perfil" component={Perfil} isPrivate={true} />
            {
                // not found 
            }
            <Route path="/" component={NotFound} />
        </Switch>
    );
}

export default Routes;
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import AuthLoading from '../components/loading/authLoading';
import CircularLoading from '../components/loading/circularLoading';
// import { routes } from '../setup/routes';

export default function (ComposedComponent) {
    class Authenticate extends Component {
        constructor(props) {
            super(props);
            this.state = {
                id: null,
                is_firstUser: null,
                usuario: '',
                isLoading: false

            }
        }

        // UNSAFE_componentWillMount() {
        //     console.log(this.props)
        //     // if (!this.props.isLoading && _.isEmpty(this.props.user)) {
        //     //     this.props.history.push(`${routes.home}home`);
        //     // }

        // }

        componentDidUpdate(prevProps) {
            let { auth: authPrev } = prevProps;
            let { auth } = this.props;
            if (authPrev !== auth) {
                let { isAuthenticated, user, isLoading, error } = auth;
                if (isAuthenticated && user && !isLoading && !error) {
                    this.setState({
                        id: user.id,
                        usuario: user.username
                    })
                }
            }
        }

        render() {
            const { isLoading, user, isAuthenticated } = this.props
            return (
                <>
                    {isLoading && <CircularLoading isLoading={isLoading} />}
                    {!isLoading && user && isAuthenticated ?
                        <ComposedComponent {...this.props} />
                        :
                        !isLoading && user && !user.id && <AuthLoading message={"Sesion Finalizada"} openModal={true} history={this.props.history} usuario={this.state.usuario} />
                    }
                </>
            )
        }
    }
    Authenticate.propTypes = {
        isAuthenticated: PropTypes.bool.isRequired,
        user: PropTypes.object.isRequired,
        auth: PropTypes.object.isRequired,
    }

    function mapStateToProps({ auth }) {
        const { user, isAuthenticated, isLoading } = auth;
        return { auth, user, isAuthenticated, isLoading }
    }

    return connect(mapStateToProps)(Authenticate);
}
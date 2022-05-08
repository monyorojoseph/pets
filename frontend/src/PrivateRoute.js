import { Navigate, useLocation } from 'react-router-dom';
import { connect } from 'react-redux'

function PrivateRoute({children, auth}) {
    const { credentials: {access_token} } = auth
    let location = useLocation()
    if (access_token) {
      return children
    }
    return <Navigate to="/signin" state={{from: location}} replace />
}

const mapStateToProps = state => ({
  auth: state.auth
})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(PrivateRoute)
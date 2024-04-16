import {  Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';

function ProtectedRoute({ children, user, allowedRoles, requiredPermissions }) {
  // Check if user is logged in
  const isLoggedIn = user?.isLoggedIn;

  // Check if user has the required role(s)
  const hasAllowedRole = allowedRoles?.some((role) => user.usertype === role);

  // Check if user has the required permission(s)
  const hasRequiredPermissions = requiredPermissions?.every((permission) =>
    user.permissions?.includes(permission)
  );

  // Redirect if unauthorized
  if (!isLoggedIn || !hasAllowedRole || !hasRequiredPermissions) {
    return <Navigate to="/login" replace />; // Or redirect to unauthorized page
  }

  // Render the child component if authorized
  return children;
}

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
  user: PropTypes.shape({
    isLoggedIn: PropTypes.bool.isRequired,
    usertype: PropTypes.string.isRequired,
    permissions: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
  allowedRoles: PropTypes.arrayOf(PropTypes.string).isRequired,
  requiredPermissions: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default ProtectedRoute;
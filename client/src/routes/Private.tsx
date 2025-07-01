import { useAuth } from '@/hooks/useAuth';
import type { LocationState } from '@/types';
import React from 'react';
import { Navigate, useLocation } from 'react-router';

interface Props {
	children: React.ReactNode;
}

const Private: React.FC<Props> = ({ children }) => {
	const location: LocationState = useLocation();

	const { token, user, isLoading } = useAuth();

	if (isLoading) {
		return 'Loading...';
	}

	if (!user || !token) {
		return <Navigate to="/login" state={{ from: location }} replace />;
	}

	return children;
};

export default Private;

import React from 'react';
import { User } from '@/node_modules/@supabase/auth-js/src/lib/types';
import { logout } from '../login/actions';

const Dashboard = ({ user }: { user: User }) => {
	return (
		<div>
			<h1>Welcome {user.email}</h1>
			<p>This is your dashboard.</p>
			<form action={logout}>Logout</form>
		</div>
	);
};

export default Dashboard;

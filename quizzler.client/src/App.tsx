import { Route, Routes } from 'react-router';
import './App.css'
import PageContainer from './pages/PageContainer'
import HomePage from './pages/HomePage';
import { useFetchAllStudySets } from './hooks/useFetchAllStudySets';
import AccountPage from './pages/AccountPage';
import type { User } from './types/User';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import CreateStudySetPage from './pages/CreateStudySetPage';

function App() {
	const { data: studySets = [] } = useFetchAllStudySets();
	// const { data: user } = useFetchuser();
	const user: User = { username: "naomi", id: '0', password: "123", studySets: [] };
	return (
		<PageContainer>
			<Routes>
				<Route index element={<HomePage studySets={studySets}/>} />
				<Route path="account" element={<AccountPage user={user}/>} />
				<Route path="create-set" element={<CreateStudySetPage />} />
				<Route path="login" element={<LoginPage />} />
				<Route path="signup" element={<SignupPage />} />
			</Routes>
		</PageContainer>
	)
}

export default App

import { Typography } from '@mui/material';
import { Route, Routes } from 'react-router';
import './App.css';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { useFetchAllStudySets } from './hooks/useFetchAllStudySets';
import { useFetchCurrentUser } from './hooks/useFetchCurrentUser';
import FlashcardMode from './modes/FlashcardMode';
import LearnMode from './modes/LearnMode';
import MatchMode from './modes/MatchMode';
import QuizMode from './modes/QuizMode';
import AccountPage from './pages/AccountPage';
import CreateStudySetPage from './pages/CreateStudySetPage';
import EditStudySet from './pages/EditStudySet';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import PageContainer from './pages/PageContainer';
import SignupPage from './pages/SignupPage';
import StudySetDetailsPage from './pages/StudySetDetailsPage';

function App() {
	return (
		<AuthProvider>
			<AppContent />
		</AuthProvider>
	);
}

function AppContent() {
	const { user } = useAuth();
	const { data: studySets = [] } = useFetchAllStudySets();
	const { data: userFromQuery } = useFetchCurrentUser();
	const dummyUser = { username: "guest", id: 0, password: "", studySets: [] };

	// If no user is logged in, only show login and signup pages
	if (!user) {
		return (
			<PageContainer>
				<Routes>
					<Route path="/login" element={<LoginPage />} />
					<Route path="/signup" element={<SignupPage />} />
					<Route path="*" element={<LoginPage />} /> {/* Redirect all other routes to login */}
				</Routes>
			</PageContainer>
		);
	}

	// User is logged in, show all protected routes
	return (
		<PageContainer>
			<Routes>
				<Route index element={<HomePage studySets={studySets} />} />
				<Route path="account" element={<AccountPage user={userFromQuery ?? dummyUser} />} />
				<Route path="create-set" element={<CreateStudySetPage />} />
				<Route path="login" element={<LoginPage />} />
				<Route path="signup" element={<SignupPage />} />
				<Route path="studysets/:studySetId" element={<StudySetDetailsPage />} />
				<Route path="flashcard-mode/:studySetId" element={<FlashcardMode />} />
				<Route path="quiz-mode/:studySetId" element={<QuizMode />} />
				<Route path="learn-mode/:studySetId" element={<LearnMode />} />
				<Route path="match-mode/:studySetId" element={<MatchMode />} />
				<Route path="*" element={<Typography>404 Not Found</Typography>} />
				<Route path="flashcards/edit/:studySetId" element={<EditStudySet />} />
			</Routes>
		</PageContainer>
	);
}

export default App

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
import StudySetDetailsPage from './pages/StudySetDetailsPage';
import FlashcardMode from './modes/FlashcardMode';
import QuizMode from './modes/QuizMode';
import MatchMode from './modes/MatchMode';
import LearnMode from './modes/LearnMode';
import { Typography } from '@mui/material';
import EditStudySet from './pages/EditStudySet';

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
				<Route path="studysets/:studySetId" element={<StudySetDetailsPage />} />
				<Route path="flashcard-mode/:studySetId" element={<FlashcardMode />} />
				<Route path="quiz-mode/:studySetId" element={<QuizMode />} />
				<Route path="learn-mode/:studySetId" element={<LearnMode />} />
				<Route path="match-mode/:studySetId" element={<MatchMode />} />
				<Route path="*" element={<Typography>404 Not Found</Typography>} />
				<Route path="flashcards/edit/:studySetId" element={<EditStudySet />} />
			</Routes>
		</PageContainer>
	)
}

export default App

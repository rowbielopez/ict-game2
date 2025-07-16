import React, { useState } from 'react';
import CSUHomePage from './CSUHomePage';
import ICTQuizGame from './lesson1_game';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [studentInfo, setStudentInfo] = useState(null);

  const handleStartLesson = (info) => {
    setStudentInfo(info);
    setCurrentPage('lesson');
  };

  const handleBackToHome = () => {
    setCurrentPage('home');
    setStudentInfo(null);
  };

  return (
    <div className="App">
      {currentPage === 'home' ? (
        <CSUHomePage onStartLesson={handleStartLesson} />
      ) : (
        <ICTQuizGame studentInfo={studentInfo} onBackToHome={handleBackToHome} />
      )}
    </div>
  );
}

export default App;

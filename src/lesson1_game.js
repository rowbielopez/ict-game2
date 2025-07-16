import React, { useState, useEffect } from 'react';
import { CheckCircle, XCircle, Trophy, Users, Clock, ArrowRight, RotateCcw, ArrowLeft } from 'lucide-react';

const ICTQuizGame = ({ studentInfo, onBackToHome }) => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [showResult, setShowResult] = useState(false);
    const [gameFinished, setGameFinished] = useState(false);
    const [timeLeft, setTimeLeft] = useState(30);
    const [gameMode, setGameMode] = useState('individual'); // 'individual' or 'team'
    const [playerName, setPlayerName] = useState(studentInfo?.studentName || '');
    const [gameStarted, setGameStarted] = useState(false);

    const questions = [
        {
            question: "What does ICT stand for?",
            options: [
                "Internet Communication Technology",
                "Information and Communication Technology",
                "Integrated Computer Technology",
                "Interactive Communication Tools"
            ],
            correct: 1,
            category: "Definition",
            difficulty: "Easy"
        },
        {
            question: "Which of these is NOT a core component of ICT?",
            options: [
                "Hardware",
                "Software",
                "Networks",
                "Furniture"
            ],
            correct: 3,
            category: "Components",
            difficulty: "Easy"
        },
        {
            question: "What is the main advantage of Learning Management Systems (LMS) in education?",
            options: [
                "They replace teachers completely",
                "They provide centralized content delivery and tracking",
                "They only work with expensive equipment",
                "They eliminate the need for assessments"
            ],
            correct: 1,
            category: "Education",
            difficulty: "Medium"
        },
        {
            question: "Which technology enables 'digital natives' to learn more effectively?",
            options: [
                "Traditional textbooks only",
                "Interactive multimedia content",
                "Lecture-only formats",
                "Handwritten notes exclusively"
            ],
            correct: 1,
            category: "Education",
            difficulty: "Medium"
        },
        {
            question: "What is a key characteristic of the digital economy?",
            options: [
                "It only involves physical products",
                "It relies on data-driven decision making",
                "It excludes small businesses",
                "It doesn't require internet connection"
            ],
            correct: 1,
            category: "Livelihood",
            difficulty: "Medium"
        },
        {
            question: "Which career opportunity is MOST enabled by ICT?",
            options: [
                "Traditional farming only",
                "Remote freelancing and digital marketing",
                "Manual labor jobs",
                "Factory assembly line work"
            ],
            correct: 1,
            category: "Livelihood",
            difficulty: "Easy"
        },
        {
            question: "What does 'gamification' in education refer to?",
            options: [
                "Playing video games during class",
                "Using game elements like points and levels in learning",
                "Replacing all textbooks with games",
                "Only teaching game development"
            ],
            correct: 1,
            category: "Education",
            difficulty: "Medium"
        },
        {
            question: "Which skill is MOST important for success in the digital workforce?",
            options: [
                "Only technical programming skills",
                "Continuous learning and adaptability",
                "Working alone without collaboration",
                "Avoiding new technologies"
            ],
            correct: 1,
            category: "Livelihood",
            difficulty: "Hard"
        },
        {
            question: "What is the 'digital divide' referring to?",
            options: [
                "The gap between different computer brands",
                "The difference between hardware and software",
                "The inequality in access to digital technologies",
                "The separation between online and offline content"
            ],
            correct: 2,
            category: "Social Impact",
            difficulty: "Hard"
        },
        {
            question: "Which statement about ICT in entrepreneurship is TRUE?",
            options: [
                "ICT only helps large corporations",
                "Small businesses can't benefit from ICT",
                "ICT enables global reach for small businesses",
                "ICT is too expensive for entrepreneurs"
            ],
            correct: 2,
            category: "Livelihood",
            difficulty: "Medium"
        }
    ];

    const nextQuestion = () => {
        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
            setSelectedAnswer(null);
            setShowResult(false);
            setTimeLeft(30);
        } else {
            setGameFinished(true);
        }
    };

    const handleAnswerSelect = (answerIndex) => {
        if (showResult) return;

        setSelectedAnswer(answerIndex);
        setShowResult(true);

        if (answerIndex === questions[currentQuestion].correct) {
            setScore(score + 1);
        }
    };

    // Update player name when studentInfo changes
    useEffect(() => {
        if (studentInfo?.studentName) {
            setPlayerName(studentInfo.studentName);
        }
    }, [studentInfo]);

    // Timer effect
    useEffect(() => {
        const handleTimeout = () => {
            setShowResult(true);
            // Auto-advance after timeout
            setTimeout(() => {
                nextQuestion();
            }, 2000);
        };

        if (gameStarted && !gameFinished && !showResult && timeLeft > 0) {
            const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
            return () => clearTimeout(timer);
        } else if (timeLeft === 0 && !showResult) {
            handleTimeout();
        }
    }, [timeLeft, gameStarted, gameFinished, showResult, nextQuestion]);

    const resetGame = () => {
        setCurrentQuestion(0);
        setScore(0);
        setSelectedAnswer(null);
        setShowResult(false);
        setGameFinished(false);
        setTimeLeft(30);
        setGameStarted(false);
    };

    const startGame = () => {
        if (playerName.trim()) {
            setGameStarted(true);
            setTimeLeft(30);
        }
    };

    const getScoreMessage = () => {
        const percentage = (score / questions.length) * 100;
        if (percentage >= 90) return "🏆 ICT Master! Outstanding performance!";
        if (percentage >= 80) return "🌟 Excellent! You have a solid understanding of ICT!";
        if (percentage >= 70) return "👍 Good job! You're on the right track!";
        if (percentage >= 60) return "📚 Not bad! Review the material and try again!";
        return "🔄 Keep learning! ICT concepts need more practice!";
    };

    // Game Setup Screen
    if (!gameStarted) {
        return (
            <div className="quiz-container">
                <div className="quiz-header">
                    <button
                        onClick={onBackToHome}
                        className="back-button"
                    >
                        <ArrowLeft size={20} />
                        Back to Home
                    </button>

                    {studentInfo && (
                        <div className="student-info-header">
                            <div className="student-details">
                                <span><strong>ID:</strong> {studentInfo.studentId}</span>
                                <span><strong>Name:</strong> {studentInfo.studentName}</span>
                                <span><strong>Course:</strong> {studentInfo.course}</span>
                            </div>
                        </div>
                    )}
                </div>

                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">ICT Knowledge Challenge</h1>
                    <p className="text-gray-600">Test your understanding of ICT concepts!</p>
                </div>

                <div className="quiz-card">
                    <h2 className="text-xl font-semibold mb-4 flex items-center">
                        <Users className="mr-2" size={20} />
                        Game Setup
                    </h2>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Your Name or Team Name:
                        </label>
                        <input
                            type="text"
                            value={playerName}
                            onChange={(e) => setPlayerName(e.target.value)}
                            className="quiz-input"
                            placeholder="Enter your name..."
                        />
                    </div>

                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Game Mode:</label>
                        <div className="flex space-x-4">
                            <button
                                onClick={() => setGameMode('individual')}
                                className={`quiz-button ${gameMode === 'individual' ? '' : 'bg-gray-200 text-gray-700'}`}
                            >
                                Individual
                            </button>
                            <button
                                onClick={() => setGameMode('team')}
                                className={`quiz-button ${gameMode === 'team' ? '' : 'bg-gray-200 text-gray-700'}`}
                            >
                                Team
                            </button>
                        </div>
                    </div>

                    <div className="bg-blue-50 p-4 rounded-lg mb-4">
                        <h3 className="font-semibold text-blue-800 mb-2">Game Rules:</h3>
                        <ul className="text-sm text-blue-700 space-y-1">
                            <li>{questions.length} questions covering ICT topics</li>
                            <li>30 seconds per question</li>
                            <li>Multiple choice format</li>
                            <li>Instant feedback on answers</li>
                            <li>Final score and performance analysis</li>
                        </ul>
                    </div>

                    <button
                        onClick={startGame}
                        disabled={!playerName.trim()}
                        className="quiz-button w-full disabled:bg-gray-300 disabled:cursor-not-allowed"
                    >
                        Start Game!
                    </button>
                </div>
            </div>
        );
    }

    // Game Finished Screen
    if (gameFinished) {
        return (
            <div className="quiz-container">
                <div className="text-center mb-8">
                    <div className="trophy-icon">
                        <Trophy size={48} />
                    </div>
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">Game Complete!</h1>
                    <h2 className="text-xl text-gray-600">Well done, {playerName}!</h2>
                </div>

                <div className="quiz-card">
                    <div className="text-center mb-6">
                        <div className="score-display">
                            {score} / {questions.length}
                        </div>
                        <div className="score-percentage">
                            {Math.round((score / questions.length) * 100)}% Score
                        </div>
                        <div className="score-message">
                            {getScoreMessage()}
                        </div>
                    </div>

                    <div className="stats-grid">
                        <div className="stat-card correct">
                            <div className="stat-number correct">{score}</div>
                            <div className="stat-label">Correct Answers</div>
                        </div>
                        <div className="stat-card incorrect">
                            <div className="stat-number incorrect">{questions.length - score}</div>
                            <div className="stat-label">Incorrect Answers</div>
                        </div>
                    </div>

                    <div className="space-y-2 mb-6">
                        <h3 className="font-semibold text-gray-700">Performance by Category:</h3>
                        {['Definition', 'Components', 'Education', 'Livelihood', 'Social Impact'].map(category => {
                            const categoryQuestions = questions.filter(q => q.category === category);
                            const categoryTotal = categoryQuestions.length;
                            const categoryCorrect = Math.floor((score / questions.length) * categoryTotal);

                            return (
                                <div key={category} className="performance-item">
                                    <span className={`category-tag category-${category.toLowerCase()}`}>
                                        {category}
                                    </span>
                                    <span className="performance-score">
                                        {categoryCorrect} / {categoryTotal}
                                    </span>
                                </div>
                            );
                        })}
                    </div>

                    <button
                        onClick={resetGame}
                        className="quiz-button w-full flex items-center justify-center"
                    >
                        <RotateCcw className="mr-2" size={20} />
                        Play Again
                    </button>
                </div>
            </div>
        );
    }

    // Main Game Screen
    const currentQ = questions[currentQuestion];

    return (
        <div className="quiz-container">
            {/* Header */}
            <div className="quiz-header">
                <div className="flex items-center space-x-4">
                    <div className="text-sm font-medium text-gray-600">
                        Question {currentQuestion + 1} of {questions.length}
                    </div>
                    <div className={`category-tag category-${currentQ.category.toLowerCase()}`}>
                        {currentQ.category}
                    </div>
                    <div className="flex items-center space-x-1">
                        <div className={`difficulty-dot difficulty-${currentQ.difficulty.toLowerCase()}`}></div>
                        <span className="text-xs text-gray-600">{currentQ.difficulty}</span>
                    </div>
                </div>
                <div className="text-right">
                    <div className="text-sm text-gray-600">Score: {score}</div>
                    <div className="text-sm text-gray-600">Player: {playerName}</div>
                </div>
            </div>

            {/* Timer */}
            <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                    <Clock className="text-gray-500" size={16} />
                    <span className={`timer-display ${timeLeft <= 10 ? 'warning' : ''}`}>
                        {timeLeft}s remaining
                    </span>
                </div>
                <div className="timer-bar">
                    <div
                        className={`timer-fill ${timeLeft <= 10 ? 'warning' : ''}`}
                        style={{ width: `${(timeLeft / 30) * 100}%` }}
                    ></div>
                </div>
            </div>

            {/* Question */}
            <div className="quiz-card">
                <h2 className="text-xl font-semibold text-gray-800 mb-6">
                    {currentQ.question}
                </h2>

                <div className="space-y-3">
                    {currentQ.options.map((option, index) => {
                        let buttonClass = "option-button ";

                        if (showResult) {
                            if (index === currentQ.correct) {
                                buttonClass += "correct";
                            } else if (index === selectedAnswer && index !== currentQ.correct) {
                                buttonClass += "incorrect";
                            } else {
                                buttonClass += "disabled";
                            }
                        }

                        return (
                            <button
                                key={index}
                                onClick={() => handleAnswerSelect(index)}
                                className={buttonClass}
                                disabled={showResult}
                            >
                                <span>{option}</span>
                                {showResult && (
                                    <span>
                                        {index === currentQ.correct ? (
                                            <CheckCircle className="text-green-500" size={20} />
                                        ) : index === selectedAnswer ? (
                                            <XCircle className="text-red-500" size={20} />
                                        ) : null}
                                    </span>
                                )}
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Next Button */}
            {showResult && (
                <div className="text-center">
                    <button
                        onClick={nextQuestion}
                        className="quiz-button flex items-center mx-auto"
                    >
                        {currentQuestion < questions.length - 1 ? (
                            <>
                                Next Question <ArrowRight className="ml-2" size={20} />
                            </>
                        ) : (
                            <>
                                View Results <Trophy className="ml-2" size={20} />
                            </>
                        )}
                    </button>
                </div>
            )}

            {/* Progress Bar */}
            <div className="mt-6">
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                    <span>Progress</span>
                    <span>{Math.round(((currentQuestion + 1) / questions.length) * 100)}%</span>
                </div>
                <div className="progress-bar">
                    <div
                        className="progress-fill"
                        style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                    ></div>
                </div>
            </div>
        </div>
    );
};

export default ICTQuizGame;
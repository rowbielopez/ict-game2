import React, { useState } from 'react';
import { BookOpen, User, IdCard, Play, Lock } from 'lucide-react';

const HomePage = ({ onStartLesson }) => {
    const [step, setStep] = useState(1); // 1: Course selection, 2: Student info, 3: Lesson selection
    const [selectedCourse, setSelectedCourse] = useState('');
    const [studentId, setStudentId] = useState('');
    const [studentName, setStudentName] = useState('');

    const courses = [
        { id: 'teaching-ict', name: 'Teaching ICT' },
        { id: 'introduction', name: 'Introduction' }
    ];

    const lessons = [
        { id: 1, name: 'Lesson 1', available: true },
        { id: 2, name: 'Lesson 2', available: false },
        { id: 3, name: 'Lesson 3', available: false },
        { id: 4, name: 'Lesson 4', available: false },
        { id: 5, name: 'Lesson 5', available: false },
        { id: 6, name: 'Lesson 6', available: false },
        { id: 7, name: 'Lesson 7', available: false },
        { id: 8, name: 'Lesson 8', available: false },
        { id: 9, name: 'Lesson 9', available: false }
    ];

    const handleCourseSelect = (courseId) => {
        setSelectedCourse(courseId);
        setStep(2);
    };

    const handleStudentInfoSubmit = () => {
        if (studentId.trim() && studentName.trim()) {
            setStep(3);
        }
    };

    const handleLessonSelect = (lessonId) => {
        if (lessonId === 1) {
            onStartLesson({
                course: selectedCourse,
                studentId,
                studentName,
                lesson: lessonId
            });
        }
    };

    const handleBack = () => {
        setStep(step - 1);
    };

    // Step 1: Course Selection
    if (step === 1) {
        return (
            <div className="home-container">
                <div className="home-content">
                    <div className="home-header">
                        <BookOpen className="home-icon" size={64} />
                        <h1 className="home-title">ICT Learning Platform</h1>
                        <p className="home-subtitle">Choose your course to get started</p>
                    </div>

                    <div className="course-selection">
                        <h2 className="section-title">Select a Course</h2>
                        <div className="course-grid">
                            {courses.map((course) => (
                                <button
                                    key={course.id}
                                    onClick={() => handleCourseSelect(course.id)}
                                    className="course-card"
                                >
                                    <BookOpen size={32} />
                                    <span className="course-name">{course.name}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // Step 2: Student Information
    if (step === 2) {
        return (
            <div className="home-container">
                <div className="home-content">
                    <div className="home-header">
                        <User className="home-icon" size={64} />
                        <h1 className="home-title">Student Information</h1>
                        <p className="home-subtitle">Please provide your details</p>
                    </div>

                    <div className="student-info-form">
                        <div className="form-group">
                            <label className="form-label">
                                <IdCard className="form-icon" size={20} />
                                Student ID Number
                            </label>
                            <input
                                type="text"
                                value={studentId}
                                onChange={(e) => setStudentId(e.target.value)}
                                className="form-input"
                                placeholder="Enter your ID number"
                                maxLength="20"
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label">
                                <User className="form-icon" size={20} />
                                Full Name
                            </label>
                            <input
                                type="text"
                                value={studentName}
                                onChange={(e) => setStudentName(e.target.value)}
                                className="form-input"
                                placeholder="Enter your full name"
                            />
                        </div>

                        <div className="form-actions">
                            <button
                                onClick={handleBack}
                                className="btn-secondary"
                            >
                                Back
                            </button>
                            <button
                                onClick={handleStudentInfoSubmit}
                                disabled={!studentId.trim() || !studentName.trim()}
                                className="btn-primary"
                            >
                                Continue
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // Step 3: Lesson Selection
    if (step === 3) {
        return (
            <div className="home-container">
                <div className="home-content">
                    <div className="home-header">
                        <Play className="home-icon" size={64} />
                        <h1 className="home-title">Select a Lesson</h1>
                        <p className="home-subtitle">
                            Welcome, {studentName}! Choose a lesson to begin
                        </p>
                    </div>

                    <div className="student-info-display">
                        <div className="info-item">
                            <strong>Course:</strong> {courses.find(c => c.id === selectedCourse)?.name}
                        </div>
                        <div className="info-item">
                            <strong>Student ID:</strong> {studentId}
                        </div>
                        <div className="info-item">
                            <strong>Name:</strong> {studentName}
                        </div>
                    </div>

                    <div className="lesson-selection">
                        <h2 className="section-title">Available Lessons</h2>
                        <div className="lesson-grid">
                            {lessons.map((lesson) => (
                                <button
                                    key={lesson.id}
                                    onClick={() => handleLessonSelect(lesson.id)}
                                    disabled={!lesson.available}
                                    className={`lesson-card ${!lesson.available ? 'disabled' : ''}`}
                                >
                                    {lesson.available ? (
                                        <Play size={24} />
                                    ) : (
                                        <Lock size={24} />
                                    )}
                                    <span className="lesson-name">{lesson.name}</span>
                                    {!lesson.available && (
                                        <span className="coming-soon">Coming Soon</span>
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="form-actions">
                        <button
                            onClick={handleBack}
                            className="btn-secondary"
                        >
                            Back
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return null;
};

export default HomePage;

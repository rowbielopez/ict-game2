import React, { useState, useEffect } from 'react';
import { BookOpen, User, IdCard, Play, Lock, Info } from 'lucide-react';

const HomePage = ({ onStartLesson }) => {
    const [studentId, setStudentId] = useState('');
    const [studentName, setStudentName] = useState('');
    const [selectedCourse, setSelectedCourse] = useState('');
    const [selectedLesson, setSelectedLesson] = useState('');
    const [isFormValid, setIsFormValid] = useState(false);
    const [showLessonDropdown, setShowLessonDropdown] = useState(false);
    const [isAnimated, setIsAnimated] = useState(false);

    const courses = [
        { id: 'teaching-ict', name: 'Teaching in ICT' },
        { id: 'introduction-ict', name: 'Introduction to ICT Specializations 1' }
    ];

    const lessons = [
        { id: 1, name: 'Lesson 1', available: true, course: 'introduction-ict' },
        { id: 2, name: 'Lesson 2', available: false, course: 'introduction-ict' },
        { id: 3, name: 'Lesson 3', available: false, course: 'introduction-ict' },
        { id: 4, name: 'Lesson 4', available: false, course: 'introduction-ict' },
        { id: 5, name: 'Lesson 5', available: false, course: 'introduction-ict' },
        { id: 6, name: 'Lesson 6', available: false, course: 'introduction-ict' },
        { id: 7, name: 'Lesson 7', available: false, course: 'introduction-ict' },
        { id: 8, name: 'Lesson 8', available: false, course: 'introduction-ict' },
        { id: 9, name: 'Lesson 9', available: false, course: 'introduction-ict' }
    ];

    // Trigger animation on component mount
    useEffect(() => {
        setTimeout(() => setIsAnimated(true), 100);
    }, []);

    // Validate form
    useEffect(() => {
        const isValid = studentId.trim() &&
            studentName.trim() &&
            selectedCourse &&
            (selectedCourse === 'teaching-ict' || selectedLesson);
        setIsFormValid(isValid);
    }, [studentId, studentName, selectedCourse, selectedLesson]);

    // Handle course selection
    const handleCourseChange = (courseId) => {
        setSelectedCourse(courseId);
        setSelectedLesson('');
        setShowLessonDropdown(courseId === 'introduction-ict');
    };

    // Handle lesson selection
    const handleLessonChange = (lessonId) => {
        const lesson = lessons.find(l => l.id === parseInt(lessonId));
        if (lesson && lesson.available) {
            setSelectedLesson(lessonId);
        }
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        if (isFormValid) {
            const studentInfo = {
                studentId,
                studentName,
                course: selectedCourse,
                lesson: selectedLesson || null
            };

            // Store in localStorage
            localStorage.setItem('csuStudentInfo', JSON.stringify(studentInfo));

            // Pass to parent component
            onStartLesson(studentInfo);
        }
    };

    const availableLessons = lessons.filter(lesson => lesson.course === selectedCourse);

    return (
        <div className="portal-container">
            <div className={`portal-content ${isAnimated ? 'animated' : ''}`}>
                {/* Header */}
                <div className="portal-header">
                    <div className="university-logo">
                        <BookOpen size={48} />
                    </div>
                    <h1 className="portal-title">
                        Cagayan State University
                    </h1>
                    <h2 className="portal-subtitle">
                        Student Learning Portal
                    </h2>
                </div>

                {/* Login Form */}
                <div className="login-form-container">
                    <form onSubmit={handleSubmit} className="login-form">
                        <div className="form-section">
                            <h3 className="form-title">Student Information</h3>

                            {/* Student ID Input */}
                            <div className="input-group">
                                <label htmlFor="studentId" className="input-label">
                                    <IdCard size={18} />
                                    Student ID Number
                                </label>
                                <input
                                    id="studentId"
                                    type="text"
                                    value={studentId}
                                    onChange={(e) => setStudentId(e.target.value)}
                                    className="form-input"
                                    placeholder="Enter your Student ID"
                                    required
                                    aria-describedby="studentId-help"
                                />
                                <small id="studentId-help" className="input-help">
                                    Enter your official CSU Student ID Number
                                </small>
                            </div>

                            {/* Full Name Input */}
                            <div className="input-group">
                                <label htmlFor="studentName" className="input-label">
                                    <User size={18} />
                                    Full Name
                                </label>
                                <input
                                    id="studentName"
                                    type="text"
                                    value={studentName}
                                    onChange={(e) => setStudentName(e.target.value)}
                                    className="form-input"
                                    placeholder="Enter your full name"
                                    required
                                    aria-describedby="studentName-help"
                                />
                                <small id="studentName-help" className="input-help">
                                    Enter your complete name as registered
                                </small>
                            </div>

                            {/* Course Selection */}
                            <div className="input-group">
                                <label htmlFor="course" className="input-label">
                                    <BookOpen size={18} />
                                    Select Course
                                </label>
                                <select
                                    id="course"
                                    value={selectedCourse}
                                    onChange={(e) => handleCourseChange(e.target.value)}
                                    className="form-select"
                                    required
                                    aria-describedby="course-help"
                                >
                                    <option value="">Choose a course...</option>
                                    {courses.map(course => (
                                        <option key={course.id} value={course.id}>
                                            {course.name}
                                        </option>
                                    ))}
                                </select>
                                <small id="course-help" className="input-help">
                                    Select your enrolled course
                                </small>
                            </div>

                            {/* Lesson Selection (Only for Introduction to ICT) */}
                            {showLessonDropdown && (
                                <div className="input-group lesson-dropdown">
                                    <label htmlFor="lesson" className="input-label">
                                        <Play size={18} />
                                        Select Lesson
                                    </label>
                                    <select
                                        id="lesson"
                                        value={selectedLesson}
                                        onChange={(e) => handleLessonChange(e.target.value)}
                                        className="form-select"
                                        required
                                        aria-describedby="lesson-help"
                                    >
                                        <option value="">Choose a lesson...</option>
                                        {availableLessons.map(lesson => (
                                            <option
                                                key={lesson.id}
                                                value={lesson.id}
                                                disabled={!lesson.available}
                                            >
                                                {lesson.name} {!lesson.available ? '(Coming Soon)' : ''}
                                            </option>
                                        ))}
                                    </select>
                                    <small id="lesson-help" className="input-help">
                                        Only Lesson 1 is currently available
                                    </small>

                                    {/* Lesson Status Grid */}
                                    <div className="lesson-status-grid">
                                        {availableLessons.map(lesson => (
                                            <div
                                                key={lesson.id}
                                                className={`lesson-status-item ${lesson.available ? 'available' : 'disabled'}`}
                                                title={lesson.available ? 'Available' : 'Coming Soon'}
                                            >
                                                {lesson.available ? (
                                                    <Play size={16} />
                                                ) : (
                                                    <Lock size={16} />
                                                )}
                                                <span>{lesson.name}</span>
                                                {!lesson.available && (
                                                    <div className="coming-soon-tooltip">
                                                        <Info size={12} />
                                                        Coming Soon
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={!isFormValid}
                                className="start-lesson-btn"
                                aria-label="Start selected lesson"
                            >
                                <Play size={20} />
                                Start Lesson
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            {/* Footer */}
            <footer className="portal-footer">
                <p>&copy; 2025 Cagayan State University. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default HomePage;

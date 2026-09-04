import { Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import LearningLayout from './components/layout/LearningLayout';
import AdminLayout from './components/layout/AdminLayout';
import Home from './pages/Home';
import Courses from './pages/Courses';
import CourseDetail from './pages/CourseDetail';
import About from './pages/About';
import Contact from './pages/Contact';
import Login from './pages/Login';
import PendingApproval from './pages/PendingApproval';
import RequestEnrollment from './pages/RequestEnrollment';
import StudentDashboard from './pages/student/Dashboard';
import LessonPlayer from './pages/student/LessonPlayer';
import QuizPage from './pages/student/QuizPage';
import AssignmentPage from './pages/student/AssignmentPage';
import LabPage from './pages/student/LabPage';
import LearnRedirect from './pages/student/LearnRedirect';
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminCourses from './pages/admin/AdminCourses';
import AdminStudents from './pages/admin/AdminStudents';
import CourseEditor from './pages/admin/CourseEditor';
import LabsHub from './pages/labs/LabsHub';
import PythonLab from './pages/labs/PythonLab';
import JavaLab from './pages/labs/JavaLab';

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="courses" element={<Courses />} />
        <Route path="courses/:id" element={<CourseDetail />} />
        <Route path="courses/:courseId/request" element={<RequestEnrollment />} />
        <Route path="labs" element={<LabsHub />} />
        <Route path="labs/python" element={<PythonLab />} />
        <Route path="labs/java" element={<JavaLab />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route path="login" element={<Login />} />
        <Route path="pending-approval" element={<PendingApproval />} />
        <Route path="dashboard" element={<StudentDashboard />} />
        <Route path="admin/login" element={<AdminLogin />} />
      </Route>

      <Route element={<Layout />}>
        <Route path="learn/:courseId" element={<LearningLayout />}>
          <Route index element={<LearnRedirect />} />
          <Route path="lesson/:lessonId" element={<LessonPlayer />} />
          <Route path="quiz/:quizId" element={<QuizPage />} />
          <Route path="assignment/:assignmentId" element={<AssignmentPage />} />
          <Route path="lab/:labId" element={<LabPage />} />
        </Route>
      </Route>

      <Route element={<Layout />}>
        <Route path="admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="courses" element={<AdminCourses />} />
          <Route path="courses/new" element={<CourseEditor />} />
          <Route path="courses/:id/edit" element={<CourseEditor />} />
          <Route path="students" element={<AdminStudents />} />
        </Route>
      </Route>
    </Routes>
  );
}

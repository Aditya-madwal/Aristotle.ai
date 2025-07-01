import React from "react";
import {
  Brain,
  Star,
  ArrowRight,
  Map,
  Calendar,
  Bot,
  BookOpen,
  CheckSquare,
  Shield,
  Github,
  LogIn,
  UserPlus,
  Database,
  FileText,
  Layers,
} from "lucide-react";

const AristotleLandingPage = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white/95 backdrop-blur-sm sticky top-0 z-50">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <img src="/icon.png" alt="logo" className="w-10 h-10" />
              <span className="text-xl font-bold text-gray-900">
                Aristotle.ai
              </span>
            </div>

            <div className="hidden md:flex items-center space-x-8">
              <a
                href="#features"
                className="text-gray-600 hover:text-gray-900 font-medium text-sm">
                Features
              </a>
              <a
                href="#tech-stack"
                className="text-gray-600 hover:text-gray-900 font-medium text-sm">
                Tech Stack
              </a>
              <a
                href="#demo"
                className="text-gray-600 hover:text-gray-900 font-medium text-sm">
                Demo
              </a>
            </div>

            <div className="flex items-center space-x-4">
              <a
                href="/auth/login"
                target="_blank"
                className="flex items-center space-x-2 px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors">
                <LogIn className="h-4 w-4" />
                <span className="text-sm font-medium">Login</span>
              </a>
              <a
                href="/auth/register"
                target="_blank"
                className="flex items-center space-x-2 px-3 py-2 bg-purple-600 text-white hover:bg-purple-700 rounded-md transition-colors">
                <UserPlus className="h-4 w-4" />
                <span className="text-sm font-medium">Sign Up</span>
              </a>
              <a
                href="https://github.com/aditya-madwal/aristotle.ai/"
                target="_blank"
                className="hidden sm:flex items-center space-x-2 px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors">
                <Github className="h-4 w-4" />
                <span className="text-sm font-medium">GitHub</span>
              </a>
            </div>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-gray-100 border border-gray-200 text-sm text-gray-700 mb-6">
            <span className="mr-2">🚀</span>
            Smart study management for students
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Student Productivity Management
            <br />
            <span className="text-purple-600">With AI Powered Roadmaps</span>
          </h1>

          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            A student productivity management app built with React.js and
            Django, leveraging Gemini AI for intelligent content generation, PDF
            summarization, and study planning.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <a
              href="/auth/register"
              target="_blank"
              className="inline-flex items-center px-6 py-3 bg-purple-600 text-white font-medium rounded-lg hover:bg-purple-700 transition-colors">
              Try Live Demo
              <ArrowRight className="ml-2 h-4 w-4" />
            </a>
            <a
              href="https://github.com/aditya-madwal/aristotle.ai/"
              target="_blank"
              className="inline-flex items-center px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors">
              <Github className="mr-2 h-4 w-4" />
              View on GitHub
            </a>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-8 max-w-3xl mx-auto">
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">React.js</div>
              <div className="text-sm text-gray-600">Frontend</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">Django</div>
              <div className="text-sm text-gray-600">Backend</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">
                Gemini AI
              </div>
              <div className="text-sm text-gray-600">Smart Features</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">
                PostgreSQL
              </div>
              <div className="text-sm text-gray-600">Database</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">IPFS</div>
              <div className="text-sm text-gray-600">File Storage</div>
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Powerful Features
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Built with modern technologies and AI integration for
              comprehensive student productivity management.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-200">
              <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center mb-4">
                <Map className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Roadmap Generation & Tracking
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Create and track study roadmaps with milestones and progress
                monitoring.
              </p>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-200">
              <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center mb-4">
                <Calendar className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Schedule Tracking
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Manage study schedules with reminders, deadlines, and automated
                notifications.
              </p>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-200">
              <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center mb-4">
                <Bot className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                AI-powered PDF Chat
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Upload PDFs, get AI-generated summaries, and chat with documents
                for insights.
              </p>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-200">
              <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center mb-4">
                <BookOpen className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Multiple Study Areas
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Organize studies into different subjects with multiple roadmap
                management.
              </p>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-200">
              <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center mb-4">
                <CheckSquare className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Smart To-Do Lists
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Efficient task management with labeled categorization.
              </p>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-200">
              <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center mb-4">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Secure Authentication
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                JWT-based authentication system with secure user management and
                data protection.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section id="tech-stack" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              ⚡ Modern Tech Stack
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Built with cutting-edge technologies for optimal performance and
              scalability
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg border border-gray-200 p-6 text-center hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-gray-900 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Brain className="h-6 w-6 text-white" />
              </div>
              <div className="text-sm text-gray-600 mb-1">Frontend</div>
              <div className="text-lg font-bold text-gray-900">React.js</div>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-6 text-center hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-gray-900 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Layers className="h-6 w-6 text-white" />
              </div>
              <div className="text-sm text-gray-600 mb-1">Backend</div>
              <div className="text-lg font-bold text-gray-900">
                Django & REST
              </div>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-6 text-center hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-gray-900 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Brain className="h-6 w-6 text-white" />
              </div>
              <div className="text-sm text-gray-600 mb-1">AI Integration</div>
              <div className="text-lg font-bold text-gray-900">Gemini AI</div>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-6 text-center hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-gray-900 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Database className="h-6 w-6 text-white" />
              </div>
              <div className="text-sm text-gray-600 mb-1">Database</div>
              <div className="text-lg font-bold text-gray-900">PostgreSQL</div>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-6 text-center hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-gray-900 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <div className="text-sm text-gray-600 mb-1">Authentication</div>
              <div className="text-lg font-bold text-gray-900">JWT Auth</div>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-6 text-center hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-gray-900 rounded-lg flex items-center justify-center mx-auto mb-4">
                <FileText className="h-6 w-6 text-white" />
              </div>
              <div className="text-sm text-gray-600 mb-1">Storage</div>
              <div className="text-lg font-bold text-gray-900">
                Secure File Storage (IPFS)
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Demo Section */}
      <section id="demo" className="py-20 bg-gray-50 text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Ready to Transform Your Study Habits?
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
            Try the live demo or explore the source code on GitHub. Built for
            students by developers.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/auth/register"
              className="inline-flex items-center px-6 py-3 bg-purple-600 text-white font-medium rounded-lg hover:bg-purple-700 transition-colors">
              Launch Demo
              <ArrowRight className="ml-2 h-4 w-4" />
            </a>
            <a
              href="https://github.com/aditya-madwal/aristotle.ai/"
              className="inline-flex items-center px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors">
              <Github className="mr-2 h-4 w-4" />
              Star on GitHub
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Brain className="h-8 w-8 text-purple-600" />
                <span className="text-xl font-bold text-gray-900">
                  Aristotle.ai
                </span>
              </div>
              <p className="text-gray-600 text-sm">
                Student productivity management for modern learners and
                achievers.
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Project</h4>
              <div className="space-y-2">
                <a
                  href="#features"
                  className="block text-gray-600 hover:text-gray-900 text-sm">
                  Features
                </a>
                <a
                  href="#tech-stack"
                  className="block text-gray-600 hover:text-gray-900 text-sm">
                  Tech Stack
                </a>
                <a
                  href="#demo"
                  className="block text-gray-600 hover:text-gray-900 text-sm">
                  Live Demo
                </a>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Open Source</h4>
              <div className="space-y-2">
                <a
                  href="https://github.com/aditya-madwal/aristotle.ai/"
                  target="_blank"
                  className="block text-gray-600 hover:text-gray-900 text-sm">
                  GitHub Repository
                </a>
                <a
                  href="https://github.com/aditya-madwal/aristotle.ai/issues"
                  target="_blank"
                  className="block text-gray-600 hover:text-gray-900 text-sm">
                  Report Issues
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-200 mt-8 pt-8 text-center">
            <p className="text-gray-600 text-sm">
              &copy; 2025 Aristotle.ai - Student Productivity Platform
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AristotleLandingPage;

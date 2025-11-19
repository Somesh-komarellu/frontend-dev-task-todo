import React, { useState, useContext } from 'react';
import { ShieldCheck, User } from 'lucide-react';
import { AuthContext, AuthProvider } from './context/AuthContext'; 
import Dashboard from './pages/Dashboard';
import { Button, Input, Card } from './components/UIComponents';

function AppContent() {
  const { user, login, register, loading } = useContext(AuthContext);
  const [authMode, setAuthMode] = useState('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [error, setError] = useState('');

  if (loading) return <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white">Loading...</div>;
  
 
  if (user) return <Dashboard />;

  const handleAuth = async (e) => {
    e.preventDefault();
    setError('');
    try {
      if (authMode === 'login') {
        await login(email, password);
      } else {
        await register(fullName, email, password);
      }
    } catch (err) {
      
      const msg = err.response?.data?.message || 'Authentication failed. Is the backend running on port 5000?';
      setError(msg);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background  Effects */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
         <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-indigo-600/20 blur-[120px]"></div>
         <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-violet-600/20 blur-[120px]"></div>
      </div>

      {/* Login/Register Card */}
      <Card className="w-full max-w-md relative z-10 bg-slate-900/80">
        <div className="text-center mb-8">
          <div className="mx-auto w-16 h-16 bg-gradient-to-br from-indigo-500 to-violet-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg">
            <ShieldCheck className="text-white w-8 h-8" />
          </div>
          <h1 className="text-3xl font-bold text-white">Dashboard Project</h1>
          <p className="text-slate-400">To-do tracker</p>
        </div>

        <form onSubmit={handleAuth} className="space-y-4">
          {authMode === 'register' && (
            <Input 
              label="Name" 
              icon={User} 
              value={fullName} 
              onChange={e => setFullName(e.target.value)} 
              placeholder="Enter your name"
            />
          )}
          <Input 
            label="Email" 
            type="email" 
            icon={User} 
            value={email} 
            onChange={e => setEmail(e.target.value)} 
            placeholder="name@company.com"
          />
          <Input 
            label="Password" 
            type="password" 
            icon={ShieldCheck} 
            value={password} 
            onChange={e => setPassword(e.target.value)} 
            placeholder="••••••••"
          />
          
          {error && (
            <div className="text-red-400 text-sm text-center bg-red-500/10 p-2 rounded border border-red-500/20">
              {error}
            </div>
          )}

          <Button type="submit" className="w-full py-3">
            {authMode === 'login' ? 'Sign In' : 'Create Account'}
          </Button>
        </form>

        <div className="mt-6 text-center text-slate-400 text-sm">
          <p>
            {authMode === 'login' ? "Don't have an account? " : "Already have an account? "}
            <button 
              onClick={() => {
                setAuthMode(authMode === 'login' ? 'register' : 'login');
                setError('');
              }} 
              className="text-indigo-400 font-bold hover:text-indigo-300 hover:underline transition-colors"
            >
              {authMode === 'login' ? 'Sign up' : 'Log in'}
            </button>
          </p>
        </div>
      </Card>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
import React, { useState, useEffect, useMemo, useContext } from 'react';
import { 
  LayoutDashboard, CheckSquare, Plus, Search, Trash2, Edit3, X, 
  CheckCircle2, Clock, AlertCircle, User, Menu, LogOut, ShieldCheck, Save 
} from 'lucide-react';
import { AuthContext } from '../context/AuthContext';
import api from '../services/api';
import { Button, Input, Card, Toast, StatusBadge } from '../components/UIComponents';

export default function Dashboard() {
  const { user, logout, updateProfile } = useContext(AuthContext);
  const [view, setView] = useState('dashboard');
  const [tasks, setTasks] = useState([]);
  const [taskModalOpen, setTaskModalOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [toast, setToast] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [editName, setEditName] = useState(user?.name || '');
  const [taskForm, setTaskForm] = useState({ title: '', description: '', status: 'pending' });


  const LOGO_URL = "https://play-lh.googleusercontent.com/_s_h8TV4JJk3GhCk0w4gpOIU9OAheSKCFp6YTpZ8R2EodA-rlcZd5omyX-dtfwcHhqY";
  const showToast = (msg, type = 'info') => setToast({ message: msg, type });

  const fetchTasks = async () => {
    try {
      const res = await api.get('/tasks');
      setTasks(res.data);
    } catch (error) {
      console.error(error);
      showToast('Error fetching tasks. Is backend running?', 'error');
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleSaveTask = async (e) => {
    e.preventDefault();
    if (!taskForm.title.trim()) return;
    try {
      if (currentTask) {
        await api.put(`/tasks/${currentTask._id}`, taskForm);
        showToast("Task updated", "success");
      } else {
        await api.post('/tasks', taskForm);
        showToast("Task created", "success");
      }
      closeModal();
      fetchTasks();
    } catch (err) { showToast("Failed to save", "error"); }
  };

  const handleDeleteTask = async (id) => {
    try { await api.delete(`/tasks/${id}`); showToast("Deleted", "info"); fetchTasks(); }
    catch (err) { showToast("Delete failed", "error"); }
  };

  const handleUpdateProfile = async () => {
    if (!editName.trim()) return showToast("Name required", "error");
    try {
      await updateProfile(editName);
      setIsEditingProfile(false);
      showToast("Profile Updated", "success");
    } catch (err) { showToast("Update failed", "error"); }
  };

  const openModal = (task = null) => {
    setCurrentTask(task);
    setTaskForm(task ? { title: task.title, description: task.description, status: task.status } : { title: '', description: '', status: 'pending' });
    setTaskModalOpen(true);
  };

  const closeModal = () => { setTaskModalOpen(false); setCurrentTask(null); };

  const filteredTasks = useMemo(() => tasks.filter(t => 
    (filter === 'all' || t.status === filter) && 
    (t.title.toLowerCase().includes(searchQuery.toLowerCase()) || t.description.toLowerCase().includes(searchQuery.toLowerCase()))
  ), [tasks, searchQuery, filter]);

  const stats = {
    total: tasks.length,
    completed: tasks.filter(t => t.status === 'completed').length,
    pending: tasks.filter(t => t.status === 'pending').length,
    inProgress: tasks.filter(t => t.status === 'in-progress').length,
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans flex overflow-hidden">
      <aside className={`fixed inset-y-0 left-0 z-40 w-64 bg-slate-900 border-r border-slate-800 transform transition-transform duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0`}>
        <div className="h-full flex flex-col">
          <div className="p-6 border-b border-slate-800 flex items-center gap-3">
            {/* Logo Section */}
            <img src={LOGO_URL} alt="Logo" className="w-8 h-8 object-contain" />
            <span className="font-bold text-xl tracking-tight text-white">Todo-App</span>
          </div>
          <nav className="flex-1 p-4 space-y-2">
            <button onClick={() => setView('dashboard')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${view === 'dashboard' ? 'bg-indigo-600/10 text-indigo-400 border border-indigo-600/20' : 'text-slate-400 hover:bg-slate-800'}`}><LayoutDashboard size={20} /><span className="font-medium">Dashboard</span></button>
            <button onClick={() => setView('profile')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${view === 'profile' ? 'bg-indigo-600/10 text-indigo-400 border border-indigo-600/20' : 'text-slate-400 hover:bg-slate-800'}`}><User size={20} /><span className="font-medium">Profile</span></button>
          </nav>
          <div className="p-4 border-t border-slate-800"><button onClick={logout} className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"><LogOut size={16} /> Sign Out</button></div>
        </div>
      </aside>

      <main className="flex-1 flex flex-col h-screen overflow-hidden relative">
        <header className="h-16 bg-slate-900/80 backdrop-blur-md border-b border-slate-800 flex items-center justify-between px-6 sticky top-0 z-30">
          <div className="flex items-center gap-4"><button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="md:hidden text-slate-400"><Menu size={24} /></button><h2 className="text-lg font-semibold text-white capitalize">{view}</h2></div>
         
        </header>

        <div className="flex-1 overflow-y-auto p-4 md:p-8">
          {view === 'dashboard' ? (
            <div className="max-w-6xl mx-auto space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {[{ label: 'Total', val: stats.total, color: 'text-white', icon: LayoutDashboard, bg: 'bg-indigo-500/20' }, { label: 'Done', val: stats.completed, color: 'text-emerald-400', icon: CheckCircle2, bg: 'bg-emerald-500/20' }, { label: 'Active', val: stats.inProgress, color: 'text-blue-400', icon: Clock, bg: 'bg-blue-500/20' }, { label: 'Pending', val: stats.pending, color: 'text-amber-400', icon: AlertCircle, bg: 'bg-amber-500/20' }].map((s, i) => (
                  <Card key={i} className="flex items-center justify-between p-5"><div><p className="text-slate-400 text-sm font-medium">{s.label}</p><h3 className={`text-3xl font-bold mt-1 ${s.color}`}>{s.val}</h3></div><div className={`w-12 h-12 rounded-xl flex items-center justify-center ${s.bg} ${s.color}`}><s.icon size={24} /></div></Card>
                ))}
              </div>

              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1 md:max-w-xs"><Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 w-4 h-4" /><input type="text" placeholder="Search..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} className="w-full bg-slate-800 border border-slate-700 text-slate-200 text-sm rounded-lg pl-9 pr-4 py-2.5 outline-none focus:border-indigo-500" /></div>
                <select value={filter} onChange={e => setFilter(e.target.value)} className="bg-slate-800 border border-slate-700 text-slate-200 text-sm rounded-lg px-4 py-2.5 outline-none"><option value="all">All</option><option value="pending">Pending</option><option value="in-progress">In Progress</option><option value="completed">Completed</option></select>
                <Button onClick={() => openModal()}><Plus size={18} /> New Task</Button>
              </div>

              <div className="space-y-3">
                {filteredTasks.map(task => (
                  <div key={task._id} className="group bg-slate-800/50 border border-slate-700 hover:border-indigo-500/30 rounded-xl p-4 transition-all flex items-center justify-between">
                    <div className="flex items-start gap-4"><div className={`mt-1 w-2 h-2 rounded-full ${task.status==='completed'?'bg-emerald-500':task.status==='in-progress'?'bg-blue-500':'bg-amber-500'}`}></div><div><h4 className="font-medium text-slate-200">{task.title}</h4><p className="text-sm text-slate-500">{task.description}</p></div></div>
                    <div className="flex items-center gap-4"><StatusBadge status={task.status} /><div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity"><button onClick={() => openModal(task)} className="p-2 hover:bg-indigo-500/10 text-slate-400 hover:text-indigo-400 rounded-lg"><Edit3 size={16}/></button><button onClick={() => handleDeleteTask(task._id)} className="p-2 hover:bg-red-500/10 text-slate-400 hover:text-red-400 rounded-lg"><Trash2 size={16}/></button></div></div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="max-w-2xl mx-auto">
               <Card>
                 <div className="flex justify-between mb-8 border-b border-slate-700 pb-8">
                   <div className="flex items-center gap-6"><div className="w-24 h-24 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-4xl font-bold text-white shadow-xl">{(user?.name||'U')[0].toUpperCase()}</div><div><h2 className="text-2xl font-bold text-white">{user?.name||'User'}</h2><p className="text-slate-400">Pro Member</p></div></div>
                   <Button variant={isEditingProfile?'ghost':'secondary'} onClick={()=>setIsEditingProfile(!isEditingProfile)}>{isEditingProfile?<X size={18}/>:<Edit3 size={18}/>} {isEditingProfile?'Cancel':'Edit'}</Button>
                 </div>
                 <div className="space-y-6">
                   <Input label="Display Name" value={editName} onChange={e=>setEditName(e.target.value)} disabled={!isEditingProfile} readOnly={!isEditingProfile} icon={User} />
                   <Input label="Email" value={user?.email} disabled readOnly icon={ShieldCheck} />
                   {isEditingProfile && <div className="flex justify-end"><Button onClick={handleUpdateProfile}><Save size={18}/> Save</Button></div>}
                 </div>
               </Card>
            </div>
          )}
        </div>
      </main>

      {taskModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="w-full max-w-lg bg-slate-900 border border-slate-700 rounded-2xl p-6 space-y-5">
            <div className="flex justify-between"><h3 className="text-lg font-semibold text-white">{currentTask?'Edit':'New'}</h3><button onClick={closeModal} className="text-slate-400"><X size={20}/></button></div>
            <form onSubmit={handleSaveTask} className="space-y-4">
              <Input label="Title" value={taskForm.title} onChange={e=>setTaskForm({...taskForm, title: e.target.value})} />
              <textarea rows="3" className="w-full bg-slate-950/50 border border-slate-700 text-slate-200 rounded-lg p-3" placeholder="Description" value={taskForm.description} onChange={e=>setTaskForm({...taskForm, description: e.target.value})}></textarea>
              <div className="grid grid-cols-3 gap-3">{['pending','in-progress','completed'].map(s=><button key={s} type="button" onClick={()=>setTaskForm({...taskForm, status: s})} className={`py-2 rounded-lg text-sm border ${taskForm.status===s?'border-indigo-500 text-indigo-400 bg-indigo-500/10':'border-slate-700 text-slate-400'}`}>{s}</button>)}</div>
              <div className="flex gap-3"><Button variant="ghost" onClick={closeModal} className="flex-1">Cancel</Button><Button type="submit" className="flex-1">Save</Button></div>
            </form>
          </div>
        </div>
      )}
      {toast && <Toast message={toast.message} type={toast.type} onClose={()=>setToast(null)} />}
    </div>
  );
}
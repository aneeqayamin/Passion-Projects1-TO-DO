'use client'


import React, { useState, useEffect, useRef, useMemo } from 'react';
import { createClient } from '@supabase/supabase-js';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShoppingBag, Settings, Plus, Layout, Save, 
  Trash2, CheckCircle2, Circle, ChevronRight, 
  ChevronDown, X, Play, Terminal, Shield, 
  Heart, Flower, Gamepad2, Monitor, AlertTriangle
} from 'lucide-react';
import { clsx } from 'clsx'; // Utility for clean class names

// --- CONFIGURATION ---
const SUPABASE_URL = 'https://aziybncsffpdpwrjlcgz.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF6aXlibmNzZmZwZHB3cmpsY2d6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA5ODg1NDEsImV4cCI6MjA4NjU2NDU0MX0.axEIu32nxXIYWfkmdyVFpwYa5O4dGkTP9CT23F30rsU';
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);


// THEME ENGINE (12 VARIATIONS)

const THEME_ENGINE = {
  professional: {
    label: "Professional",
    panel: 'bg-white',
    subtext: 'text-slate-500',
    accentText: 'text-red-600',
    text: 'text-slate-900',
    icon: Monitor,
    font: "font-sans",
    baseScale: "scale-100",

    labels: {
      folder: "Folder",
      task: "Task",
      enter: "Objective",
      new: "Folders"
    }, 
    variants: {
      dark: { id: 'prof_dark', name: 'Executive Dark', bg: 'bg-slate-900', panel: 'bg-black', text: 'text-[#ffffff]', subtext: 'text-[#ffffff]', border: 'border-slate-700', accent: 'bg-blue-600', accentText: 'text-white', progress: 'bg-white' },
      light: { id: 'prof_light', name: 'Studio Light', bg: 'bg-slate-75', panel: 'bg-white', text: 'text-slate-900', subtext: 'text-slate-900', border: 'border-slate-300', accent: 'bg-yellow-400', accentText: 'text-white', progress: 'bg-yellow-400' },
      gray: { id: 'prof_gray', name: 'Minimalist Gray', bg: 'bg-neutral-200', panel: 'bg-neutral-100', text: 'text-neutral-800', subtext: 'text-neutral-500', border: 'border-neutral-300', accent: 'bg-black', accentText: 'text-neutral-50', progress: 'bg-neutral-800' },
    }
  },
  retro: {
    label: "8-Bit Arcade",
    icon: Gamepad2,
    font: "font-['Press_Start_2P']", // Ensure you load this font in layout.js or css
    baseScale: "", 

    labels: {
      folder: "World",
      task: "Quest",
      enter: "Quest",
      new: "Quest"
    },

    variants: {
      classic: { id: 'retro_classic', name: 'Console Classic', bg: 'bg-[#212529]', panel: 'bg-black', text: 'text-[#cbd5e1]', subtext: 'text-slate-500', border: 'border-[#64748b]', accent: 'bg-slate-600', accentText: 'text-white', progress: 'bg-[#00ff00]' },
      dungeon: { id: 'retro_dungeon', name: 'Red Dungeon', bg: 'bg-[#1a0505]', panel: 'bg-[#2a0a0a]', text: 'text-[#ff5555]', subtext: 'text-red-900', border: 'border-[#ff5555]', accent: 'bg-[#ff5555]', accentText: 'text-white', progress: 'bg-[#ff5555]' },
      forest: { id: 'retro_forest', name: 'Elf Forest', bg: 'bg-[#051a05]', panel: 'bg-[#0a2a0a]', text: 'text-[#55ff55]', subtext: 'text-green-900', border: 'border-[#55ff55]', accent: 'bg-[#55ff55]', accentText: 'text-black', progress: 'bg-[#55ff55]' },
    }
  },
  flower: {
    label: "Botanical",
    icon: Flower,
    font: "font-serif",
    baseScale: "scale-100",

    labels: {
      folder: "Garden",
      task: "Flowers",
      enter: "Bloom",
      new: "Bloom"
    },

    variants: {
      rose: { id: 'flower_rose', name: 'Dusty Rose', bg: 'bg-[#fff0f5]', panel: 'bg-white', text: 'text-[#8b4a62]', subtext: 'text-[#d6aebc]', border: 'border-[#ffc0cb]', accent: 'bg-[#db7093]', accentText: 'text-white', progress: 'bg-[#db7093]' },
      sun: { id: 'flower_sun', name: 'Golden Hour', bg: 'bg-[#fffff0]', panel: 'bg-white', text: 'text-[#8b4513]', subtext: 'text-[#deb887]', border: 'border-[#f0e68c]', accent: 'bg-[#daa520]', accentText: 'text-slate-100', progress: 'bg-[#daa520]' },
      lav: { id: 'flower_lav', name: 'Deep Lavender', bg: 'bg-[#f3e5f5]', panel: 'bg-white', text: 'text-[#4a148c]', subtext: 'text-[#ce93d8]', border: 'border-[#e1bee7]', accent: 'bg-[#8e24aa]', accentText: 'text-[#ce93d8]', progress: 'bg-[#8e24aa]' },
    }
  },
  valentine: {
    label: "Valentine",
    icon: Heart,
    fontfamily: "Playwrite Cuba Guides",
    fontstyle:"normal",
    baseScale: "scale-105",

    labels: {
      folder: "Love File",
      task: "Tasks",
      enter: "Task",
      new: "Love File"
    },

    variants: {
      love: { id: 'val_love', name: 'True Love', bg: 'bg-red-50', panel: 'bg-white', text: 'text-red-600', subtext: 'text-red-300', border: 'border-red-200', accent: 'bg-red-500', accentText: 'text-white', progress: 'bg-red-500' },
      heartbreak: { id: 'val_heartbreak', name: 'Midnight Heart', bg: 'bg-neutral-900', panel: 'bg-black', text: 'text-[#f472b6]', subtext: 'text-pink-500', border: '[#ec4899]', accent: 'bg-pink-600', accentText: 'text-black-600', progress: 'bg-pink-600' },
      passion: { id: 'val_passion', name: 'Deep Passion', bg: 'bg-[#4a0404]', panel: 'bg-[#660000]', text: 'text-white', subtext: 'text-red-200', border: 'border-red-500', accent: 'bg-red-600', accentText: 'text-red-500', progress: 'bg-red-600' },
    }
  }
};

// --- CONSTANTS ---
const SHOP_INVENTORY = {
  themes: [
    { id: 'professional', price: 0, name: "Professional Suite", variants: ['prof_dark', 'prof_light', 'prof_gray'] },
    { id: 'retro', price: 500, name: "8-Bit Collection", variants: ['retro_classic', 'retro_dungeon', 'retro_forest'] },
    { id: 'flower', price: 300, name: "Botanical Garden", variants: ['flower_rose', 'flower_sun', 'flower_lav'] },
    { id: 'valentine', price: 300, name: "Cupid's Quiver", variants: ['val_love', 'val_heartbreak', 'val_passion'] }
  ],
  bots: [
    { id: 'bot_default', price: 0, icon: '/ivan.jpeg', name: 'Ivan' },
    { id: 'bot_girl', price: 150, icon: '/till.jpeg', name: '' },
    { id: 'bot_dragon', price: 500, icon: '🐉', name: 'Zhongli' },
    { id: 'bot_alien', price: 200, icon: '👽', name: 'Fish' },
    { id: 'bot_cat', price: 1000, icon: '😼', name: 'Mr. Meowmeow' },
  ]
};

const DEFAULT_TEMPLATES = [
  { name: "Morning Routine", tasks: ["Make Bed", "Hydrate (500ml)", "Stretch (5 min)", "Review Goals"] },
  { name: "Code Sprint", tasks: ["Pull Latest Changes", "Review Tickets", "Deep Work (90m)", "Commit & Push"] },
  { name: "Workout", tasks: ["Warmup", "Compound Lifts", "Cardio", "Cooldown"] }
];

// --- COMPONENT: CUSTOM ALERT (TOAST) ---
const ToastSystem = ({ alerts, removeAlert, theme }) => (
  <div className="fixed top-4 right-4 z-9999 flex flex-col gap-2 pointer-events-none">
    <AnimatePresence>
      {alerts.map((alert) => (
        <motion.div
          key={alert.id}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className={`pointer-events-auto min-w-300px p-4 rounded shadow-lg border-l-4 flex items-center gap-3 backdrop-blur-md ${theme.panel} ${theme.border} ${theme.text}`}
        >
          {alert.type === 'success' ? <CheckCircle2 size={20} className="text-green-500" /> : <Shield size={20} className="text-red-500" />}
          <div className="flex flex-col">
            <span className="font-bold text-sm">{alert.title}</span>
            <span className="text-xs opacity-80">{alert.message}</span>
          </div>
        </motion.div>
      ))}
    </AnimatePresence>
  </div>
);

// --- MAIN APPLICATION ---
export default function QuestEngineUltimate() {
  // 1. STATE MANAGEMENT
  const [session, setSession] = useState(null);
  const [view, setView] = useState('tasks'); // 'tasks', 'shop', 'forge', 'settings'
  
  // Data State
  const [folders, setFolders] = useState([]);
  const [selectedFolder, setSelectedFolder] = useState(null);
  const [todos, setTodos] = useState([]);
  const [subtasks, setSubtasks] = useState({});
  const [blueprints, setBlueprints] = useState([]);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  
  // UI State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('folder'); // 'folder' or 'blueprint'
  const [alerts, setAlerts] = useState([]);
  const [expandedTasks, setExpandedTasks] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  // User Prefs & Economy
  const [coins, setCoins] = useState(100);
  const [ownedThemes, setOwnedThemes] = useState(['professional']);
  const [ownedBots, setOwnedBots] = useState(['bot_default']);
  const [activeMasterTheme, setActiveMasterTheme] = useState('professional');
  const [activeSubTheme, setActiveSubTheme] = useState('dark');
  const [activeBot, setActiveBot] = useState('bot_default');
  const [fontSize, setFontSize] = useState('text-base'); // text-sm, text-base, text-lg

  // Inputs
  const [inputTask, setInputTask] = useState('');
  const [inputSub, setInputSub] = useState({});
  const [inputFolderName, setInputFolderName] = useState('');
  const [inputFolderEmoji, setInputFolderEmoji] = useState('📁');
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [chatInput, setChatInput] = useState('');
  const chatInputRef = useRef(null); // Helps with auto-focus if you want
  
  const [chatLog, setChatLog] = useState([]);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isAiThinking, setIsAiThinking] = useState(false);

  // Refs
  const chatEndRef = useRef(null);

  // 2. HELPERS & UTILITIES
  const addAlert = (title, message, type = 'success') => {
    const id = Date.now();
    setAlerts(prev => [...prev, { id, title, message, type }]);
    setTimeout(() => setAlerts(prev => prev.filter(a => a.id !== id)), 4000);
  };


  const currentTheme = React.useMemo(() => {
  const master = THEME_ENGINE[activeMasterTheme];
  // Ensure we are looking for the right key
  const variant = master.variants[activeSubTheme] || master.variants.light || Object.values(master.variants)[0];
  
  return { 
    ...variant, 
    font: master.font, 
    scale: master.baseScale,
    labels: master.labels // This adds your new labels to currentTheme too!
  };
}, [activeMasterTheme, activeSubTheme]);

  // 3. INITIALIZATION & DATA FETCHING
  useEffect(() => {
    // Font Loader
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Press+Start+2P&family=Inter:wght@400;600;800&family=Playfair+Display:ital,wght@0,400;1,400&family=Dancing+Script:wght@700&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);

    // Local Storage Load
    const loadLocal = () => {
      const savedCoins = localStorage.getItem('qe_coins');
      const savedThemes = localStorage.getItem('qe_themes');
      const savedBots = localStorage.getItem('qe_bots');
      const savedActiveTheme = localStorage.getItem('qe_active_theme');
      const savedSubTheme = localStorage.getItem('qe_active_sub');
      const savedFont = localStorage.getItem('qe_font');

      if (savedCoins) setCoins(parseInt(savedCoins));
      if (savedThemes) setOwnedThemes(JSON.parse(savedThemes));
      if (savedBots) setOwnedBots(JSON.parse(savedBots));
      if (savedActiveTheme) setActiveMasterTheme(savedActiveTheme);
      if (savedSubTheme) setActiveSubTheme(savedSubTheme);
      if (savedFont) setFontSize(savedFont);
    };

    loadLocal();
    fetchData();
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const [fData, tData, bData] = await Promise.all([
        supabase.from('folders').select('*').order('created_at'),
        supabase.from('todos').select('*').order('id'),
        supabase.from('blueprints').select('*').order('created_at')
      ]);

      if (fData.data) setFolders(fData.data);
      if (tData.data) {
        setTodos(tData.data);
        // Lazy load substeps for existing tasks
        tData.data.forEach(t => fetchSubtasks(t.id));
      }
      if (bData.data) setBlueprints(bData.data);
    } catch (e) {
      addAlert('Connection Error', 'Failed to sync with headquarters.', 'error');
    } finally {
      setIsLoading(false);
    }
  };


  useEffect(() => {
  if (isChatOpen) {
    const timer = setTimeout(() => {
      chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
    return () => clearTimeout(timer);
  }
}, [isChatOpen, chatLog]);


  const fetchSubtasks = async (todoId) => {
    const { data } = await supabase.from('subtasks').select('*').eq('todo_id', todoId).order('id');
    if (data) setSubtasks(prev => ({ ...prev, [todoId]: data }));
  };

  // 4. ACTION HANDLERS

  // --- Task Management ---



  const deleteFolderTasks = async (folderId) => {
  if (!selectedFolder) return;

  const { error } = await supabase
    .from('todos')
    .delete()
    .eq('folder_id', folderId);

  if (!error) {
    // Update local state to remove the deleted tasks
    setTodos(todos.filter(t => t.folder_id !== folderId));
    addAlert('Folder Cleared', 'All objectives in this folder have been purged.');
  } else {
    addAlert('Error', 'Failed to clear the sector.');
  }
};

  



  const createNewTask = async (title) => {
  const newTask = {
    title: title,
    folder_id: selectedFolder?.id || null, 
    is_completed: false
  };

  const { data, error } = await supabase.from('todos').insert([newTask]).select().single();
  
  if (!error) {
    setTodos(prev => [...prev, data]);
    if (fetchSubtasks) fetchSubtasks(data.id);
    addAlert('Task Deployed', `Objective "${data.title}" initiated.`);
    return data;
  }
  return null;
};

  const handleAddTask = async (e, task) => {
    e.preventDefault();
    if (!inputTask.trim()) return;

    const newTask = {
      title: inputTask,
      folder_id: selectedFolder?.id || null,
      is_completed: false
    };

    const { data, error } = await supabase.from('todos').insert([newTask]).select().single();
    if (!error) {
      setTodos([...todos, data]);
      setInputTask('');
      fetchSubtasks(data.id);
      addAlert('Task Deployed', `Objective "${data.title}" initiated.`);
    }
  };

  const handleDeleteTask = async (taskId) => {
  // 1. Optimistically update UI
  setTodos(prev => prev.filter(t => t.id !== taskId));
  
  // 2. Delete from Supabase
  const { error } = await supabase
    .from('todos')
    .delete()
    .eq('id', taskId);

  if (error) {
    addAlert('Error', 'Failed to delete task from database.', 'error');
    // Optional: Refresh data if delete fails to bring task back
    fetchData();
  } else {
    addAlert('Task Deleted!', 'Objective removed!.');
  }
};
  
  const handleToggleTask = (task) => {
  const newTasks = todos.map((t) => { 
    // Match the ID
    if (t.id === task.id) {
      // Use is_completed (with the underscore) to match your JSX
      return { ...t, is_completed: !t.is_completed };
    }
    return t;
  });

  setTodos(newTasks); 
};


  const handleAddSubtask = async (todoId) => {
    const title = inputSub[todoId];
    if (!title?.trim()) return;

    const { data, error } = await supabase.from('subtasks').insert([{ title, todo_id: todoId, is_completed: false }]).select().single();
    
    if (!error) {
      setSubtasks(prev => ({ ...prev, [todoId]: [...(prev[todoId] || []), data] }));
      setInputSub(prev => ({ ...prev, [todoId]: '' }));
    }
  };

  const handleToggleSubtask = async (todoId, subId, currentStatus) => {
    const { error } = await supabase.from('subtasks').update({ is_completed: !currentStatus }).eq('id', subId);
    if (!error) {
      setSubtasks(prev => ({
        ...prev,
        [todoId]: prev[todoId].map(s => s.id === subId ? { ...s, is_completed: !currentStatus } : s)
      }));
      if (!currentStatus) handleReward(5); // Smaller reward for subtask
    }
  };

  const calculateProgress = (todoId) => {
    const subs = subtasks[todoId] || [];
    if (subs.length === 0) return todos.find(t => t.id === todoId)?.is_completed ? 100 : 0;
    const completed = subs.filter(s => s.is_completed).length;
    return Math.round((completed / subs.length) * 100);
  };

  // --- Folder & Blueprint Management ---
  const handleCreateFolder = async () => {
    if (!inputFolderName.trim()) return;

    const { data: folderData, error } = await supabase
      .from('folders')
      .insert([{ name: inputFolderName, emoji: inputFolderEmoji }])
      .select()
      .single();

    if (error) {
      addAlert('Creation Failed', error.message, 'error');
      return;
    }

    // Apply Template if selected
    if (selectedTemplate) {
      const tasksToCreate = selectedTemplate.tasks.map(t => ({
        title: t,
        folder_id: folderData.id,
        is_completed: false
      }));
      
      const { data: taskData } = await supabase.from('todos').insert(tasksToCreate).select();
      if (taskData) setTodos([...todos, ...taskData]);
    }

    setFolders([...folders, folderData]);
    setIsModalOpen(false);
    resetModalInputs();
    addAlert('Folder Created', `${inputFolderName} can now be used.`);
  };

  const handleSaveBlueprint = async () => {
    if (!inputFolderName.trim()) return;
    
    // We create a blueprint based on the manual tasks array from the user (simulated here)
    // For this demo, let's assume saving a blueprint saves a generic template structure
    // In a real app, you'd have a UI to add tasks to the blueprint *inside* the modal
    const tasks = selectedTemplate ? selectedTemplate.tasks : ["Task 1", "Task 2"]; 

    const { data, error } = await supabase
      .from('blueprints')
      .insert([{ name: inputFolderName, emoji: inputFolderEmoji, tasks: tasks }])
      .select()
      .single();

    if (!error) {
      setBlueprints([...blueprints, data]);
      setIsModalOpen(false);
      addAlert('Blueprint Forged', 'Template saved to Arsenal.');
    }
  };

  const resetModalInputs = () => {
    setInputFolderName('');
    setInputFolderEmoji('📁');
    setSelectedTemplate(null);
  };

  // --- Economy & Shop ---
  const handleReward = (amount) => {
    const newBalance = coins + amount;
    setCoins(newBalance);
    localStorage.setItem('qe_coins', newBalance);
  };

  const handlePurchase = (item, type) => {
    if (coins < item.price) {
      addAlert('Insufficient Funds', 'Complete more objectives to earn coins.', 'error');
      return;
    }
    
    const newBalance = coins - item.price;
    setCoins(newBalance);
    localStorage.setItem('qe_coins', newBalance);

    if (type === 'theme') {
      const newOwned = [...ownedThemes, item.id];
      setOwnedThemes(newOwned);
      localStorage.setItem('qe_themes', JSON.stringify(newOwned));
      addAlert('Purchase Successful', 'New visual suite acquired.');
    } else {
      const newOwned = [...ownedBots, item.id];
      setOwnedBots(newOwned);
      localStorage.setItem('qe_bots', JSON.stringify(newOwned));
      addAlert('Purchase Successful', 'New AI companion operational.');
    }
  };

  const applyTheme = (masterId, subId) => {
    setActiveMasterTheme(masterId);
    setActiveSubTheme(subId);
    localStorage.setItem('qe_active_theme', masterId);
    localStorage.setItem('qe_active_sub', subId);
    addAlert('System Update', 'Visual parameters reconfigured.');
  };

  // --- Settings ---
  const executeHardReset = async () => {
    // 1. Clear Supabase Data (The "Server" Reset)
  const { error: todoError } = await supabase
    .from('todos')
    .delete()
    .neq('id', 0); // This is a trick to say "Delete everything"

  const { error: subError } = await supabase
    .from('subtasks')
    .delete()
    .neq('id', 0);

  const { error: folderError } = await supabase
    .from('folders')
    .delete()
    .neq('id', 0);

  if (todoError || subError || folderError) {
    addAlert('Reset Failed', 'Could not clear database storage.', 'error');
    return;
  }

  // 2. Clear Local State (The "UI" Reset)
  setTodos([]);
  setSubtasks({});
  setFolders([]);
  setCoins(1300); // Or your starting balance
  setActiveMasterTheme('professional');
  setActiveSubTheme('light');
  
  // 3. Clear LocalStorage (The "Memory" Reset)
  localStorage.clear();

  addAlert('System Purged', 'All data has been wiped.', 'success');
};
  // --- Chatbot Logic (Groq) ---
  const handleChatSubmit = async (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    
    const userMsg = { role: 'user', text: chatInput };
    setChatLog(prev => [...prev, userMsg]);
    setChatInput('');
    setIsAiThinking(true);

    try {
      const taskListStr = todos.map(t => `${t.title} [${t.is_completed ? 'DONE' : 'TODO'}]`).join(', ');
      
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          activeMasterTheme: activeMasterTheme,
          taskList: taskListStr, 
          userMsgText: userMsg.text
        })
      });

      // 1. Get the data from the response
      const data = await res.json();
      
      // 2. Extract the actual message content from Groq's structure
      let aiText = data.choices[0].message.content;

      // 3. SCAN FOR COMMANDS
      // This looks for [ADD_TASK: Any Text Here]
      const taskMatch = aiText.match(/\[ADD_TASK:\s*(.*?)\]/);

      if (taskMatch) {
        const newTaskTitle = taskMatch[1];
        
        // 4. CALL THE BRAIN!
        // This triggers the Supabase save, the list update, and the Alert
        await createNewTask(newTaskTitle);

        // 5. CLEAN THE UI
        // Remove the bracketed code so the user doesn't see it
        aiText = aiText.replace(/\[ADD_TASK:.*?\]/, " (Objective Recorded! ✅)");
      }

      // 6. Update the chat log with the cleaned response
      const aiMsg = { role: 'ai', text: aiText };
      setChatLog(prev => [...prev, aiMsg]);
   } catch (err) {
      console.error(err);
      setChatLog(prev => [...prev, { role: 'ai', text: "System Error: " + err.message }]);
    } finally {
      setIsAiThinking(false);
    } // This closes the finally block
  }; // This closes the handleChatSubmit function (and the semicolon goes here!)

  // 5. RENDER HELPERS
  const renderModal = () => {
    if (!isModalOpen) return null;

    return (
    <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className={`w-full max-w-lg ${currentTheme.panel} ${currentTheme.border} border-2 shadow-2xl rounded-xl p-8 overflow-hidden`}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className={`text-2xl font-bold ${currentTheme.text}`}>
            {modalMode === 'folder' ? 'New Sector' : 'Forge Blueprint'}
          </h2>
          <button onClick={() => setIsModalOpen(false)}><X className={currentTheme.subtext} /></button>
        </div>

        <div className="space-y-6">
          <div className="flex gap-4">
            <div className="w-1/4">
              <label className={`block text-xs font-bold mb-2 ${currentTheme.subtext}`}>ICON</label>
              <input 
                className={`w-full text-center text-3xl p-2 rounded bg-transparent border-2 ${currentTheme.border} focus:outline-none`}
                value={inputFolderEmoji}
                onChange={e => setInputFolderEmoji(e.target.value)}
              />
            </div>
            <div className="w-3/4">
              <label className={`block text-xs font-bold mb-2 ${currentTheme.subtext}`}>DESIGNATION</label>
              <input 
                className={`w-full p-3 rounded bg-transparent border-2 ${currentTheme.border} ${currentTheme.text} focus:outline-none`}
                placeholder="Enter Name"
                value={inputFolderName}
                onChange={e => setInputFolderName(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label className={`block text-xs font-bold mb-2 ${currentTheme.subtext}`}>LOAD TEMPLATE (OPTIONAL)</label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
              {[...DEFAULT_TEMPLATES, ...blueprints].map((temp, i) => (
                <button 
                  key={i}
                  onClick={() => setSelectedTemplate(temp)}
                  className={`p-3 text-left border rounded transition-all ${selectedTemplate?.name === temp.name ? `${currentTheme.accent} ${currentTheme.accentText}` : `border-dashed ${currentTheme.border} ${currentTheme.subtext} hover:opacity-100 opacity-60`}`}
                >
                  <div className="font-bold text-sm truncate">{temp.emoji || '📜'} {temp.name}</div>
                  <div className="text-[10px] opacity-70">{temp.tasks?.length || 0} tasks</div>
                </button>
              ))}
            </div>
          </div>

          <button 
            onClick={modalMode === 'folder' ? handleCreateFolder : handleSaveBlueprint}
            className={`w-full py-4 mt-4 font-bold rounded shadow-lg transition-transform active:scale-95 ${currentTheme.accent} ${currentTheme.accentText}`}
          >
            {modalMode === 'folder' ? 'CREATE FOLDER' : 'SAVE BLUEPRINT'}
          </button>
        </div>
      </motion.div>
    </div>
  );
  }; 

  // --- MAIN RENDER ---
  return (
    <div className={`min-h-screen w-full transition-colors duration-500 ${currentTheme.bg} ${currentTheme.font} ${fontSize} overflow-hidden flex`}>
      <ToastSystem alerts={alerts} removeAlert={() => {}} theme={currentTheme} />
      {renderModal()}

      {/* --- SIDEBAR NAVIGATION --- */}
      <motion.aside 
        initial={{ x: -100 }} animate={{ x: 0 }}
        className={`w-64 border-r ${currentTheme.border} flex flex-col ${currentTheme.panel} z-10`}
      >
        <div className={`p-6 border-b ${currentTheme.border} flex items-center gap-3`}>
          <div className={`p-2 rounded ${currentTheme.accent}`}>
            {(() => {
  // This looks for the icon. If it's missing, it uses 'Layout' as a backup.
  const IconComponent = currentTheme.icon || Layout;
  return <IconComponent size={24} className={currentTheme.accentText} />;
})()}
          </div>
          <div>
            <h1 className={`font-bold leading-none ${currentTheme.text}`}>TASK MASTER</h1>
            <p className={`text-[10px] ${currentTheme.subtext} mt-1`}>V.3.0</p>
          </div>
        </div>

       <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
  <button 
    onClick={() => { setView('tasks'); setSelectedFolder(null); }} 
    className={`w-full flex items-center gap-3 p-3 rounded transition-all 
      ${view === 'tasks' && !selectedFolder 
        ? `${currentTheme.accent} ${currentTheme.accentText}` 
        : `${currentTheme.text} hover:bg-current/10` // "current" uses the text color as the hover tint!
      }`}
  >
    <Layout size={18} /> MAIN MENU
  </button>
  
  <div className={`text-[16px] font-bold ${currentTheme.subtext} mt-6 mb-2 px-3 uppercase tracking-wider`}>
    {THEME_ENGINE[activeMasterTheme].labels.folder.toUpperCase()}s
  </div>
  
  {/* FOLDER LIST */}
  {folders.map(f => (
    <button 
      key={f.id} 
      onClick={() => { setView('tasks'); setSelectedFolder(f); }}
      className={`w-full flex items-center justify-between p-3 rounded transition-colors 
        ${selectedFolder?.id === f.id 
          ? `${currentTheme.accent} ${currentTheme.accentText}` 
          : `${currentTheme.text} hover:bg-current/10` // Use bg-current/10 for adaptive hover
        }`}
    >
      <div className="flex items-center gap-3">
        <motion.span
          animate={{ transform: ["translateY(0px)", "translateY(-6px)", "translateY(0px)"] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          style={{ display: "inline-block", willChange: "transform" }}
        >
          {f.emoji}
        </motion.span>
        <span className="truncate">{f.name}</span>
      </div>
      <ChevronRight size={14} className="opacity-50" />
    </button>
  ))}
  
  {/* NEW FOLDER BUTTON */}
  <button 
    onClick={() => { setModalMode('folder'); setIsModalOpen(true); }} 
    className={`w-full flex items-center gap-2 p-3 mt-2 border-dashed border-2 rounded transition-all
      ${currentTheme.border} ${currentTheme.subtext} 
      hover:bg-current/5 hover:opacity-100 opacity-60 text-xs justify-center`}
  >
    <Plus size={14} /> {('NEW')} {(currentTheme.labels?.folder || 'FOLDER').toUpperCase()}
  </button>
</nav>

<div className={`p-4 border-t ${currentTheme.border} space-y-2`}>
  <button onClick={() => setView('shop')} className={`w-full flex items-center gap-3 p-3 rounded ${view === 'shop' ? 'bg-black/10' : ''} ${currentTheme.text}`}>
    <ShoppingBag size={18} /> Shop <span className="ml-auto text-xs font-bold text-yellow-500">{coins} 🪙</span>
  </button>
  <button onClick={() => setView('forge')} className={`w-full flex items-center gap-3 p-3 rounded ${view === 'forge' ? 'bg-black/10' : ''} ${currentTheme.text}`}>
    <Terminal size={18} /> Blueprint Forge
  </button>
  <button onClick={() => setView('settings')} className={`w-full flex items-center gap-3 p-3 rounded ${view === 'settings' ? 'bg-black/10' : ''} ${currentTheme.text}`}>
    <Settings size={18} /> Settings
  </button>
</div>
</motion.aside>

      {/* --- MAIN CONTENT AREA --- */}
      <main className="flex-1 relative overflow-hidden flex flex-col">
        {/* VIEW: TASKS */}
        {view === 'tasks' && (
          <div className="flex-1 overflow-y-auto p-12">
            <header className="mb-12 flex items-end gap-6">
              <motion.span className="text-6xl inline-block"
           animate={{ 
           transform: ["translateY(0px)", "translateY(-8px)", "translateY(0px)"] 
           }}
           transition={{ 
            duration: 4, 
            repeat: Infinity, 
            ease: "easeInOut" 
            }}>
           {selectedFolder?.emoji || '🗺️'}</motion.span>
              <div>
                <h2 className={`text-4xl font-bold ${currentTheme.text}`}>{selectedFolder?.name || 'ALL TASKS'}</h2>
                <div className={`h-1 w-24 mt-4 rounded-full ${currentTheme.progress}`} />
              </div>


              {/* --- NEW BUTTON BLOCK START --- */}
  {selectedFolder && (
    <button
      onClick={() => deleteFolderTasks(selectedFolder.id)}
      className={`mb-2 flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-medium transition-all
        ${currentTheme.border} ${currentTheme.subtext} 
        hover:bg-red-500 hover:text-white hover:border-red-500 hover:shadow-lg`}
    >
      <Trash2 size={16} />
      Clear {currentTheme.labels.folder}
    </button>
  )}
  {/* --- NEW BUTTON BLOCK END --- */}
            </header>

            <form onSubmit={handleAddTask} className="mb-8 flex gap-4">
              <input 
                className={`flex-1 p-4 rounded text-lg bg-transparent border-2 ${currentTheme.border} ${currentTheme.text} placeholder:opacity-50 focus:outline-none focus:ring-2`}
                placeholder={`Enter new ${THEME_ENGINE[activeMasterTheme].labels.enter.toLowerCase()}...`}
                value={inputTask}
                onChange={e => setInputTask(e.target.value)}
              />
              <button type="submit" className={`px-8 rounded font-bold shadow-lg transition-transform active:scale-95 ${currentTheme.accent} ${currentTheme.accentText}`}>+</button>
            </form>

            <div className="space-y-4 pb-20">
              <AnimatePresence>
                {todos.filter(t => !selectedFolder || t.folder_id === selectedFolder.id).sort((a, b) => {
   
                        if (a.is_completed && !b.is_completed) return 1;
                        if (!a.is_completed && b.is_completed) return -1;
                
                return 0;
  })
                
                
                .map(todo => (
                  <motion.div 


                    key={todo.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className={`group border ${currentTheme.border} rounded-lg overflow-hidden ${currentTheme.panel} shadow-sm transition-shadow hover:shadow-md`}
                  >
                    
                    <div className="p-4 flex items-center gap-4">
                      <button onClick={() => handleToggleTask(todo)} className={`transition-transform active:scale-90 ${todo.is_completed ? 'opacity-100' : 'opacity-100'}`}>
                        {todo.is_completed ? <CheckCircle2 size={24} className={currentTheme.accentText} /> : <Circle size={24} className={currentTheme.subtext} />}
                      </button>
                      
                      <span className={`flex-1 text-lg ${todo.is_completed ? 'line-through opacity-50' : ''} ${currentTheme.text}`}>{todo.title}</span>
                      
                      <button onClick={() => setExpandedTasks(p => ({...p, [todo.id]: !p[todo.id]}))} className={`text-xs px-3 py-1 border rounded ${currentTheme.border} ${currentTheme.subtext}`}>
                        {expandedTasks[todo.id] ? 'Collapse' : 'Substeps'}
                      </button>
                    

                    {/* DELETE BUTTON - Insert this right here! */}
                     <button 
                onClick={(e) => {
              e.stopPropagation();
               handleDeleteTask(todo.id);
               }} 
              className={`p-1.5 rounded text-red-500 hover:bg-red-500/10 opacity-0 group-hover:opacity-100 transition-all`}
             >
               <Trash2 size={18} />
               </button>
              </div>

                    {/* Substeps Area */}
                    <AnimatePresence>
                      {expandedTasks[todo.id] && (
                        <motion.div 
                          initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }}
                          className="bg-black/5 px-12 py-4 border-t border-dashed border-gray-500/20"
                        >
                          {/* Dynamic Progress Bar */}
                          <div className="mb-4 flex items-center gap-3">
                            <div className="flex-1 h-2 bg-gray-300 rounded-full overflow-hidden">
                              <motion.div 
                                className={`h-full ${currentTheme.progress}`} 
                                initial={{ width: 0 }} 
                                animate={{ width: `${calculateProgress(todo.id)}%` }} 
                              />
                            </div>
                            <span className={`text-xs font-bold ${currentTheme.subtext}`}>{calculateProgress(todo.id)}%</span>
                          </div>

                          <div className="space-y-2 mb-4">
                            {(subtasks[todo.id] || []).map(sub => (
                              <div key={sub.id} className="flex items-center gap-3">
                                <button onClick={() => handleToggleSubtask(todo.id, sub.id, sub.is_completed)}>
                                  {sub.is_completed ? <div className={`w-4 h-4 rounded ${currentTheme.accent}`} /> : <div className={`w-4 h-4 rounded border ${currentTheme.border}`} />}
                                </button>
                                <span className={`text-sm ${sub.is_completed ? 'line-through opacity-50' : ''} ${currentTheme.text}`}>{sub.title}</span>
                              </div>
                            ))}
                          </div>

                          <div className="flex gap-2">
                            <input 
                              className={`flex-1 bg-transparent border-b ${currentTheme.border} text-sm focus:outline-none ${currentTheme.text}`}
                              placeholder="Add micro-step..."
                              value={inputSub[todo.id] || ''}
                              onChange={e => setInputSub({...inputSub, [todo.id]: e.target.value})}
                              onKeyDown={e => e.key === 'Enter' && handleAddSubtask(todo.id)}
                            />
                            <button onClick={() => handleAddSubtask(todo.id)} className={`text-xs font-bold ${currentTheme.accentText}`}>ADD</button>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        )}

        {/* VIEW: SHOP */}
        {view === 'shop' && (
          <div className="flex-1 overflow-y-auto p-12">
            <h2 className={`text-4xl font-bold mb-8 ${currentTheme.text}`}>Marketplace</h2>
            
            {/* Themes Section */}
            <div className="mb-12">
              <h3 className={`text-xl font-bold mb-4 ${currentTheme.subtext}`}>Visual Suites</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {SHOP_INVENTORY.themes.map(item => {
                  const isOwned = ownedThemes.includes(item.id);
                  const isMasterActive = activeMasterTheme === item.id;
                  
                  return (
                    <div key={item.id} className={`p-6 border-2 rounded-xl relative overflow-hidden group ${currentTheme.panel} ${currentTheme.border} hover:scale-105 transition-transform`}>
                      <div className="flex justify-between items-start mb-4">
                        <span className={`font-bold ${currentTheme.text}`}>{item.name}</span>
                        {!isOwned && <span className="bg-yellow-500 text-black text-xs font-bold px-2 py-1 rounded">{item.price} 🪙</span>}
                      </div>
                      
                      {isOwned ? (
                        <div className="space-y-2">
                         <p className={`text-xs opacity-60 mb-2 ${currentTheme.subtext}`}>SELECT VARIANT:</p>
                          <div className="flex flex-wrap gap-2">
                            {item.variants.map(vId => {
                              const variantName = vId.split('_')[1];
                              const isActive = activeSubTheme === variantName && isMasterActive;
                              return (
                                <button 
                                  key={vId} 
                                  onClick={() => applyTheme(item.id, variantName)}
                                  className={`flex-1 py-2 text-xs border rounded capitalize ${isActive ? `${currentTheme.accent} ${currentTheme.accentText} border-transparent` : `${currentTheme.border} ${currentTheme.subtext}`}`}
                                >
                                  {variantName}
                                </button>
                              )
                            })}
                          </div>
                        </div>
                      ) : (
                        <button onClick={() => handlePurchase(item, 'theme')} className={`w-full py-2 border-2 ${currentTheme.border} ${currentTheme.text} font-bold rounded mt-4 hover:bg-current hover:text-white transition-colors`}>
                          PURCHASE
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Bots Section */}
            <div>
              <h3 className={`text-xl font-bold mb-4 ${currentTheme.subtext}`}>AI Companions</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {SHOP_INVENTORY.bots.map(bot => {
                  const isOwned = ownedBots.includes(bot.id);
                  return (
                    <div key={bot.id} className={`p-4 border rounded text-center ${currentTheme.panel} ${currentTheme.border}`}>
                      <div className={`w-16 h-16 mx-auto mb-2 rounded-full flex items-center justify-center overflow-hidden ${currentTheme.border}`}>

                      {typeof bot.icon === 'string' && bot.icon.includes('/') ? (
                        <img 
                          src={bot.icon} 
                          alt={bot.name} 
                          className="w-full h-full object-cover" 
                         />): (
                                <span className="text-4xl">{bot.icon}</span>
                               
                              )
                            }

                      </div>
                      
                      <div className={`font-bold text-sm ${currentTheme.text}`}>{bot.name}</div>
                      <button 
                        onClick={() => isOwned ? setActiveBot(bot.id) : handlePurchase(bot, 'bot')}
                        className={`mt-3 w-full text-xs py-2 rounded font-bold ${isOwned ? (activeBot === bot.id ? 'bg-green-500 text-white cursor-default' : 'bg-gray-200 text-gray-800') : 'bg-yellow-500 text-black'}`}
                      >
                        {isOwned ? (activeBot === bot.id ? 'ACTIVE' : 'EQUIP') : `${bot.price} 🪙`}
                      </button>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        )}

        {/* VIEW: FORGE (BLUEPRINTS) */}
        {view === 'forge' && (
          <div className="flex-1 overflow-y-auto p-12">
            <div className="flex justify-between items-center mb-8">
              <h2 className={`text-4xl font-bold ${currentTheme.text}`}>Blueprint Arsenal</h2>
              <button onClick={() => { setModalMode('blueprint'); setIsModalOpen(true); }} className={`px-6 py-3 rounded font-bold ${currentTheme.accent} ${currentTheme.accentText}`}>
                + CREATE TEMPLATE
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {blueprints.length === 0 && <div className={`col-span-3 text-center py-20 opacity-50 ${currentTheme.text}`}>No custom blueprints found. Forge one to begin.</div>}
              {blueprints.map(bp => (
                <div key={bp.id} className={`p-6 border rounded-xl ${currentTheme.panel} ${currentTheme.border}`}>
                  <div className="text-4xl mb-4">{bp.emoji}</div>
                  <h3 className={`text-xl font-bold ${currentTheme.text}`}>{bp.name}</h3>
                  <div className={`mt-4 space-y-2 pl-4 border-l-2 ${currentTheme.border}`}>
                    {(bp.tasks || []).slice(0, 3).map((t, i) => (
                      <div key={i} className={`text-sm opacity-70 ${currentTheme.text}`}>• {t}</div>
                    ))}
                    {(bp.tasks?.length || 0) > 3 && <div className="text-xs opacity-50 italic">+{bp.tasks.length - 3} more...</div>}
                  </div>
                  <div className="mt-6 flex gap-2">
                    <button className={`flex-1 py-2 text-xs font-bold border rounded ${currentTheme.border} ${currentTheme.text}`}>EDIT</button>
                    <button className={`p-2 border rounded text-red-500 border-red-200 hover:bg-red-50`}><Trash2 size={16} /></button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* VIEW: SETTINGS */}
        {view === 'settings' && (
          <div className="flex-1 overflow-y-auto p-12">
            <h2 className={`text-4xl font-bold mb-12 ${currentTheme.text}`}>System Configuration</h2>
            
            <div className={`max-w-2xl border rounded-xl overflow-hidden ${currentTheme.border} ${currentTheme.panel}`}>
              {/* Font Config */}
              <div className="p-6 border-b border-gray-200/10">
                <label className={`block font-bold mb-4 ${currentTheme.text}`}>Font Scale (Text Size)</label>
                <div className="flex gap-4">
                  {['text-sm', 'text-base', 'text-lg'].map(size => (
                    <button 
                      key={size}
                      onClick={() => { setFontSize(size); localStorage.setItem('qe_font', size); }}
                      className={`flex-1 py-3 border rounded ${fontSize === size ? `${currentTheme.accent} ${currentTheme.accentText}` : `${currentTheme.border} ${currentTheme.text}`}`}
                    >
                      {size.replace('text-', '').toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>

              {/* Data Management */}
              <div className="p-6 bg-red-500/5">
                <label className="block font-bold mb-2 text-red-600">Danger Zone</label>
                <p className="text-xs text-red-600 mb-4">Hey! This is a spooky zone, buddy. Click with caution.</p>
                <button onClick={() => setShowResetConfirm(true)} className="px-6 py-3 bg-red-700 text-white font-bold rounded hover:bg-red-700 transition-colors">
                  HARD RESET
                </button>
              </div>
            </div>
          </div>
        )}

        {/* --- GLOBAL CHATBOT WIDGET --- */}
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end pointer-events-none">
          <AnimatePresence>
            {isChatOpen && (
              <motion.div 
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.9 }}
                className={`pointer-events-auto w-80 h-96 mb-4 rounded-xl shadow-2xl flex flex-col border-2 overflow-hidden ${currentTheme.panel} ${currentTheme.border}`}
              >
                <div className={`p-3 border-b ${currentTheme.subtext} bg-black/5 flex justify-between items-center`}>
                  <span className={`text-xs font-bold ${currentTheme.text}`}>AI ASSISTANT</span>
                  <button onClick={() => setIsChatOpen(false)}><X size={14} className={currentTheme.subtext} /></button>
                </div>
                
                <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar">
                  {chatLog.map((msg, i) => (
                    <div key={i} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                      <div className={`max-w-[85%] p-2 rounded text-xs ${msg.role === 'user' ? `${currentTheme.accent} ${currentTheme.panel}` : `bg-black/10 ${currentTheme.text}`}`}>
                        {msg.text}
                      </div>
                    </div>
                  ))}
                  {isAiThinking && <div className="text-xs opacity-50 animate-pulse ml-2">Thinking...</div>}
                  <div ref={chatEndRef} />
                </div>

                <form onSubmit={handleChatSubmit} className={`p-2 border-t ${currentTheme.border}`}>
                  <div className="flex gap-2">
                    <input 
                      className={`flex-1 bg-transparent text-xs p-2 focus:outline-none ${currentTheme.text} placeholder:${currentTheme.subtext} placeholder:opacity-50`}
                      placeholder="Say hi!"
                      value={chatInput}
                      onChange={e => setChatInput(e.target.value)}

                      style={{ 
                        
                        
                        
                        color: currentTheme.text.includes('[#') 
                           ? currentTheme.text.match(/#[a-fA-F0-9]+/)[0] 
                           : currentTheme.text.replace('text-', ''),
    
                           WebkitTextFillColor:  currentTheme.text.includes('[#') 
                          ? currentTheme.text.match(/#[a-fA-F0-9]+/)[0] 
                           : 'currentColor',
      
                            caretColor: 'currentColor', // The blinking cursor will now match your theme color!
                            appearance: 'none'
                        
                      
                      }}
                    />
                    <button type="submit" className={`p-2 rounded hover:bg-black/10 ${currentTheme.text}`}><Play size={14} /></button>
                  </div>
                </form>
              </motion.div>
            )}
          </AnimatePresence>

          <button 
            onClick={() => setIsChatOpen(!isChatOpen)}
            className={`pointer-events-auto w-16 h-16 rounded-full shadow-xl border-4 ${currentTheme.border} ${currentTheme.panel} flex items-center justify-center text-3xl hover:scale-110 transition-transform`}
          >
            {(() => {
  const activeBotData = SHOP_INVENTORY.bots.find(b => b.id === activeBot);
  const icon = activeBotData?.icon || '🤖';

  return typeof icon === 'string' && icon.includes('/') ? (
    <img src={icon} alt="bot" className="w-12 h-12 rounded-full object-cover" />
  ) : (
    <span className="text-4xl">{icon}</span>
  );
})()}
          </button>
        </div>
        {/* --- PASTE THE RESET MODAL HERE --- */}
        <AnimatePresence>
          {showResetConfirm && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-999 flex items-center justify-center bg-black/80 backdrop-blur-md p-4"
            >
              <motion.div 
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                className={`max-w-md w-full p-8 rounded-3xl border-4 shadow-2xl ${currentTheme.panel} border-red-600`}
              >
                <div className="text-red-500 flex justify-center mb-6">
                  <AlertTriangle size={64} className="animate-bounce" />
                </div>
                
                <h3 className="text-3xl font-black text-center mb-4 text-red-500 uppercase italic">
                  Total Wipeout?
                </h3>
                
                <p className={`text-center mb-8 text-lg font-medium ${currentTheme.text}`}>
                  This will delete <span className="text-red-500 font-bold">EVERYTHING</span>. 
                  Tasks, folders, and coins. You will start from zero, like a rat in NYC.
                </p>
                
                <div className="flex flex-col gap-3">
                  <button 
                    onClick={() => {
                      executeHardReset();
                      setShowResetConfirm(false);
                    }}
                    className="w-full py-4 rounded-xl bg-red-600 text-white font-black hover:bg-red-700 transition-all shadow-lg shadow-red-900/40 uppercase"
                  >
                    Yes, Purge Everything
                  </button>
                  
                  <button 
                    onClick={() => setShowResetConfirm(false)}
                    className={`w-full py-3 rounded-xl font-bold ${currentTheme.text} opacity-50 hover:opacity-100 transition-all`}
                  >
                    No, take me back! Uwaaaah!
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      

      </main>
    </div>
  );
  }

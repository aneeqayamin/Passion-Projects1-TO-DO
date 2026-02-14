'use client'
import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';

export default function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');

  
  useEffect(() => {
    fetchTodos();
  }, []);

  async function fetchTodos() {
    const { data } = await supabase.from('todos').select('*').order('id', { ascending: true });
    setTodos(data || []);
  }

  // 2. Add a new manual task
  async function addTodo(e) {
    e.preventDefault();
    if (!newTodo) return;
    const { error } = await supabase.from('todos').insert([{ title: newTodo }]);
    if (!error) {
      setNewTodo('');
      fetchTodos();
    }
  }

  // 3. Load the "Daily Routine" from your Database
  async function loadDailyTemplate() {
    const { data, error } = await supabase
      .from('todos')
      .select('*')
      .eq('is_template', true);
    
    if (data) {
      // Create new copies of the template items
      const newTasks = data.map(item => ({ title: item.title, is_complete: false }));
      await supabase.from('todos').insert(newTasks);
      fetchTodos();
    }
  }

  // 4. Toggle Complete
  async function toggleComplete(id, currentState) {
    await supabase.from('todos').update({ is_complete: !currentState }).eq('id', id);
    fetchTodos();
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-xl shadow-lg border border-gray-200">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">My Daily Focus</h1>
      
      <button 
        onClick={loadDailyTemplate}
        className="w-full mb-6 bg-purple-100 text-purple-700 py-2 rounded-lg font-medium hover:bg-purple-200 transition"
      >
        ✨ Load "Daily Routine" Template
      </button>

      <form onSubmit={addTodo} className="flex gap-2 mb-6">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add a quick task..."
          className="flex-1 border rounded-lg px-3 py-2 outline-none focus:border-purple-500"
        />
        <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700">Add</button>
      </form>

      <ul className="space-y-3">
        {todos.map((todo) => (
          <li key={todo.id} className="flex items-center gap-3 p-2 border-b last:border-0">
            <input 
              type="checkbox" 
              checked={todo.is_complete} 
              onChange={() => toggleComplete(todo.id, todo.is_complete)}
              className="w-5 h-5 accent-purple-600"
            />
            <span className={todo.is_complete ? "line-through text-gray-400" : "text-gray-700"}>
              {todo.title}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
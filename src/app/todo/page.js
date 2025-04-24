'use client';

import { useState } from 'react';

// 動物顏文字列表
const animalEmojis = [
  '🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼', '🐨', '🐯',
  '🦁', '🐮', '🐷', '🐸', '🐵', '🐔', '🐧', '🐦', '🐤', '🦆',
  '🦅', '🦉', '🦇', '🐺', '🐗', '🐴', '🦄', '🐝', '🐛', '🦋',
  '🐌', '🐞', '🐜', '🦗', '🕷️', '🦂', '🐢', '🐍', '🦎', '🦖',
  '🦕', '🐙', '🦑', '🦐', '🦞', '🦀', '🐡', '🐠', '🐟', '🐬',
  '🐳', '🐋', '🦈', '🐊', '🐅', '🐆', '🦓', '🦍', '🦧', '🦣',
  '🐘', '🦛', '🦏', '🐪', '🐫', '🦒', '🦘', '🦬', '🐃', '🐂',
  '🐄', '🐎', '🐖', '🐏', '🐑', '🦙', '🐐', '🦌', '🐕', '🐩',
  '🦮', '🐕‍🦺', '🐈', '🐈‍⬛', '🪶', '🦃', '🦤', '🦚', '🦜', '🦢',
  '🦩', '🕊️', '🐇', '🦝', '🦨', '🦡', '🦫', '🦦', '🦥', '🐁',
  '🐀', '🐿️', '🦔'
];

export default function TodoList() {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editValue, setEditValue] = useState('');

  // 獲取隨機動物顏文字
  const getRandomAnimalEmoji = () => {
    const randomIndex = Math.floor(Math.random() * animalEmojis.length);
    return animalEmojis[randomIndex];
  };

  // 創建新的待辦事項
  const handleAddTodo = () => {
    if (inputValue.trim()) {
      const newTodo = {
        id: Date.now(),
        text: inputValue,
        emoji: getRandomAnimalEmoji(),
        completed: false
      };
      setTodos([...todos, newTodo]);
      setInputValue('');
    }
  };

  // 刪除待辦事項
  const handleDeleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  // 更新待辦事項狀態
  const handleToggleTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  // 開始編輯
  const handleStartEdit = (todo) => {
    setEditingId(todo.id);
    setEditValue(todo.text);
  };

  // 保存編輯
  const handleSaveEdit = (id) => {
    if (editValue.trim()) {
      setTodos(todos.map(todo =>
        todo.id === id ? { ...todo, text: editValue } : todo
      ));
      setEditingId(null);
      setEditValue('');
    }
  };

  // 取消編輯
  const handleCancelEdit = () => {
    setEditingId(null);
    setEditValue('');
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">待辦事項列表</h1>
      <div className="flex gap-3 mb-6">
        <input
          type="text"//可以更改為number、email...限制打出來的字的類型
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="輸入新的待辦事項..."
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button 
          onClick={handleAddTodo}
          className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
        >
          新增
        </button>
      </div>
      <ul className="space-y-3">
        {todos.map(todo => (
          <li 
            key={todo.id} 
            className="flex items-center p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow"
          >
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => handleToggleTodo(todo.id)}
              className="w-5 h-5 mr-3 text-blue-500 rounded focus:ring-blue-500"
            />
            {editingId === todo.id ? (
              <div className="flex-1 flex gap-2">
                <input
                  type="text"
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                  className="flex-1 px-3 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  autoFocus
                />
                <button
                  onClick={() => handleSaveEdit(todo.id)}
                  className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                >
                  保存
                </button>
                <button
                  onClick={handleCancelEdit}
                  className="px-3 py-1 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
                >
                  取消
                </button>
              </div>
            ) : (
              <>
                <span className="text-2xl mr-2">{todo.emoji}</span>
                <span className={`flex-1 ${todo.completed ? 'line-through text-gray-500' : ''}`}>
                  {todo.text}
                </span>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleStartEdit(todo)}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    編輯
                  </button>
                  <button
                    onClick={() => handleDeleteTodo(todo.id)}
                    className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                  >
                    刪除
                  </button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}





{/*"use client"

import { useEffect, useState } from "react";

export default function TODO() {

  const[count,setCount]=useState(0)  

  const addCount=function(){
    setCount(count+1);
  }

  useEffect(()=>{
    console.log("count 改變:"+count)
  },[count]);
  
  return (
    <>
        <div>TODO</div>
        <div onClick={addCount}>點擊次數:{count}</div>
    </>
  );

}*/}



import { useState } from 'react';
import type { User } from '../../types';

interface ProfileSwitcherProps {
  currentUser: User;
  users: User[];
  onUserChange: (userId: string) => void;
}

export function ProfileSwitcher({ currentUser, users, onUserChange }: ProfileSwitcherProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors"
      >
        {/* Avatar */}
        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-semibold">
          {currentUser.name.split(' ').map(n => n[0]).join('')}
        </div>

        {/* Info */}
        <div className="flex-1 text-left">
          <p className="text-sm font-medium text-gray-900">{currentUser.name}</p>
          <p className="text-xs text-gray-500">{currentUser.position}</p>
        </div>

        {/* Chevron */}
        <svg
          className={`w-5 h-5 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />

          {/* Menu */}
          <div className="absolute left-0 right-0 mt-2 bg-white rounded-lg shadow-lg border border-gray-200 z-20 overflow-hidden">
            <div className="p-2 border-b border-gray-100">
              <p className="text-xs text-gray-500 px-2">Переключить профиль</p>
            </div>
            {users.map((user) => (
              <button
                key={user.id}
                onClick={() => {
                  onUserChange(user.id);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center gap-3 p-3 hover:bg-gray-50 transition-colors ${
                  user.id === currentUser.id ? 'bg-blue-50' : ''
                }`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                  user.id === currentUser.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-600'
                }`}>
                  {user.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div className="flex-1 text-left">
                  <p className="text-sm font-medium text-gray-900">{user.name}</p>
                  <p className="text-xs text-gray-500">
                    {user.position} • {user.employeeYear} год
                  </p>
                </div>
                {user.id === currentUser.id && (
                  <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                )}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

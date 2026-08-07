import React, { useState } from 'react'
import { Client, Account } from 'appwrite'

const ENDPOINT = import.meta.env.VITE_PUBLIC_ENDPOINT;
const PROJECT_ID = import.meta.env.VITE_PUBLIC_PROJECT_ID;

const client = new Client()
  .setEndpoint(ENDPOINT)
  .setProject(PROJECT_ID);

export const account = new Account(client);

const AuthForm = ({ setAuthenticated }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await account.createEmailPasswordSession(email, password); // ← fixed method
      setAuthenticated(true);
    } catch (err) {
      setError(err?.message || 'Error al iniciar sesión');
    }
  };

  return (
    <div className="flex flex-col w-full max-w-sm h-screen mx-auto p-8 bg-white rounded-2xl shadow-xl border border-gray-100">
      <div className="mb-8 text-center">
        <h2 className="text-2xl font-bold text-gray-800">Bienvenido</h2>
        <p className="text-sm text-gray-500 mt-2">Inicia sesión para continuar</p>
      </div>

      <form className="space-y-5" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-1.5 ml-1">
            Usuario
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 outline-none"
            required
          />
        </div>

        <div>
          <div className="flex justify-between items-center mb-1.5 ml-1">
            <label htmlFor="password" className="text-sm font-semibold text-gray-700">
              Contraseña
            </label>
          </div>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 outline-none"
            required
          />
        </div>

        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

        <button
          type="submit"
          className="w-full py-3.5 px-4 bg-linear-to-r from-[#5289e7] to-[#65f8d8] hover:from-[#65f8d8] hover:to-[#5289e7] text-white font-bold rounded-xl shadow-md hover:shadow-lg transform active:scale-[0.98] transition-all duration-300 mt-2"
        >
          Iniciar Sesión
        </button>
      </form>
    </div>
  );
};

export default AuthForm;
import React from 'react'

const AuthForm = () => {
  return (
    <div className="flex flex-col w-full max-w-sm h-screen mx-auto p-8 bg-white rounded-2xl shadow-xl border border-gray-100">
        {/* Header Section */}
        <div className="mb-8 text-center">
            <h2 className="text-2xl font-bold text-gray-800">Bienvenido</h2>
            <p className="text-sm text-gray-500 mt-2">Inicia sesión para continuar</p>
        </div>

        <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
            {/* User/Email Field */}
            <div>
            <label 
                htmlFor="email" 
                className="block text-sm font-semibold text-gray-700 mb-1.5 ml-1"
            >
                Correo electrónico
            </label>
            <input
                id="email"
                type="email"
                placeholder="nombre@ejemplo.com"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 outline-none"
                required
            />
            </div>

            {/* Password Field */}
            <div>
            <div className="flex justify-between items-center mb-1.5 ml-1">
                <label 
                htmlFor="password" 
                className="text-sm font-semibold text-gray-700"
                >
                Contraseña
                </label>
                <a href="#" className="text-xs font-medium text-indigo-600 hover:text-indigo-500 transition">
                ¿Olvidaste tu contraseña?
                </a>
            </div>
            <input
                id="password"
                type="password"
                placeholder="••••••••"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 outline-none"
                required
            />
            </div>

            {/* Submit Button */}
            <button
            type="submit"
            className="w-full py-3.5 px-4 bg-linear-to-r from-[#5289e7] to-[#65f8d8] hover:from-[#65f8d8] hover:to-[#5289e7] text-white font-bold rounded-xl shadow-md hover:shadow-lg transform active:scale-[0.98] transition-all duration-300 mt-2"
            >
            Iniciar Sesión
            </button>
        </form>

        {/* Footer Section */}
        <div className="mt-8 text-center">
            <p className="text-sm text-gray-600">
            ¿No tienes una cuenta?{' '}
            <a href="#" className="font-bold text-indigo-600 hover:underline transition">
                Regístrate
            </a>
            </p>
        </div>
        </div>
  )
}

export default AuthForm

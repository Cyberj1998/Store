import React from 'react'
import useCartStore from '../store/CartSlice'

const CodeModal = ({ total, code, setModalCode }) => {

  const clearCart = useCartStore(state=>state.clearCart)   

  const handleModalCode = () => {
    setModalCode(prev => !prev)
    clearCart()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm transition-opacity">
      <div className="relative w-[90%] max-w-md bg-white rounded-2xl shadow-2xl p-8 animate-in fade-in zoom-in duration-200">
        {/* Close button */}
        <button
          onClick={()=>handleModalCode()}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
            <h2 className="text-xl font-bold text-gray-900">Transferencia bancaria</h2>
          </div>
          <p className="text-sm text-gray-500 mt-1">
            Complete el pago para confirmar su orden
          </p>
        </div>

        {/* Payment details */}
        <div className="space-y-4 mb-6">
          <div className="bg-linear-to-r from-blue-50 to-indigo-50 rounded-xl p-4">
            <p className="text-sm text-gray-600 mb-1">Total a pagar</p>
            <p className="text-3xl font-bold text-gray-900">${total}</p>
          </div>

          <div className="bg-gray-50 rounded-xl p-4 space-y-3">
            <div>
              <p className="text-sm text-gray-500">Número Zelle</p>
              <p className="text-lg font-semibold text-gray-900">54152354</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Código de su compra</p>
              <p className="text-lg font-semibold text-gray-900">{code}</p>
            </div>
          </div>

          {/* Important notice */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
            <div className="flex items-start gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-600 mt-0.5 shrink-0" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              <p className="text-sm text-yellow-800 font-medium">
                Importante: Debe incluir el código de compra en la descripción de la transferencia, de lo contrario no podremos verificar su pago.
              </p>
            </div>
          </div>
        </div>

        <button
          onClick={()=>handleModalCode()}
          className="w-full cursor-pointer bg-gray-900 hover:bg-gray-800 text-white font-semibold py-3 px-6 rounded-xl transition-colors"
        >
          Entendido
        </button>
      </div>
    </div>
  )
}

export default CodeModal

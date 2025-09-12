import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchTransactions } from '../redux/transactionsSlice';
import { Link, useNavigate } from 'react-router-dom';

function TransactionsList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { list: transactions, status, error } = useSelector(
    (state) => state.transactions
  );

  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');

  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  useEffect(() => {
    if (!token) {
      navigate('/login');
      return;
    }
    if (status === 'idle') dispatch(fetchTransactions());
  }, [token, status, dispatch, navigate]);

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const balance = transactions.reduce((total, tx) => total + tx.amount, 0);

  // ✅ Filtering logic
  const filteredTransactions = transactions.filter((tx) => {
    const matchTitle = tx.title.toLowerCase().includes(searchTerm.toLowerCase());
    if (filterType === 'income') return tx.amount >= 0 && matchTitle;
    if (filterType === 'expense') return tx.amount < 0 && matchTitle;
    return matchTitle;
  });

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading transactions...</p>
        </div>
      </div>
    );
  }
  if (status === 'failed') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-600">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* ---------- Header ---------- */}
      <header className="bg-indigo-600 text-white shadow-lg">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h1 className="text-2xl font-bold">CoinKeeper</h1>
          </div>

          {token ? (
            <div className="flex items-center space-x-4">
              <span className="hidden md:inline text-md">
                Hello, <span className="font-semibold text-2xl">{user.name || 'User'}</span>
              </span>
              <span className={`hidden md:inline px-2 py-1 rounded-full text-xs font-medium ${balance >= 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                Balance: ${balance.toFixed(2)}
              </span>

              <button
                onClick={() => navigate('/add')}
                className="px-4 py-2 bg-white text-indigo-600 font-medium rounded-lg shadow hover:bg-indigo-50 transition flex items-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Add Transaction
              </button>

              <button
                onClick={logout}
                className="px-4 py-2 bg-white text-indigo-600 font-medium rounded-lg shadow hover:bg-indigo-50 transition"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="px-4 py-2 bg-white text-indigo-600 font-medium rounded-lg shadow hover:bg-indigo-50 transition"
            >
              Login
            </Link>
          )}
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {!token ? (
          <div className="text-center py-12">
            <h2 className="text-2xl font-semibold text-gray-700">Welcome to CoinKeeper</h2>
            <p className="text-gray-500 mt-2">Please log in to manage your finances</p>
          </div>
        ) : (
          <>
            <div className="bg-white rounded-lg shadow p-4 mb-6 flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
              <input
                type="text"
                placeholder="Search by title..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full md:w-1/2 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-800"
              />
              <div className="flex space-x-2">
                <button
                  onClick={() => setFilterType('all')}
                  className={`px-3 py-1 rounded-md text-sm font-medium ${
                    filterType === 'all' ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700'
                  }`}
                >
                  All
                </button>
                <button
                  onClick={() => setFilterType('income')}
                  className={`px-3 py-1 rounded-md text-sm font-medium ${
                    filterType === 'income' ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-700'
                  }`}
                >
                  Income
                </button>
                <button
                  onClick={() => setFilterType('expense')}
                  className={`px-3 py-1 rounded-md text-sm font-medium ${
                    filterType === 'expense' ? 'bg-red-600 text-white' : 'bg-gray-200 text-gray-700'
                  }`}
                >
                  Expense
                </button>
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800">Your Transactions</h2>
              <div className="flex items-center space-x-4 mt-2">
                <span className="text-sm text-gray-500">{filteredTransactions.length} transactions</span>
                <span className="text-sm text-gray-500">•</span>
                <span className={`text-sm font-medium ${balance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  Net {balance >= 0 ? 'Income' : 'Loss'}: ${Math.abs(balance).toFixed(2)}
                </span>
              </div>
            </div>

            {filteredTransactions.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-xl shadow-sm p-6 max-w-md mx-auto">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
                <h3 className="text-xl font-medium text-gray-600 mt-4">No transactions found</h3>
                <p className="text-gray-500 mt-2">Try changing your search or filter</p>
                <button
                  onClick={() => navigate('/add')}
                  className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
                >
                  Add Transaction
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredTransactions.map((tx) => (
                  <div
                    key={tx._id}
                    className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition"
                  >
                    <div className="p-5">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold text-lg">{tx.title}</h3>
                          <div className="text-sm text-gray-500 mt-1">
                            {new Date(tx.date).toLocaleDateString()}
                          </div>
                        </div>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            tx.amount >= 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                          }`}
                        >
                          {tx.amount >= 0 ? '+' : ''}
                          {tx.amount}
                        </span>
                      </div>
                      <div className="mt-3 text-sm text-gray-600">
                        <span className="bg-gray-100 px-2 py-1 rounded-md">
                          {tx.category}
                        </span>
                      </div>
                    </div>
                    <div className="px-5 py-3 bg-gray-50 flex justify-end space-x-2">
                      <button
                        onClick={() => navigate(`/${tx._id}/edit`)}
                        className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 transition"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => navigate(`/${tx._id}/delete`)}
                        className="px-3 py-1 text-sm bg-red-100 text-red-700 rounded-md hover:bg-red-200 transition"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}

export default TransactionsList;

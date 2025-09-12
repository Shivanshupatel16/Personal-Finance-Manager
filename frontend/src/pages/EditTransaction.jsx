import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner'; 

function EditTransaction() {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchTransaction = async () => {
      try {
        const res = await axios.get('/api/transactions/' + id, {
          headers: { Authorization: 'Bearer ' + token }
        });
        setData(res.data);
      } catch (error) {
        console.error('Error fetching transaction:', error);
          toast.error(err.response?.data?.message || 'Error in fetching transaction');
      }
    };
    fetchTransaction();
  }, [id, token]);

  const submit = async (e) => {
    e.preventDefault();
    try {
      await axios.put('/api/transactions/' + id, {
        ...data,
        amount: Number(data.amount)
      }, {
        headers: { Authorization: 'Bearer ' + token }
      });
      navigate('/');
    } catch (error) {
      console.error('Error updating transaction:', error);
    }
  };

  if (!data) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading transaction...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Edit Transaction</h2>
          <button
            onClick={() => navigate('/')}
            className="text-gray-500 hover:text-gray-700"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <form onSubmit={submit} className="space-y-4">
          <div>
            <label htmlFor="edit-title" className="block text-sm font-medium text-gray-700">
              Title
            </label>
            <input
              id="edit-title"
              value={data.title}
              onChange={e => setData({ ...data, title: e.target.value })}
              className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div>
            <label htmlFor="edit-amount" className="block text-sm font-medium text-gray-700">
              Amount
            </label>
            <input
              id="edit-amount"
              type="number"
              step="0.01"
              value={data.amount}
              onChange={e => setData({ ...data, amount: e.target.value })}
              className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div>
            <label htmlFor="edit-date" className="block text-sm font-medium text-gray-700">
              Date
            </label>
            <input
              id="edit-date"
              type="date"
              value={new Date(data.date).toISOString().slice(0, 10)}
              onChange={e => setData({ ...data, date: e.target.value })}
              className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div>
            <label htmlFor="edit-category" className="block text-sm font-medium text-gray-700">
              Category
            </label>
            <input
              id="edit-category"
              value={data.category}
              onChange={e => setData({ ...data, category: e.target.value })}
              className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div className="pt-4">
            <button
              type="submit"
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
export default EditTransaction;
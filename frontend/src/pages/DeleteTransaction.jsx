import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner'; 

function DeleteTransaction() {
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
         toast.error(err.response?.data?.message);
      }
    };
    fetchTransaction();
  }, [id, token]);

  const remove = async () => {
    try {
      await axios.delete('/api/transactions/' + id, {
        headers: { Authorization: 'Bearer ' + token }
      });
      toast.success('Transaction deleted successful!');
      navigate('/');
    } catch (error) {
      console.error('Error deleting transaction:', error);
        toast.error(err.response?.data?.message || 'Error in deleting transaction');
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
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Delete Transaction</h2>
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">
                Are you sure you want to delete this transaction? This action cannot be undone.
              </p>
            </div>
          </div>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg mb-6">
          <h3 className="font-medium text-gray-900">{data.title}</h3>
          <div className="mt-2 grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600">Amount</p>
              <p className={`font-medium ${data.amount >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {data.amount >= 0 ? '+' : ''}{data.amount}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Date</p>
              <p className="font-medium text-gray-900">{new Date(data.date).toLocaleDateString()}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Category</p>
              <p className="font-medium text-gray-900">{data.category}</p>
            </div>
          </div>
        </div>
        <div className="flex space-x-3">
          <button
            onClick={() => navigate('/')}
            className="flex-1 py-3 px-4 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Cancel
          </button>
          <button
            onClick={remove}
            className="flex-1 py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
export default DeleteTransaction;
import PropTypes from 'prop-types';

const Deletepop = ({ message, onCancel, onDelete }) => {
  return (
    <div className="fixed z-50 inset-0 overflow-y-auto">
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-gray-800 bg-opacity-75 w-full h-full absolute"></div>
      <div className="relative bg-white rounded-lg p-8 max-w-md w-full">
        <div className="text-center">
          <p className="text-xl font-bold">{message}</p>
          {/* Image can be added here if needed */}
        </div>
        <div className="flex justify-center mt-6">
          <button onClick={onCancel} className="mr-4 px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold rounded-lg focus:outline-none focus:shadow-outline">
            Cancel
          </button>
          <button onClick={onDelete} className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg focus:outline-none focus:shadow-outline">
            Delete
          </button>
        </div>
      </div>
    </div>
  </div>
  )
}
Deletepop.propTypes = {
  message: PropTypes.string.isRequired,
  onCancel: PropTypes.func.isRequired, // Add onCancel prop validation
  onDelete: PropTypes.func.isRequired,
};

export default Deletepop
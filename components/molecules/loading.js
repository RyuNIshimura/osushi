export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 bg-gray-500 bg-black bg-opacity-75 min-h-screen flex justify-center items-center">

      <div className="loader bg-white p-5 rounded-full flex space-x-3">
        <div className="w-5 h-5 bg-gray-800 rounded-full animate-bounce"></div>
        <div className="w-5 h-5 bg-gray-800 rounded-full animate-bounce"></div>
        <div className="w-5 h-5 bg-gray-800 rounded-full animate-bounce"></div>
      </div>

    </div>
  )
}
import React, {useState} from 'react';

const NavBar = () => {

    const [isOpen, setOpen] = useState(false);

    return (
        <header class="bg-gray-900">
    <div class="flex items-center justify-between px-4 py-3">
      <div>
        {/* <img class="h-8" src="/img/logo-inverted.svg" alt="Workcation"> */}
        <h1 className="text-white">Memento</h1>
      </div>
      <div>
        <button type="button" onClick={() => setOpen(!isOpen)} className="block text-gray-500 hover:text-white focus:text-white focus:outline-none">
          <svg class="h-6 w-6 fill-current" viewBox="0 0 24 24">
            {isOpen && <path fill-rule="evenodd" d="M18.278 16.864a1 1 0 0 1-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 0 1-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 0 1 1.414-1.414l4.829 4.828 4.828-4.828a1 1 0 1 1 1.414 1.414l-4.828 4.829 4.828 4.828z"/>}
            {!isOpen && <path fill-rule="evenodd" d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"/>}
          </svg>
        </button>
      </div>
    </div>
    { isOpen && 
    <div className="px-2 pt-2 pb-4">
      <a href="/" className="block px-2 py-1 text-white font-semibold rounded hover:bg-gray-800">List your property</a>
      <a href="/" className="mt-1 block px-2 py-1 text-white font-semibold rounded hover:bg-gray-800">Trips</a>
      <a href="/" className="mt-1 block px-2 py-1 text-white font-semibold rounded hover:bg-gray-800">Messages</a>
    </div>
    }
  </header>
    

    );
}

export default NavBar;
import React from 'react';
import { Coffee } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="sticky top-0 z-50 bg-[#fcf9f6]/90 backdrop-blur-md border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-3">
            <div className="bg-amber-600 p-2 rounded-lg shadow-sm">
              <Coffee className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-stone-800">BrewMaster <span className="text-amber-600">Pro</span></h1>
          </div>
          
          <div className="text-stone-500 text-sm font-medium">
            咖啡制作大师
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
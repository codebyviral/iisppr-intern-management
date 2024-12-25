import React from 'react';
import { FileQuestion, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { NavigationButton } from './NavigationButton';

export function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex items-center justify-center px-4">
      <div className="max-w-lg w-full text-center">
        <div className="mb-8">
          <FileQuestion className="h-24 w-24 text-indigo-500 mx-auto animate-pulse" />
        </div>
        
        <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Page Not Found</h2>
        
        <p className="text-gray-600 mb-8">
          Oops! It seems like the intern you're looking for is on a coffee break. 
          The page you're trying to access doesn't exist or has been moved.
        </p>

        <div className="space-y-4">
          <NavigationButton 
            onClick={() => navigate(-1)}
            icon={<ArrowLeft className="h-5 w-5 mr-2" />}
            primary
          >
            Go Back
          </NavigationButton>
          
          <div>
            <NavigationButton
              onClick={() => navigate('/')}
            >
              Return to Dashboard
            </NavigationButton>
          </div>
        </div>
      </div>
    </div>
  );
}
import { Link } from 'react-router';
import { SignInButton, SignUpButton, UserButton, useAuth } from '@clerk/clerk-react';
import { ShoppingBagIcon, PlusIcon, UserIcon, MenuIcon, XIcon } from 'lucide-react';
import ThemeSelector from './ThemeSelector';
import { useState } from 'react';

export default function Navbar() {
  const { isSignedIn } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  return (
    <header className="bg-base-300 sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto w-full px-3 sm:px-6 lg:px-8" aria-label="Main navigation">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0 flex items-center">
            <Link
              to="/"
              className="flex items-center gap-2 hover:opacity-80 transition-opacity"
              aria-label="ProductHub - Home"
            >
              <ShoppingBagIcon className="size-6 sm:size-7 text-primary" aria-hidden="true" />
              <h1 className="text-lg sm:text-xl font-bold font-mono uppercase tracking-wider">
                ProductHub
              </h1>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-2 lg:space-x-4">
            <ThemeSelector />
            {isSignedIn ? (
              <ul className="flex items-center space-x-2 lg:space-x-4" role="list">
                <li>
                  <Link to="/create" className="btn btn-primary btn-sm lg:btn-md gap-1 lg:gap-2">
                    <PlusIcon className="size-4 lg:size-5" aria-hidden="true" />
                    <span className="text-sm lg:text-base">New Product</span>
                  </Link>
                </li>
                <li>
                  <Link to="/profile" className="btn btn-ghost btn-sm lg:btn-md gap-1 lg:gap-2">
                    <UserIcon className="size-4 lg:size-5" aria-hidden="true" />
                    <span className="text-sm lg:text-base">Profile</span>
                  </Link>
                </li>
                <li className="ml-2">
                  <UserButton />
                </li>
              </ul>
            ) : (
              <ul className="flex items-center space-x-2 lg:space-x-4" role="list">
                <li>
                  <SignInButton mode="modal">
                    <button className="btn btn-ghost btn-sm lg:btn-md text-sm lg:text-base">
                      Sign In
                    </button>
                  </SignInButton>
                </li>
                <li>
                  <SignUpButton mode="modal">
                    <button className="btn btn-primary btn-sm lg:btn-md text-sm lg:text-base">
                      Get Started
                    </button>
                  </SignUpButton>
                </li>
              </ul>
            )}
          </div>

          <div className="flex md:hidden items-center gap-2">
            <ThemeSelector />
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="btn btn-ghost btn-square"
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
              aria-label={isMenuOpen ? 'Close main menu' : 'Open main menu'}
            >
              {isMenuOpen ? (
                <XIcon className="size-6" aria-hidden="true" />
              ) : (
                <MenuIcon className="size-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div id="mobile-menu" className="md:hidden pb-4">
            <nav aria-label="Mobile navigation">
              {isSignedIn ? (
                <ul className="flex flex-col space-y-3 pt-4 border-t border-base-200" role="list">
                  <li>
                    <Link
                      to="/create"
                      className="btn btn-primary justify-start gap-2"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <PlusIcon className="size-5" aria-hidden="true" />
                      <span>New Product</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/profile"
                      className="btn btn-ghost justify-start gap-2"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <UserIcon className="size-5" aria-hidden="true" />
                      <span>Profile</span>
                    </Link>
                  </li>
                  <li className="px-4 py-2 border-t border-base-200 pt-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Account</span>
                      <UserButton />
                    </div>
                  </li>
                </ul>
              ) : (
                <ul className="flex flex-col space-y-3 pt-4 border-t border-base-200" role="list">
                  <li>
                    <SignInButton mode="modal">
                      <button
                        className="btn btn-ghost justify-start"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Sign In
                      </button>
                    </SignInButton>
                  </li>
                  <li>
                    <SignUpButton mode="modal">
                      <button
                        className="btn btn-primary justify-start"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Get Started
                      </button>
                    </SignUpButton>
                  </li>
                </ul>
              )}
            </nav>
          </div>
        )}
      </nav>
    </header>
  );
}

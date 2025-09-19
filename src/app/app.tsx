import './App.css';
import Logo from "../assets/images/logo.svg";
import { ThemeProvider } from '../contexts/theme-context/theme-context';
import ThemeButton from './components/theme-button/theme-button';
import { useEffect, useState } from 'react';
import type { ExtensionProps } from './components/extension/types';
import getExtensions from './api/getExtensions';
import Extension from './components/extension/extension';

const App = () => {
  const [extensions, setExtensions] = useState<ExtensionProps[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const loadExtensions = async () => {
      try {
        setLoading(true);
        const response = await getExtensions();
        setExtensions(response);
        await new Promise((resolve) => setTimeout(resolve, 3000));
      } catch(e: unknown) {
      } finally {
        setLoading(false);
      }
    }
    loadExtensions();
  }, []);

  return (
    <ThemeProvider>
      <div className='page'>
        <header className='bar'>
          <img 
            src={Logo}
            alt='logo'
            className='bar__logo'
          />
          <ThemeButton />
        </header>
        <div className='header'>
          <h1 className='header__text'>Extensions List</h1>
          <div className='filters'>
            <button 
              type='button'
              title='All'
              className='button button--filter'
            >
              All
            </button>
            <button 
              type='button'
              title='Active'
              className='button button--filter'
            >
              Active
            </button>
            <button 
              type='button'
              title='Inactive'
              className='button button--filter'
            >
              Inactive
            </button>
          </div>
        </div>
        <ul className='extensions'>
          {
            loading ? 
            <div className='loading'/>
            :
            extensions.map((extension, i) => 
              <li key={i}>
                <Extension 
                  logo={extension.logo}
                  name={extension.name}
                  description={extension.description}
                  isActive={extension.isActive}
                />
              </li>
            )
          }
        </ul>
      </div>
    </ThemeProvider>
  )
}

export default App;

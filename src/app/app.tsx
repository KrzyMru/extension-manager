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
  const [filter, setFilter] = useState<'all'|'active'|'inactive'>('all');

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

  const handleDelete = (name: string) => {
    setExtensions(extensions.filter(ext => ext.name !== name));
  }
  const handleCheck = (name: string) => {
    setExtensions(extensions => extensions.map(ext => ext.name === name ? {...ext, isActive: !ext.isActive} : ext));
  }

  return (
    <ThemeProvider>
      <div className='page'>
        <header className='bar'>
          <div className='bar__logo'>
            <img 
              src={Logo}
              alt='logo'
              className='bar__icon'
            />
            <h2>Extensions</h2>
          </div>
          <ThemeButton />
        </header>
        <div className='header'>
          <h1 className='header__text'>Extensions List</h1>
          <div className='filters'>
            <button 
              type='button'
              title='All'
              onClick={() => setFilter('all')}
              className={`button button--filter ${filter === 'all' ? 'filter--active' : ''}`}
            >
              All
            </button>
            <button 
              type='button'
              title='Active'
              onClick={() => setFilter('active')}
              className={`button button--filter ${filter === 'active' ? 'filter--active' : ''}`}
            >
              Active
            </button>
            <button 
              type='button'
              title='Inactive'
              onClick={() => setFilter('inactive')}
              className={`button button--filter ${filter === 'inactive' ? 'filter--active' : ''}`}
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
            extensions.filter(ext => 
              filter === 'all' ? true :
              filter === 'active' ? ext.isActive :
              filter === 'inactive' ? !ext.isActive :
              false
            ).map((extension, i) => 
              <li key={i}>
                <Extension 
                  logo={extension.logo}
                  name={extension.name}
                  description={extension.description}
                  isActive={extension.isActive}
                  onDelete={handleDelete}
                  onCheck={handleCheck}
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

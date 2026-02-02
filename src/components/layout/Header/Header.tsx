import { useAppStore } from '@/stores'
import { useUserStore } from '@/stores'
import { useTheme } from '@/hooks'
import styles from './Header.module.css'

export function Header() {
  const { toggleSidebar } = useAppStore()
  const { user } = useUserStore()
  const { theme, setTheme } = useTheme()

  const toggleTheme = () => {
    if (theme === 'light') setTheme('dark')
    else if (theme === 'dark') setTheme('system')
    else setTheme('light')
  }

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  return (
    <header className={styles.header}>
      <div className={styles.left}>
        <button
          onClick={toggleSidebar}
          className={styles.menuButton}
          aria-label="Toggle sidebar"
        >
          <svg
            className={styles.menuIcon}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
        <span className={styles.logo}>ResApp</span>
      </div>

      <div className={styles.right}>
        <button
          onClick={toggleTheme}
          className={styles.themeButton}
          aria-label="Toggle theme"
        >
          {theme === 'dark' ? (
            <svg className={styles.themeIcon} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          ) : (
            <svg className={styles.themeIcon} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </svg>
          )}
        </button>

        {user && (
          <div className={styles.userMenu}>
            <div className={styles.avatar}>
              {user.avatar ? (
                <img src={user.avatar} alt={user.name} />
              ) : (
                getInitials(user.name)
              )}
            </div>
            <span className={styles.userName}>{user.name}</span>
          </div>
        )}
      </div>
    </header>
  )
}

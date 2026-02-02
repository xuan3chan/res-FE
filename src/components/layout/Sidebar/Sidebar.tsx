import { NavLink } from 'react-router-dom'
import { useAppStore, useUserStore } from '@/stores'
import { CONSTANTS } from '@/config'
import { cn } from '@/lib'
import styles from './Sidebar.module.css'

const navItems = [
  {
    path: CONSTANTS.ROUTES.DASHBOARD,
    label: 'Dashboard',
    icon: (
      <svg className={styles.navIcon} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
  },
]

export function Sidebar() {
  const { sidebarOpen, setSidebarOpen } = useAppStore()
  const { logout } = useUserStore()

  const handleLogout = () => {
    logout()
    window.location.href = CONSTANTS.ROUTES.LOGIN
  }

  return (
    <>
      {/* Mobile overlay */}
      <div
        className={cn(styles.overlay, sidebarOpen && styles.overlayVisible)}
        onClick={() => setSidebarOpen(false)}
      />

      <aside className={cn(styles.sidebar, !sidebarOpen && styles.sidebarClosed)}>
        <div className={styles.logo}>ResApp</div>

        <nav className={styles.nav}>
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                cn(styles.navItem, isActive && styles.navItemActive)
              }
            >
              {item.icon}
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>

        <div className={styles.footer}>
          <button onClick={handleLogout} className={styles.logoutButton}>
            <svg className={styles.navIcon} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  )
}

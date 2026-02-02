import { Outlet } from '@tanstack/react-router'
import styles from './AuthLayout.module.css'

export function AuthLayout() {
  return (
    <div className={styles.layout}>
      <div className={styles.card}>
        <div className={styles.logo}>ResApp</div>
        <Outlet />
      </div>
    </div>
  )
}

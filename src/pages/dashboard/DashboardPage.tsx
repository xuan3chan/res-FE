import { useUserStore } from '@/stores'
import styles from './DashboardPage.module.css'

export function DashboardPage() {
  const { user } = useUserStore()

  const stats = [
    { label: 'Total Orders', value: '1,234' },
    { label: 'Revenue', value: '$12,345' },
    { label: 'Customers', value: '567' },
    { label: 'Products', value: '89' },
  ]

  return (
    <div className={styles.dashboard}>
      <div className={styles.header}>
        <h1 className={styles.title}>
          Welcome back{user?.name ? `, ${user.name}` : ''}!
        </h1>
        <p className={styles.subtitle}>
          Here's what's happening with your business today.
        </p>
      </div>

      <div className={styles.statsGrid}>
        {stats.map((stat) => (
          <div key={stat.label} className={styles.statCard}>
            <p className={styles.statLabel}>{stat.label}</p>
            <p className={styles.statValue}>{stat.value}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

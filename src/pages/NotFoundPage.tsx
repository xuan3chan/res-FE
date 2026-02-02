import { Link } from '@tanstack/react-router'
import { Button } from '@/components'
import { CONSTANTS } from '@/config'
import styles from './NotFoundPage.module.css'

export function NotFoundPage() {
  return (
    <div className={styles.notFound}>
      <span className={styles.code}>404</span>
      <h1 className={styles.title}>Page not found</h1>
      <p className={styles.description}>
        Sorry, we couldn't find the page you're looking for. Please check the URL
        or go back to the home page.
      </p>
      <Link to={CONSTANTS.ROUTES.HOME}>
        <Button>Go back home</Button>
      </Link>
    </div>
  )
}

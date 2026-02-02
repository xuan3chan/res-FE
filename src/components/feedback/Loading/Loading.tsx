import { cn } from '@/lib/utils'
import styles from './Loading.module.css'

interface LoadingProps {
  size?: 'sm' | 'md' | 'lg'
  text?: string
  fullScreen?: boolean
}

export function Loading({ size = 'md', text, fullScreen = false }: LoadingProps) {
  return (
    <div className={cn(styles.loadingWrapper, fullScreen && styles.fullScreen)}>
      <div className={cn(styles.spinner, size !== 'md' && styles[size])} />
      {text && <span className={styles.text}>{text}</span>}
    </div>
  )
}

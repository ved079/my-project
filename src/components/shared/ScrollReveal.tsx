'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { ReactNode, ElementType } from 'react'

export type RevealVariant = 'fadeUp' | 'fadeDown' | 'fadeIn' | 'scaleIn' | 'slideLeft' | 'slideRight'

interface ScrollRevealProps {
  children: ReactNode
  className?: string
  variant?: RevealVariant
  delay?: number
  duration?: number
  once?: boolean
  as?: ElementType
  style?: React.CSSProperties
}

const springEase = [0.25, 0.1, 0.25, 1] as const

const variantConfig: Record<RevealVariant, { hidden: object; visible: object }> = {
  fadeUp: {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0 },
  },
  fadeDown: {
    hidden: { opacity: 0, y: -24 },
    visible: { opacity: 1, y: 0 },
  },
  fadeIn: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
  scaleIn: {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1 },
  },
  slideLeft: {
    hidden: { opacity: 0, x: -24 },
    visible: { opacity: 1, x: 0 },
  },
  slideRight: {
    hidden: { opacity: 0, x: 24 },
    visible: { opacity: 1, x: 0 },
  },
}

export default function ScrollReveal({
  children,
  className,
  variant = 'fadeUp',
  delay = 0,
  duration = 0.7,
  once = true,
  as: Tag = 'div',
  style,
  ...rest
}: ScrollRevealProps & Record<string, any>) {
  const isReduced = useReducedMotion()
  const config = variantConfig[variant]

  if (isReduced) {
    return <Tag className={className} style={style} {...rest}>{children}</Tag>
  }

  const MotionTag = motion[Tag as keyof typeof motion] as any

  return (
    <MotionTag
      className={className}
      style={style}
      {...rest}
      initial={config.hidden}
      whileInView={config.visible}
      viewport={{ once, margin: '-80px' }}
      transition={{ duration, delay, ease: springEase }}
    >
      {children}
    </MotionTag>
  )
}

interface StaggerContainerProps {
  children: ReactNode
  className?: string
  staggerDelay?: number
  once?: boolean
  style?: React.CSSProperties
}

export function StaggerContainer({
  children,
  className,
  staggerDelay = 0.08,
  once = true,
  style,
}: StaggerContainerProps) {
  const isReduced = useReducedMotion()

  if (isReduced) return <div className={className} style={style}>{children}</div>

  return (
    <motion.div
      className={className}
      style={style}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: '-80px' }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: staggerDelay } },
      }}
    >
      {children}
    </motion.div>
  )
}

interface StaggerItemProps {
  children: ReactNode
  className?: string
  variant?: 'fadeUp' | 'fadeIn' | 'scaleIn'
  style?: React.CSSProperties
}

export function StaggerItem({
  children,
  className,
  variant = 'fadeUp',
  style,
}: StaggerItemProps) {
  const isReduced = useReducedMotion()

  const variants = {
    fadeUp: {
      hidden: isReduced ? {} : { opacity: 0, y: 20 },
      visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: springEase } },
    },
    fadeIn: {
      hidden: isReduced ? {} : { opacity: 0 },
      visible: { opacity: 1, transition: { duration: 0.5, ease: springEase } },
    },
    scaleIn: {
      hidden: isReduced ? {} : { opacity: 0, scale: 0.95 },
      visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: springEase } },
    },
  }

  return (
    <motion.div className={className} style={style} variants={variants[variant]}>
      {children}
    </motion.div>
  )
}

export const heroContainerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.15 },
  },
}

export const heroItemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: springEase } },
}

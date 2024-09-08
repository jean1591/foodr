'use client'

import { ConfirmOrBuyModal } from './ConfirmOrBuyModal'
import { RootState } from '@/app/lib/store/store'
import { useSelector } from 'react-redux'

export const Modal = () => {
  const { displayConfirmOrBuyModal } = useSelector(
    (state: RootState) => state.interactions
  )

  return <div>{displayConfirmOrBuyModal && <ConfirmOrBuyModal />}</div>
}

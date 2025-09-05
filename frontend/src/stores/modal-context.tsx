'use client'
import { createContext, ReactNode, useContext, useState } from "react"


interface ModalContextType {
    modalOpen: boolean
    modalTitle: string
    modalBody: ReactNode
    openModal: (title: string, body: ReactNode) => void
    hideModal: () => void
}

interface ModalProviderProps {
    children: ReactNode
}

export const ModalContext = createContext<ModalContextType | undefined>(undefined)

export const ModalProvider = ({ children }: ModalProviderProps) => {
    const [modalTitle, setModalTitle] = useState<string>('')
    const [modalBody, setModalBody] = useState<ReactNode>(null)
    const [modalOpen, setModalOpen] = useState<boolean>(false)

    const openModal = (title: string, body: ReactNode) => {
        setModalTitle(title)
        setModalBody(body)
        setModalOpen(true)
    }

    const hideModal = () => setModalOpen(false)

    return (
        <ModalContext.Provider value={{modalTitle, modalBody, modalOpen,openModal, hideModal}}>
            {children}
        </ModalContext.Provider>
    )
}

export const useModal = () => {
    const context = useContext(ModalContext)
    if(context == undefined){
        throw new Error('useModal must be used within a ModalProvider')
    }
    return context
}
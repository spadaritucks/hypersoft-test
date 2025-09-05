"use client"
import { useModal } from "@/stores/modal-context"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"

export default function Modal() {


    const {modalOpen, modalBody, hideModal, modalTitle} = useModal()

    return (
        <Dialog open={modalOpen} onOpenChange={hideModal}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{modalTitle}</DialogTitle>
                    <DialogClose onClick={hideModal}/>
                    
                </DialogHeader>
                {modalBody}
            </DialogContent>
        </Dialog>
    )
}
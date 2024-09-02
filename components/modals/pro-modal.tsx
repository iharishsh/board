"use client";

import { 
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { useProModal } from "@/store/use-pro-modal";
export const ProModal = () => {
    const {
        isOpen,
        onClose,
    } = useProModal();

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        Pro Modal
                    </DialogTitle>
                </DialogHeader>
                <DialogDescription>
                    This is pro modal
                </DialogDescription>
            </DialogContent>
        </Dialog>
    );
};
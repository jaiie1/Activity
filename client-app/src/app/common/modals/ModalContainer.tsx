import { observer } from "mobx-react-lite";
import React from "react";
import { Modal } from "semantic-ui-react";
import { useStore } from "../../stores/store";

export default observer(function ModalContainer() {
    const { modelStore } = useStore();


    return (
        <Modal open={modelStore.modal.open} onClosed={modelStore.closeModel} size='mini'>
            <Modal.Content>
                {modelStore.modal.body}
            </Modal.Content>
        </Modal>
    )
})

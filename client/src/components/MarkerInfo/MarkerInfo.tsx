import { useContext, useState } from "react";
import { IMarker } from "../../types/marker.interface"
import { Button } from "../Button/Button";
import styles from './MarkerInfo.module.css'
import { WebsocketContext } from "../../context/websocket.context";
import { IRemoveMarkerRequest } from "../../types/websocket/markers.interfaces";
import { useMarkersStore } from "../../store/markers.store";
import { UpdateMarkerForm } from "../UpdateMarkerForm/UpdateMarkerForm";

interface MarkerInfoProps {
    marker: IMarker;
}

export const MarkerInfo = ({ marker }: MarkerInfoProps) => {
    const { sendMessage } = useContext(WebsocketContext);
    const { setPopupInfoData } = useMarkersStore();

    const [isEditMode, setIsEditMode] = useState<boolean>(false);

    const onRemove = () => {
        sendMessage<IRemoveMarkerRequest>({ type: "markers.delete", data: { id: marker.id } });
        setPopupInfoData(null);
    }

    if (isEditMode) {
        return (
            <UpdateMarkerForm marker={marker} closeEditMode={() => setIsEditMode(false)} />
        )
    }

    return (
        <div className={styles.container}>
            <div className={styles.info}>
                <span className={styles.info__title}>Автор: </span>
                <span className={styles.info__value}>{marker.user.name}</span>
                <span className={styles.info__title}>Название: </span>
                <span className={styles.info__value}>{marker.name}</span>
                <span className={styles.info__title}>Описание: </span>
                <span className={styles.info__value}>{marker.description || "-"}</span>
            </div>
            <div className={styles.buttons}>
                <Button onClick={() => setIsEditMode(!isEditMode)}>Редактировать</Button>
                <Button onClick={onRemove}>Удалить маркер</Button>
            </div>
        </div>
    )
}
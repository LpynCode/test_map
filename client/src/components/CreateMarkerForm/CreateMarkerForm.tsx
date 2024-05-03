import { useForm } from "react-hook-form"
import { ICreateMarkerForm } from "../../types/forms/create-marker-form.interface"
import { Input } from "../Input/Input";
import { Button } from "../Button/Button";
import styles from './CreateMarkerForm.module.css'
import { useContext } from "react";
import { WebsocketContext } from "../../providers/WebsocketProvider/WebsocketProvider";
import { ICreateMarkerRequest } from "../../types/websocket/markers.interfaces";
import { useMarkersStore } from "../../store/markers.store";

export const CreateMarkerForm = () => {
    const { createPopupData, setCreatePopupData } = useMarkersStore();
    const { register, handleSubmit, formState: { errors } } = useForm<ICreateMarkerForm>();
    const { sendMessage } = useContext(WebsocketContext);

    const onSubmit = (data: ICreateMarkerForm) => {
        const coordinates = createPopupData;
        if (!coordinates) return;

        sendMessage<ICreateMarkerRequest>({ type: "markers.create", data: { ...data, coordinates } })

        setCreatePopupData(null)
    }
    return (
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
            <Input
                id="create-marker-input-name"
                labelName="Введите имя маркера"
                error={errors.name}
                {...register("name", { required: { value: true, message: "Поле обязательно для заполнения" } })}
                autoFocus
            />
            <Input
                id="create-marker-input-description"
                labelName="Введите описание маркера"
                {...register("description")}
            />
            <Button type="submit">Создать маркер</Button>
        </form>
    )
}
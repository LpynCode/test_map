import { useContext } from "react";
import { useForm } from "react-hook-form";
import { WebsocketContext } from "../../context/websocket.context";
import { ICreateMarkerForm } from "../../types/forms/create-marker-form.interface";
import { IUpdateMarkerForm } from "../../types/forms/update-marker-form.interface";
import { Button } from "../Button/Button";
import { Input } from "../Input/Input";
import { UpdateMarkerFormProps } from "./UpdateMarkerForm.props";
import { IUpdateMarkerRequest } from "../../types/websocket/markers.interfaces";
import styles from './UpdateMarkerForm.module.css'

export const UpdateMarkerForm = ({ marker, closeEditMode, ...props }: UpdateMarkerFormProps) => {
    const { register, handleSubmit, formState: { errors } } = useForm<ICreateMarkerForm>();
    const { sendMessage } = useContext(WebsocketContext);

    const onSubmit = (data: IUpdateMarkerForm) => {
        sendMessage<IUpdateMarkerRequest>({ type: "markers.update", data: { ...marker, ...data } });
        closeEditMode();
    }

    return (
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)} {...props}>
            <Input
                id="create-marker-input-name"
                labelName="Введите новое имя маркера"
                error={errors.name}
                defaultValue={marker.name}
                {...register("name", { required: { value: true, message: "Поле обязательно для заполнения" } })}
                autoFocus
            />
            <Input
                id="create-marker-input-description"
                labelName="Введите новое описание маркера"
                defaultValue={marker.description}
                {...register("description")}
            />
            <div className={styles.buttons}>
                <Button type="button" onClick={closeEditMode}>Отмена</Button>
                <Button type="submit">Сохранить</Button>
            </div>
        </form>
    )
}
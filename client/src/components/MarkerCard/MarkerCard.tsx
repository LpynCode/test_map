import { useMarkersStore } from '../../store/markers.store'
import styles from './MarkerCard.module.css'
import { MarkerCardProps } from './MarkerCard.props'

export const MarkerCard = ({ marker, ...props }: MarkerCardProps) => {
    const { selectMarker } = useMarkersStore();

    const onMarkerClick = () => {
        selectMarker(marker);
    }

    return (
        <div onClick={onMarkerClick} className={styles.card} {...props}>
            <div className={styles.title}>{marker.name}</div>
            <div className={styles.right_info}>
                <p className={styles.user}>{marker.user.name}</p>
            </div>
        </div>
    )
}
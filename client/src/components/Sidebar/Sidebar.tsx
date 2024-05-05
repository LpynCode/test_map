import { useEffect, useState } from 'react';
import { useDebounce } from '../../hooks/use-debounce';
import { useMarkersStore } from '../../store/markers.store'
import { Input } from '../Input/Input';
import { MarkerCard } from '../MarkerCard/MarkerCard';
import styles from './Sidebar.module.css'

export const Sidebar = () => {
    const { searchedMarkers, searchMarkers } = useMarkersStore();

    const [searchText, setSearchText] = useState('');
    const debouncedSearch = useDebounce(searchText, 500);

    useEffect(() => {
        searchMarkers(debouncedSearch);
    }, [debouncedSearch])

    return (
        <aside className={styles.sidebar}>
            <div className={styles.title}>Список маркеров</div>
            <div className={styles.content}>
                <Input className={styles.search} value={searchText} onChange={(e) => setSearchText(e.target.value)} placeholder="Поиск маркера" />
                <div className={styles.markers_list}>
                    {searchedMarkers.map(marker => <MarkerCard key={marker.id} marker={marker} />)}
                </div>
            </div>
        </aside>
    )
}
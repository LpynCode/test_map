import { Map } from '../components/Map/Map';
import { usePosition } from '../hooks/use-position';
import { useContext, useEffect, useState } from 'react';
import { WebsocketContext } from '../context/websocket.context';
import { handleMessage } from '../helpers/handle-message';
import Popup from '../components/Popup/Popup';
import { useMarkersStore } from '../store/markers.store';
import { CreateMarkerForm } from '../components/CreateMarkerForm/CreateMarkerForm';
import { MarkerInfo } from '../components/MarkerInfo/MarkerInfo';
import { Sidebar } from '../components/Sidebar/Sidebar';

function App() {
  const mapCoordinates = usePosition()
  const { isReady, sendMessage, lastMessage } = useContext(WebsocketContext);
  const { setCreatePopupData, createPopupData, popupInfoData, setPopupInfoData } = useMarkersStore();
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const name = prompt("Ваше имя?") || "";
    setUserName(name)
  }, [])

  useEffect(() => {
    if (isReady && userName) {
      sendMessage({ type: "authorization", data: userName });
    }
  }, [isReady, userName])

  useEffect(() => {
    if (!lastMessage) return;
    handleMessage(lastMessage);
  }, [lastMessage])

  if (!userName) return <>Обновите страницу для авторизации!</>

  return (
    <>
      {createPopupData && <Popup close={() => setCreatePopupData(null)} title="Создать маркер">
        <CreateMarkerForm />
      </Popup>}
      {popupInfoData && <Popup close={() => setPopupInfoData(null)} title="Информация о маркере"> <MarkerInfo marker={popupInfoData} /></Popup>}
      <Map coordinates={mapCoordinates} />
      <Sidebar />
    </>
  )
}

export default App

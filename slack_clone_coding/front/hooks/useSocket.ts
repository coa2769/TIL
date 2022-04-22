import { useCallback } from 'react';
import { io, Socket } from 'socket.io-client';

const backUrl = process.env.NODE_ENV === 'production' ? 'https://sleact.nodebird.com' : 'http://localhost:3095';

//socket들을 관리하는 객체
const sockets: { [key: string]: Socket } = {};

const useSocket = (workspace?: string): [Socket | undefined, () => void] => {
  //연결 해제 함수
  const disconnect = useCallback(() => {
    if (workspace && sockets[workspace]) {
      sockets[workspace].disconnect();
      delete sockets[workspace];
    }
  }, [workspace]);

  //workspace를 입력받지 못했을 때
  if (!workspace) {
    return [undefined, disconnect];
  }
  //기존에 없다면 생성
  if (!sockets[workspace]) {
    sockets[workspace] = io(`${backUrl}/ws-${workspace}`, {
      transports: ['websocket'],
    });
    console.info('create socket', workspace, sockets[workspace]);
  }

  return [sockets[workspace], disconnect];
};

export default useSocket;

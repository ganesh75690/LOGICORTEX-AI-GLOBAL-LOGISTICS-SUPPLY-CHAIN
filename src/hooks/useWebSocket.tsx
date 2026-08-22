import { useState, useCallback } from 'react';

interface WebSocketMessage {
  type: string;
  data?: any;
  timestamp?: string;
}

interface WebSocketOptions {
  onMessage?: (message: WebSocketMessage) => void;
  onError?: (error: Event) => void;
  onClose?: (event: CloseEvent) => void;
  onOpen?: (event: Event) => void;
}

export const useWebSocket = (url: string, options: WebSocketOptions = {}) => {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [lastMessage, setLastMessage] = useState<WebSocketMessage | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [reconnectAttempts, setReconnectAttempts] = useState(0);
  const [reconnectInterval, setReconnectInterval] = useState<number | null>(null);

  const connect = useCallback(() => {
    try {
      const ws = new WebSocket(url);

      ws.onopen = (event) => {
        setIsConnected(true);
        setReconnectAttempts(0);
        if (reconnectInterval) {
          clearTimeout(reconnectInterval);
          setReconnectInterval(null);
        }
        options.onOpen?.( event );
      };

      ws.onmessage = (event) => {
        const message: WebSocketMessage = JSON.parse(event.data);
        setLastMessage(message);
        options.onMessage?.( message );
      };

      ws.onerror = (event) => {
        console.error('WebSocket error:', event);
        options.onError?.( event );
      };

      ws.onclose = (event) => {
        setIsConnected(false);
        options.onClose?.( event );
        
        // Attempt to reconnect after 3 seconds
        if (reconnectAttempts < 3) {
          const interval = setTimeout(() => {
            connect();
          }, 3000);
          setReconnectInterval(interval);
          setReconnectAttempts(reconnectAttempts + 1);
        }
      };

      setSocket(ws);
    } catch (error) {
      console.error('WebSocket connection failed:', error);
      options.onError?.( error as Event );
    }
  }, [url, options.onOpen, options.onError, options.onClose]);

  const disconnect = useCallback(() => {
    if (socket) {
      socket.close();
      setSocket(null);
      setIsConnected(false);
    }
  }, [socket]);

  const sendMessage = useCallback((message: any) => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify(message));
    }
  }, [socket]);

  const reconnect = useCallback(() => {
    if (reconnectInterval) {
      clearTimeout(reconnectInterval);
      setReconnectInterval(null);
    }
    setReconnectAttempts(0);
    connect();
  }, [reconnectInterval, url]);

  return {
    socket,
    isConnected,
    lastMessage,
    sendMessage,
    disconnect,
    reconnect,
  };
};

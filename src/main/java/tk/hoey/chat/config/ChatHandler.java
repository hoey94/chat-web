package tk.hoey.chat.config;

import org.springframework.stereotype.Component;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import javax.annotation.Resource;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.Timer;
import java.util.TimerTask;
import java.util.concurrent.ConcurrentHashMap;

@Component
public class ChatHandler extends TextWebSocketHandler {

    @Resource
    private OpenAIChatClient openAIChatClient;

    private final Map<String, WebSocketSession> sessions = new ConcurrentHashMap<>();

    private Timer heartbeatTimer;



    // 建立链接之后
    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
//        System.out.println("s: server open");
        String sessionId = session.getId();
        sessions.put(sessionId, session);
        if (heartbeatTimer == null) {
            startHeartbeatTimer();
        }
    }

    // 关闭链接触发
    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
//        System.out.println("s: server close");
        String sessionId = session.getId();
        sessions.remove(sessionId);
        if (sessions.isEmpty() && heartbeatTimer != null) {
            heartbeatTimer.cancel();
            heartbeatTimer = null;
        }
    }

    // 监听到消息触发
    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
        String sessionId = session.getId();
        WebSocketSession webSocketSession = sessions.get(sessionId);
        if(null != webSocketSession && webSocketSession.isOpen()){
            if ("ping".equals(message.getPayload())) {
                // 心跳消息，回应一个心跳回应消息
//                System.out.println("s: server 收到client ping");
                session.sendMessage(new TextMessage("pong"));
//                System.out.println("s: server 发送给client pong");
                return;
            }
            if ("pong".equals(message.getPayload())) {
//                System.out.println("s: server 收到client pong");
                return;
            }
            String result = openAIChatClient.sendMessage(message.getPayload());
            webSocketSession.sendMessage(new TextMessage(result));
        }

        //当服务端发送给客户端ping以后，但是没有收到pong，发现session并没有close掉
        // 添加计时器，如果30秒内没有收到来自客户端的pong消息，则销毁该WebSocket连接，
//        Timer timer = new Timer(true);
//        timer.schedule(new TimerTask() {
//            @Override
//            public void run() {
//                if (sessions.containsKey(sessionId)) {
//                    sessions.remove(sessionId);
//                    try {
//                        session.close();
//                        System.out.println("s: server 关闭连接，原因：30秒未收到pong消息");
//                    } catch (IOException e) {
//                        e.printStackTrace();
//                    }
//                }
//            }
//        }, 30000);

    }


    private void startHeartbeatTimer() {
        heartbeatTimer = new Timer(true);
        heartbeatTimer.schedule(new TimerTask() {
            @Override
            public void run() {
                for (WebSocketSession session : sessions.values()) {
                    if (!session.isOpen()) {
                        sessions.remove(session.getId());
                    } else {
                        try {
                            session.sendMessage(new TextMessage("ping"));
//                            System.out.println("s: server 发送ping给client");
                        } catch (IOException e) {
                            e.printStackTrace();
                        }
                    }
                }
            }
        }, 0, 1000 * 50 * 2);
    }

}

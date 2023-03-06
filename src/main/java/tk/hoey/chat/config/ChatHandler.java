package tk.hoey.chat.config;

import org.springframework.stereotype.Component;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import javax.annotation.Resource;
import java.util.HashMap;
import java.util.Map;

@Component
public class ChatHandler extends TextWebSocketHandler {

    @Resource
    private OpenAIChatClient openAIChatClient;

    private Map<String, WebSocketSession> sessions = new HashMap<>();


    // 建立链接之后
    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        String sessionId = session.getId();
//        System.out.println(sessionId);
        sessions.put(sessionId, session);
    }

    // 关闭链接触发
    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
        sessions.remove(session.getId());
    }

    // 监听到消息触发
    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
        String sessionId = session.getId();
        WebSocketSession webSocketSession = sessions.get(sessionId);
        if(null != webSocketSession && webSocketSession.isOpen()){
            String result = openAIChatClient.sendMessage(message.getPayload());
            webSocketSession.sendMessage(new TextMessage(result));
        }
    }

}

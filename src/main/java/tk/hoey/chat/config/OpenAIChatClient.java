package tk.hoey.chat.config;

import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import lombok.Data;
import lombok.extern.log4j.Log4j2;
import org.apache.http.HttpEntity;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.ContentType;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.HttpClientBuilder;
import org.apache.http.util.EntityUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.List;

@Component
@Log4j2
public class OpenAIChatClient {

    @Value("${chat.key}")
    private String key;
    @Value("${chat.server.url}")
    private String endPoint;

    private final Gson gson = new Gson();

    public String sendMessage(String message) throws IOException {
        log.info("OpenAPI Key:{}", key);
        log.info("发送请求:{}", message);
        HttpClient httpClient = HttpClientBuilder.create().build();

        JsonObject requestBody = new JsonObject();
        requestBody.addProperty("model", "gpt-3.5-turbo");

        JsonObject messageObject = new JsonObject();
        messageObject.addProperty("role", "user");
        messageObject.addProperty("content", message);

        List<JsonObject> messages = new ArrayList<>();
        messages.add(messageObject);
        requestBody.add("messages", gson.toJsonTree(messages));

        HttpPost request = new HttpPost(endPoint);
        request.setHeader("Content-Type", "application/json");
        request.setHeader("Authorization", "Bearer " + key);
        request.setHeader("OpenAI-Organization","org-GsVbOCv8stRYZ7uOCbPBbwDN");
        request.setEntity(new StringEntity(gson.toJson(requestBody), ContentType.APPLICATION_JSON));

        String responseString = httpClient.execute(request, httpResponse -> {
            HttpEntity responseEntity = httpResponse.getEntity();
            if (responseEntity != null) {
                return EntityUtils.toString(responseEntity, StandardCharsets.UTF_8);
            } else {
                throw new RuntimeException("Failed to get response from OpenAI API. Response entity is null.");
            }
        });

        String content = "我好像出现问题了，请联系我的管理员进行查看！";
        try{
            JsonObject responseBody = JsonParser.parseString(responseString).getAsJsonObject();
            JsonObject messageObject1 = responseBody.getAsJsonArray("choices").get(0).getAsJsonObject().get("message").getAsJsonObject();
            content = messageObject1.get("content").getAsString();
        }catch (NullPointerException e){
            log.error("从API获取数据失败，错误信息为:" + e);
        }
//        System.out.println(content);
        return content;
    }
}

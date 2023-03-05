package tk.hoey.chat;

import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.context.web.WebAppConfiguration;
import tk.hoey.chat.config.OpenAIChatClient;

import javax.annotation.Resource;
import java.io.IOException;

@RunWith(SpringRunner.class)
@WebAppConfiguration
@SpringBootTest
public class ChatTest {

    @Resource
    private OpenAIChatClient openAIChatClient;

    @Test
    public void test() throws IOException {
        System.out.println(openAIChatClient == null ? "Y": "N");
        System.out.println(openAIChatClient.sendMessage("Hello!"));
    }
}

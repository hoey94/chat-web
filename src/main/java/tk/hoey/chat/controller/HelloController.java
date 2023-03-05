package tk.hoey.chat.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HelloController {

    @Value("${chat.key}")
    private String apiKey;

    @GetMapping("/hello")
    public String hello(String mes) {
        System.out.println(mes+apiKey);
        return "success";
    }


}

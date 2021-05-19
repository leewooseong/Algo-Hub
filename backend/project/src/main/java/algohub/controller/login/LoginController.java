package com.example.algo.controller;

import com.example.algo.api.DefaultRes;
import com.example.algo.api.ResponseMessage;
import com.example.algo.api.StatusCode;
import com.example.algo.model.MemberLogin;
import com.example.algo.service.LoginService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.security.Principal;

@SuppressWarnings("unchecked")
@CrossOrigin(origins = "localhost:8080")
@RestController
public class LoginController {

    private final LoginService service;

    @Autowired
    public LoginController(LoginService service) {
        this.service = service;
    }

    // 로그인
    @PostMapping("/api/auth/login")
    public ResponseEntity login(@ModelAttribute MemberLogin memberLogin, HttpSession session) throws Exception {
        boolean result = service.login(memberLogin, session);
        ResponseEntity responseEntity;
        if (result == false) {
            responseEntity = new ResponseEntity(DefaultRes.res(
                    StatusCode.NOT_FOUND, ResponseMessage.LOGIN_FAIL), HttpStatus.NOT_FOUND);
        } else {
            //session.setAttribute("user", result.getM_email());
            responseEntity = new ResponseEntity(DefaultRes.res(
                    StatusCode.OK, ResponseMessage.LOGIN_SUCCESS), HttpStatus.OK);
        }
        return responseEntity;
    }

    @GetMapping("/api/logout")
    public String logOut(HttpSession session) {
        session.invalidate();
        return "로그 아웃.";
    }

    @GetMapping("/api/session")
    public String test(HttpSession session) {
        return (String) session.getAttribute("user");
    }
}
